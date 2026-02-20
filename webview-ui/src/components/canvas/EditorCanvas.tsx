import { useCallback, useEffect, useRef } from "react";
import { Frame, Element } from "@craftjs/core";
import { useTranslation } from "react-i18next";
import { useEditorStore } from "../../stores/editorStore";
import { CraftContainer } from "../../crafts/layout/CraftContainer";
import { MemoAddButton, MemoStickers } from "../memo/MemoOverlay";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { useVscodeMessage } from "../../hooks/useVscodeMessage";
import { captureViewport } from "../../utils/captureImage";
import { getVsCodeApi } from "../../utils/vscodeApi";

const VIEWPORT_WIDTHS: Record<string, number> = {
  desktop: 1280,
  tablet: 768,
  mobile: 375,
};

const VIEWPORT_HEIGHTS: Record<string, number> = {
  desktop: 800,
  tablet: 1024,
  mobile: 812,
};

const ZOOM_STEP = 0.1;
const ZOOM_MIN = 0.25;
const ZOOM_MAX = 2;

export function EditorCanvas() {
  const { t } = useTranslation();
  const {
    themeMode,
    viewportMode,
    customViewportWidth,
    customViewportHeight,
    zoom,
    setZoom,
  } = useEditorStore();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const isSpaceHeld = useRef(false);
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });

  const viewportWidth =
    viewportMode === "custom"
      ? customViewportWidth
      : VIEWPORT_WIDTHS[viewportMode] || 1280;

  const viewportHeight =
    viewportMode === "custom"
      ? customViewportHeight
      : VIEWPORT_HEIGHTS[viewportMode] || 800;

  const handleZoomIn = useCallback(() => {
    setZoom(Math.min(ZOOM_MAX, Math.round((zoom + ZOOM_STEP) * 100) / 100));
  }, [zoom, setZoom]);

  const handleZoomOut = useCallback(() => {
    setZoom(Math.max(ZOOM_MIN, Math.round((zoom - ZOOM_STEP) * 100) / 100));
  }, [zoom, setZoom]);

  const handleZoomReset = useCallback(() => {
    setZoom(1);
  }, [setZoom]);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
        const newZoom = Math.round((zoom + delta) * 100) / 100;
        setZoom(Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, newZoom)));
      }
    },
    [zoom, setZoom],
  );

  // Space+Drag panning — all cursor changes via DOM to avoid re-renders
  const setCursor = useCallback((cursor: string) => {
    const el = scrollContainerRef.current;
    if (el) el.style.cursor = cursor;
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat && !isSpaceHeld.current) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
        e.preventDefault();
        isSpaceHeld.current = true;
        if (!isPanning.current) setCursor("grab");
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        isSpaceHeld.current = false;
        isPanning.current = false;
        setCursor("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [setCursor]);

  const handlePanMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isSpaceHeld.current) return;
    e.preventDefault();
    const container = scrollContainerRef.current;
    if (!container) return;
    isPanning.current = true;
    panStart.current = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: container.scrollLeft,
      scrollTop: container.scrollTop,
    };
    setCursor("grabbing");
  }, [setCursor]);

  const handlePanMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning.current) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    const dx = e.clientX - panStart.current.x;
    const dy = e.clientY - panStart.current.y;
    container.scrollLeft = panStart.current.scrollLeft - dx;
    container.scrollTop = panStart.current.scrollTop - dy;
  }, []);

  const handlePanMouseUp = useCallback(() => {
    if (!isPanning.current) return;
    isPanning.current = false;
    setCursor(isSpaceHeld.current ? "grab" : "");
  }, [setCursor]);

  useVscodeMessage(
    useCallback(
      (msg) => {
        if (msg.type === "capture:start") {
          captureViewport(viewportWidth, viewportHeight)
            .then((dataUrl) => {
              getVsCodeApi().postMessage({
                type: "capture:complete",
                payload: { dataUrl },
              });
            })
            .catch((err) => {
              getVsCodeApi().postMessage({
                type: "capture:error",
                payload: { error: String(err) },
              });
            });
        }
      },
      [viewportWidth, viewportHeight],
    ),
  );

  return (
    <div data-mocker-canvas className="relative flex-1">
      {/* Scrollable canvas area */}
      <div
        ref={scrollContainerRef}
        className="absolute inset-0 overflow-auto bg-[var(--vscode-editor-background,#1e1e1e)]"
        onWheel={handleWheel}
        onMouseDown={handlePanMouseDown}
        onMouseMove={handlePanMouseMove}
        onMouseUp={handlePanMouseUp}
        onMouseLeave={handlePanMouseUp}
      >
        <div
          ref={scrollContentRef}
          className="relative"
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "80px",
            minHeight: "100%",
            width: "max-content",
            minWidth: "100%",
          }}
        >
          {/* Memo stickers - scroll with canvas */}
          <MemoStickers scrollContentRef={scrollContentRef} />

          {/* Zoom wrapper */}
          <div
            style={{
              width: viewportWidth * zoom,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: viewportWidth,
                minHeight: viewportHeight,
                transform: `scale(${zoom})`,
                transformOrigin: "top left",
              }}
              className="relative bg-white shadow-lg transition-shadow"
            >
              {/* Size label */}
              <div className="absolute -top-5 left-0 text-[10px] text-[var(--vscode-descriptionForeground,#888)] font-mono">
                {viewportWidth} x {viewportHeight}
                {zoom !== 1 && ` (${Math.round(zoom * 100)}%)`}
              </div>
              <div data-mocker-viewport className={themeMode === "dark" ? "dark" : ""}>
                <div className="min-h-full bg-background text-foreground">
                  <Frame>
                    <Element
                      is={CraftContainer}
                      canvas
                      display="flex"
                      flexDirection="column"
                      className="min-h-screen"
                    >
                    </Element>
                  </Frame>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed overlays (outside scroll container) */}
      <MemoAddButton />

      {/* Zoom controls - fixed bottom-right, inset to avoid scrollbar overlap */}
      <div className="pointer-events-none absolute bottom-4 right-5 z-50">
        <div className="pointer-events-auto flex items-center gap-1 rounded-md border border-[var(--vscode-panel-border,#454545)] bg-[var(--vscode-editor-background,#1e1e1e)] p-1 shadow-lg">
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoom <= ZOOM_MIN}
            title={t("canvas.zoomOut")}
            className="flex h-6 w-6 items-center justify-center rounded text-[var(--vscode-foreground,#ccc)] hover:bg-[var(--vscode-toolbar-hoverBackground,#383838)] disabled:opacity-30"
          >
            <ZoomOut size={14} />
          </button>
          <button
            type="button"
            onClick={handleZoomReset}
            title={t("canvas.zoomReset")}
            className="min-w-[40px] px-1 text-center text-[10px] font-mono text-[var(--vscode-foreground,#ccc)] hover:bg-[var(--vscode-toolbar-hoverBackground,#383838)] rounded"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={zoom >= ZOOM_MAX}
            title={t("canvas.zoomIn")}
            className="flex h-6 w-6 items-center justify-center rounded text-[var(--vscode-foreground,#ccc)] hover:bg-[var(--vscode-toolbar-hoverBackground,#383838)] disabled:opacity-30"
          >
            <ZoomIn size={14} />
          </button>
          <button
            type="button"
            onClick={handleZoomReset}
            title={t("canvas.zoomFit")}
            className="flex h-6 w-6 items-center justify-center rounded text-[var(--vscode-foreground,#ccc)] hover:bg-[var(--vscode-toolbar-hoverBackground,#383838)]"
          >
            <Maximize2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
