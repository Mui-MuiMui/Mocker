import { Element, useNode, type UserComponent } from "@craftjs/core";
import { cn } from "../../utils/cn";
import type { ReactNode } from "react";
import { CraftContainer } from "../layout/CraftContainer";

/** Internal canvas slot for each resizable panel */
export const ResizablePanelSlot: UserComponent<{ children?: ReactNode }> = ({ children }) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <div
      ref={(r) => {
        if (r) connect(r);
      }}
      className="min-h-[40px] h-full w-full overflow-auto"
    >
      {children}
    </div>
  );
};

ResizablePanelSlot.craft = {
  displayName: "ResizablePanelSlot",
  rules: {
    canDrag: () => false,
    canDrop: () => true,
    canMoveIn: () => true,
    canMoveOut: () => true,
  },
};

export interface ResizableMeta {
  direction: "horizontal" | "vertical";
  nextKey: number;
  panels: Array<{ key: number; size: number }>;
}

const DEFAULT_PANEL_META: ResizableMeta = {
  direction: "horizontal",
  nextKey: 2,
  panels: [
    { key: 0, size: 50 },
    { key: 1, size: 50 },
  ],
};

export const DEFAULT_PANEL_META_JSON = JSON.stringify(DEFAULT_PANEL_META);

export function parseResizableMeta(raw: string | undefined): ResizableMeta {
  try {
    const parsed = JSON.parse(raw || "{}");
    return {
      direction: parsed.direction === "vertical" ? "vertical" : "horizontal",
      nextKey: typeof parsed.nextKey === "number" ? parsed.nextKey : DEFAULT_PANEL_META.nextKey,
      panels: Array.isArray(parsed.panels) ? parsed.panels : DEFAULT_PANEL_META.panels,
    };
  } catch {
    return DEFAULT_PANEL_META;
  }
}

interface CraftResizableProps {
  panelMeta?: string;
  withHandle?: boolean;
  borderColor?: string;
  borderRadius?: string;
  shadow?: string;
  className?: string;
  width?: string;
  height?: string;
}

export const CraftResizable: UserComponent<CraftResizableProps> = ({
  panelMeta = DEFAULT_PANEL_META_JSON,
  withHandle = true,
  borderColor = "",
  borderRadius = "rounded-lg",
  shadow = "",
  className = "",
  width = "auto",
  height = "200px",
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const meta = parseResizableMeta(panelMeta);
  const isVertical = meta.direction === "vertical";

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      className={cn(
        "flex border overflow-hidden",
        isVertical ? "flex-col" : "flex-row",
        borderRadius,
        borderColor,
        shadow,
        className,
      )}
      style={{
        width: width !== "auto" ? width : undefined,
        height: height !== "auto" ? height : undefined,
      }}
    >
      {meta.panels.map((panel, idx) => (
        <div
          key={panel.key}
          className="flex"
          style={{
            flexDirection: isVertical ? "column" : "row",
            flex: `0 0 ${panel.size}%`,
            minWidth: isVertical ? undefined : 0,
            minHeight: isVertical ? 0 : undefined,
            overflow: "hidden",
          }}
        >
          <div className="flex-1 overflow-auto">
            <Element id={`panel_${panel.key}`} is={ResizablePanelSlot} canvas>
              <Element is={CraftContainer} />
            </Element>
          </div>
          {/* Visual handle between panels */}
          {idx < meta.panels.length - 1 && (
            <div
              className={cn(
                "flex-shrink-0 bg-border flex items-center justify-center",
                isVertical ? "h-[4px] w-full" : "w-[4px] h-full",
              )}
            >
              {withHandle && (
                <div
                  className={cn(
                    "rounded-sm bg-border border border-border/60 flex items-center justify-center",
                    isVertical ? "h-[12px] w-[32px]" : "h-[32px] w-[12px]",
                  )}
                >
                  {isVertical ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5 rotate-90">
                      <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5">
                      <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
                    </svg>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

CraftResizable.craft = {
  displayName: "Resizable",
  props: {
    panelMeta: DEFAULT_PANEL_META_JSON,
    withHandle: true,
    borderColor: "",
    borderRadius: "rounded-lg",
    shadow: "",
    className: "",
    width: "auto",
    height: "200px",
  },
  rules: {
    canDrag: () => true,
    canMoveIn: () => false,
  },
};
