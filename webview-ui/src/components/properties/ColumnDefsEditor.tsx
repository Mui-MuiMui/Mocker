import { useEditor } from "@craftjs/core";
import type { ActionButton, ColumnDef } from "../../crafts/shadcn/CraftDataTable";

const INPUT_CLASS =
  "rounded border border-[var(--vscode-input-border,#3c3c3c)] bg-[var(--vscode-input-background,#3c3c3c)] px-2 py-1 text-xs text-[var(--vscode-input-foreground,#ccc)] focus:outline-none focus:ring-1 focus:ring-[var(--vscode-focusBorder,#007fd4)]";

const BTN_CLASS =
  "rounded border border-[var(--vscode-button-border,transparent)] bg-[var(--vscode-button-secondaryBackground,#3c3c3c)] px-2 py-0.5 text-[11px] text-[var(--vscode-button-secondaryForeground,#ccc)] hover:opacity-90 disabled:opacity-40";

const BTN_DANGER_CLASS =
  "rounded border border-[var(--vscode-button-border,transparent)] bg-[var(--vscode-errorForeground,#f44)] px-2 py-0.5 text-[11px] text-white hover:opacity-90 disabled:opacity-40";

const LABEL_CLASS = "text-[10px] text-[var(--vscode-descriptionForeground,#888)]";

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

  function addActionBtn(colIdx: number) {
    const newDefs = defs.map((d, i) => {
      if (i !== colIdx) return d;
      const existing = d.actionButtons ?? [];
      return { ...d, actionButtons: [...existing, { label: "Button" }] };
    });
    updateDefs(newDefs);
  }

  function removeActionBtn(colIdx: number, btnIdx: number) {
    const newDefs = defs.map((d, i) => {
      if (i !== colIdx) return d;
      const existing = d.actionButtons ?? [];
      return { ...d, actionButtons: existing.filter((_, bi) => bi !== btnIdx) };
    });
    updateDefs(newDefs);
  }

  function setActionBtnField<K extends keyof ActionButton>(
    colIdx: number,
    btnIdx: number,
    field: K,
    val: ActionButton[K],
  ) {
    const newDefs = defs.map((d, i) => {
      if (i !== colIdx) return d;
      const existing = d.actionButtons ?? [];
      const newBtns = existing.map((b, bi) => (bi === btnIdx ? { ...b, [field]: val } : b));
      return { ...d, actionButtons: newBtns };
    });
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
          const isData = !col.type || col.type === "data";
          const isActions = col.type === "actions";
          return (
            <div
              key={idx}
              className="flex flex-col gap-1.5 rounded border border-[var(--vscode-panel-border,#444)] p-2"
            >
              {/* Row 1: move buttons + key/label inputs + delete */}
              <div className="flex items-start gap-1">
                <div className="flex shrink-0 flex-col gap-0.5 pt-4">
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
                <div className="flex min-w-0 flex-1 gap-1">
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className={LABEL_CLASS}>key</span>
                    <input
                      type="text"
                      value={col.key}
                      onChange={(e) => setField(idx, "key", e.target.value)}
                      placeholder="key"
                      className={`${INPUT_CLASS} w-full`}
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className={LABEL_CLASS}>label</span>
                    <input
                      type="text"
                      value={col.label ?? ""}
                      onChange={(e) => setField(idx, "label", e.target.value || undefined)}
                      placeholder="label"
                      className={`${INPUT_CLASS} w-full`}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className={`${BTN_DANGER_CLASS} mt-4`}
                  onClick={() => removeCol(idx)}
                  disabled={defs.length <= 1}
                  title="削除"
                >
                  ✕
                </button>
              </div>

              {/* Row 2: type */}
              <div className="flex items-center gap-2 pl-8">
                <span className={LABEL_CLASS}>type:</span>
                <select
                  value={col.type ?? ""}
                  onChange={(e) => {
                    const v = e.target.value as ColumnDef["type"] | "";
                    setField(idx, "type", v || undefined);
                  }}
                  className={`${INPUT_CLASS} shrink-0`}
                >
                  <option value="">data</option>
                  <option value="actions">actions</option>
                  <option value="slot">slot</option>
                </select>
              </div>

              {/* Row 3 (data only): sortable + width */}
              {isData && (
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pl-8">
                  <label className="flex cursor-pointer items-center gap-1 text-[11px] text-[var(--vscode-foreground,#ccc)]">
                    <input
                      type="checkbox"
                      checked={col.sortable ?? false}
                      onChange={(e) => setField(idx, "sortable", e.target.checked || undefined)}
                    />
                    sortable
                  </label>
                  <div className="flex items-center gap-1">
                    <span className={LABEL_CLASS}>width:</span>
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
              )}

              {/* Row 3 (actions only): action buttons editor */}
              {isActions && (
                <div className="flex flex-col gap-1 pl-8">
                  <div className="flex items-center justify-between">
                    <span className={LABEL_CLASS}>Buttons:</span>
                    <button
                      type="button"
                      className={BTN_CLASS}
                      onClick={() => addActionBtn(idx)}
                    >
                      + Add
                    </button>
                  </div>
                  {(col.actionButtons ?? []).map((btn, bi) => (
                    <div
                      key={bi}
                      className="flex flex-col gap-1 rounded border border-[var(--vscode-panel-border,#444)] p-1.5"
                    >
                      <div className="flex items-center gap-1">
                        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                          <span className={LABEL_CLASS}>label</span>
                          <input
                            type="text"
                            value={btn.label}
                            onChange={(e) => setActionBtnField(idx, bi, "label", e.target.value)}
                            placeholder="Button"
                            className={`${INPUT_CLASS} w-full`}
                          />
                        </div>
                        <button
                          type="button"
                          className={`${BTN_DANGER_CLASS} mt-4 shrink-0`}
                          onClick={() => removeActionBtn(idx, bi)}
                          title="削除"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="flex flex-col gap-0.5">
                          <span className={LABEL_CLASS}>bg</span>
                          <input
                            type="text"
                            value={btn.bgClass ?? ""}
                            onChange={(e) => setActionBtnField(idx, bi, "bgClass", e.target.value || undefined)}
                            placeholder="bg-blue-500"
                            className={`${INPUT_CLASS} w-full`}
                          />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className={LABEL_CLASS}>text</span>
                          <input
                            type="text"
                            value={btn.textClass ?? ""}
                            onChange={(e) => setActionBtnField(idx, bi, "textClass", e.target.value || undefined)}
                            placeholder="text-white"
                            className={`${INPUT_CLASS} w-full`}
                          />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className={LABEL_CLASS}>border</span>
                          <input
                            type="text"
                            value={btn.borderClass ?? ""}
                            onChange={(e) => setActionBtnField(idx, bi, "borderClass", e.target.value || undefined)}
                            placeholder="border-blue-600"
                            className={`${INPUT_CLASS} w-full`}
                          />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className={LABEL_CLASS}>border-w</span>
                          <input
                            type="text"
                            value={btn.borderWidth ?? ""}
                            onChange={(e) => setActionBtnField(idx, bi, "borderWidth", e.target.value || undefined)}
                            placeholder="border-2"
                            className={`${INPUT_CLASS} w-full`}
                          />
                        </div>
                        <div className="col-span-2 flex flex-col gap-0.5">
                          <span className={LABEL_CLASS}>shadow</span>
                          <input
                            type="text"
                            value={btn.shadowClass ?? ""}
                            onChange={(e) => setActionBtnField(idx, bi, "shadowClass", e.target.value || undefined)}
                            placeholder="shadow-md"
                            className={`${INPUT_CLASS} w-full`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
