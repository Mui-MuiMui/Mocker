import { useEditor } from "@craftjs/core";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PropEditor } from "./PropEditor";
import { TailwindEditor } from "./TailwindEditor";
import { useEditorStore } from "../../stores/editorStore";

export function PropertiesPanel() {
  const { t } = useTranslation();
  const isPropertiesOpen = useEditorStore((s) => s.isPropertiesOpen);
  const toggleProperties = useEditorStore((s) => s.toggleProperties);
  const { selected, selectedNodeDisplayName, selectedCount, isSameType, commonTypeName } = useEditor((state) => {
    const ids = state.events.selected ? Array.from(state.events.selected) : [];
    const currentNodeId = ids[0];
    let selectedNodeDisplayName = "";

    if (currentNodeId) {
      const node = state.nodes[currentNodeId];
      selectedNodeDisplayName =
        node?.data?.displayName || node?.data?.name || "";
    }

    // Check if all selected nodes are the same component type
    let isSameType = true;
    let commonTypeName = selectedNodeDisplayName;
    if (ids.length > 1) {
      const firstNode = state.nodes[ids[0]];
      const firstType = firstNode?.data?.type;
      for (let i = 1; i < ids.length; i++) {
        const node = state.nodes[ids[i]];
        if (node?.data?.type !== firstType) {
          isSameType = false;
          commonTypeName = "";
          break;
        }
      }
    }

    return {
      selected: currentNodeId || null,
      selectedNodeDisplayName,
      selectedCount: ids.length,
      isSameType,
      commonTypeName,
    };
  });

  if (!isPropertiesOpen) {
    return (
      <div className="flex w-8 flex-col items-center border-l border-[var(--vscode-panel-border,#333)] bg-[var(--vscode-sideBar-background,#252526)] pt-2">
        <button
          type="button"
          onClick={toggleProperties}
          title={t("properties.title")}
          className="flex h-6 w-6 items-center justify-center rounded text-[var(--vscode-foreground,#ccc)] hover:bg-[var(--vscode-list-hoverBackground,#2a2d2e)]"
        >
          <ChevronLeft size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-64 flex-col border-l border-[var(--vscode-panel-border,#333)] bg-[var(--vscode-sideBar-background,#252526)]">
      <div className="border-b border-[var(--vscode-panel-border,#333)] p-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--vscode-sideBarTitle-foreground,#bbb)]">
            {t("properties.title")}
          </h2>
          <button
            type="button"
            onClick={toggleProperties}
            title={t("properties.toggle")}
            className="rounded px-1 py-0.5 text-[var(--vscode-foreground,#ccc)] hover:bg-[var(--vscode-list-hoverBackground,#2a2d2e)]"
          >
            <ChevronRight size={14} />
          </button>
        </div>
        {selected && selectedCount === 1 && (
          <p className="mt-1 text-xs text-[var(--vscode-descriptionForeground,#888)]">
            {selectedNodeDisplayName}
          </p>
        )}
        {selectedCount > 1 && (
          <p className="mt-1 text-xs text-[var(--vscode-descriptionForeground,#888)]">
            {isSameType
              ? t("properties.multiSelectSameType", { count: selectedCount, name: commonTypeName })
              : t("properties.multiSelect", { count: selectedCount })}
          </p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {selected ? (
          <div className="flex flex-col">
            <PanelSection title={t("properties.props")}>
              <PropEditor />
            </PanelSection>
            <PanelSection title={t("properties.tailwind")}>
              <TailwindEditor />
            </PanelSection>
          </div>
        ) : (
          <div className="flex h-32 items-center justify-center p-4 text-center text-xs text-[var(--vscode-descriptionForeground,#888)]">
            {t("properties.noSelection")}
          </div>
        )}
      </div>
    </div>
  );
}

function PanelSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-[var(--vscode-panel-border,#333)]">
      <div className="px-3 py-2">
        <h3 className="mb-2 text-xs font-semibold text-[var(--vscode-foreground,#ccc)]">
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}
