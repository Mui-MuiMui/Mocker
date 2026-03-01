import { useEditor } from "@craftjs/core";
import type { ColumnDef } from "../../crafts/shadcn/CraftDataTable";

const INPUT_CLASS =
  "rounded border border-[var(--vscode-input-border,#3c3c3c)] bg-[var(--vscode-input-background,#3c3c3c)] px-2 py-1 text-xs text-[var(--vscode-input-foreground,#ccc)] focus:outline-none focus:ring-1 focus:ring-[var(--vscode-focusBorder,#007fd4)]";

const BTN_CLASS =
  "rounded border border-[var(--vscode-button-border,transparent)] bg-[var(--vscode-button-secondaryBackground,#3c3c3c)] px-2 py-0.5 text-[11px] text-[var(--vscode-button-secondaryForeground,#ccc)] hover:opacity-90 disabled:opacity-40";

const BTN_DANGER_CLASS =
  "rounded border border-[var(--vscode-button-border,transparent)] bg-[var(--vscode-errorForeground,#f44)] px-2 py-0.5 text-[11px] text-white hover:opacity-90 disabled:opacity-40";

const DEFAULT_DEFS: ColumnDef[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "email", label: "Email" },
  { key: "actions", type: "actions" },
];

function parseColumnDefs(raw: string): ColumnDef[] {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_DEFS;
    return parsed;
  } catch {
    return DEFAULT_DEFS;
  }
}

interface ColumnDefsEditorProps {
  value: string;
  selectedNodeId: string;
}

export function ColumnDefsEditor({ value, selectedNodeId }: ColumnDefsEditorProps) {
  const { actions } = useEditor((state) => ({ nodes: state.nodes }));

  const defs = parseColumnDefs(value);

  function updateDefs(newDefs: ColumnDef[]) {
    actions.setProp(selectedNodeId, (props: Record<string, unknown>) => {
      props.columnDefs = JSON.stringify(newDefs);
    });
  }

  function setField<K extends keyof ColumnDef>(idx: number, field: K, val: ColumnDef[K]) {
    const newDefs = defs.map((d, i) => (i === idx ? { ...d, [field]: val } : d));
    updateDefs(newDefs);
  }

  function addCol() {
    const newKey = `col_${defs.length}`;
    updateDefs([...defs, { key: newKey }]);
  }

  function removeCol(idx: number) {
    if (defs.length <= 1) return;
    updateDefs(defs.filter((_, i) => i !== idx));
  }

  function moveUp(idx: number) {
    if (idx === 0) return;
    const newDefs = [...defs];
    [newDefs[idx - 1], newDefs[idx]] = [newDefs[idx], newDefs[idx - 1]];
    updateDefs(newDefs);
  }

  function moveDown(idx: number) {
    if (idx === defs.length - 1) return;
    const newDefs = [...defs];
    [newDefs[idx], newDefs[idx + 1]] = [newDefs[idx + 1], newDefs[idx]];
    updateDefs(newDefs);
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <label className="text-xs text-[var(--vscode-descriptionForeground,#888)]">columnDefs</label>
        <button type="button" className={BTN_CLASS} onClick={addCol}>
          + Add
        </button>
      </div>

      {/* Column list */}
      <div className="flex flex-col gap-2">
        {defs.map((col, idx) => {
          const showSortable = !col.type || col.type === "data";
          return (
            <div
              key={idx}
              className="flex flex-col gap-1 rounded border border-[var(--vscode-panel-border,#444)] p-2"
            >
              {/* Row 1: move buttons + key + label + delete */}
              <div className="flex items-center gap-1">
                <div className="flex shrink-0 flex-col gap-0.5">
                  <button
                    type="button"
                    className={BTN_CLASS}
                    onClick={() => moveUp(idx)}
                    disabled={idx === 0}
                    title="上へ"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className={BTN_CLASS}
                    onClick={() => moveDown(idx)}
                    disabled={idx === defs.length - 1}
                    title="下へ"
                  >
                    ↓
                  </button>
                </div>
                <input
                  type="text"
                  value={col.key}
                  onChange={(e) => setField(idx, "key", e.target.value)}
                  placeholder="key"
                  className={`${INPUT_CLASS} min-w-0 flex-1`}
                  title="key"
                />
                <input
                  type="text"
                  value={col.label ?? ""}
                  onChange={(e) => setField(idx, "label", e.target.value || undefined)}
                  placeholder="label"
                  className={`${INPUT_CLASS} min-w-0 flex-1`}
                  title="label"
                />
                <button
                  type="button"
                  className={BTN_DANGER_CLASS}
                  onClick={() => removeCol(idx)}
                  disabled={defs.length <= 1}
                  title="削除"
                >
                  ✕
                </button>
              </div>

              {/* Row 2: type + sortable + width */}
              <div className="flex items-center gap-2 pl-8">
                <select
                  value={col.type ?? ""}
                  onChange={(e) => {
                    const v = e.target.value as ColumnDef["type"] | "";
                    setField(idx, "type", v || undefined);
                  }}
                  className={`${INPUT_CLASS} shrink-0`}
                  title="type"
                >
                  <option value="">data</option>
                  <option value="actions">actions</option>
                  <option value="slot">slot</option>
                </select>
                {showSortable && (
                  <label className="flex cursor-pointer items-center gap-1 text-[11px] text-[var(--vscode-foreground,#ccc)]">
                    <input
                      type="checkbox"
                      checked={col.sortable ?? false}
                      onChange={(e) => setField(idx, "sortable", e.target.checked || undefined)}
                    />
                    sortable
                  </label>
                )}
                <div className="flex items-center gap-1">
                  <span className="shrink-0 text-[10px] text-[var(--vscode-descriptionForeground,#888)]">w:</span>
                  <input
                    type="number"
                    value={col.width ?? ""}
                    onChange={(e) => {
                      const n = parseInt(e.target.value);
                      setField(idx, "width", isNaN(n) ? undefined : n);
                    }}
                    placeholder="px"
                    className={`${INPUT_CLASS} w-16`}
                    min={0}
                    title="width (px)"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
