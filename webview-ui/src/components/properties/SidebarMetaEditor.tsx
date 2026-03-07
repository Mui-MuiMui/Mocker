import { useState } from "react";
import { useEditor } from "@craftjs/core";
import type { SidebarMeta, SidebarNavItem } from "../../crafts/shadcn/CraftSidebar";
import { DEFAULT_SIDEBAR_DATA } from "../../crafts/shadcn/CraftSidebar";
import { IconCombobox } from "./IconCombobox";

const INPUT_CLASS =
  "rounded border border-[var(--vscode-input-border,#3c3c3c)] bg-[var(--vscode-input-background,#3c3c3c)] px-2 py-1 text-xs text-[var(--vscode-input-foreground,#ccc)] focus:outline-none focus:ring-1 focus:ring-[var(--vscode-focusBorder,#007fd4)]";

const BTN_CLASS =
  "rounded border border-[var(--vscode-button-border,transparent)] bg-[var(--vscode-button-secondaryBackground,#3c3c3c)] px-2 py-0.5 text-[11px] text-[var(--vscode-button-secondaryForeground,#ccc)] hover:opacity-90 disabled:opacity-40";

const BTN_DANGER_CLASS =
  "rounded border border-[var(--vscode-button-border,transparent)] bg-[var(--vscode-errorForeground,#f44)] px-2 py-0.5 text-[11px] text-white hover:opacity-90 disabled:opacity-40";

function parseSidebarMeta(raw: string): SidebarMeta {
  try {
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.items)) return parsed as SidebarMeta;
    return JSON.parse(DEFAULT_SIDEBAR_DATA) as SidebarMeta;
  } catch {
    return JSON.parse(DEFAULT_SIDEBAR_DATA) as SidebarMeta;
  }
}

interface SidebarMetaEditorProps {
  value: string;
  selectedNodeId: string;
}

export function SidebarMetaEditor({ value, selectedNodeId }: SidebarMetaEditorProps) {
  const { actions } = useEditor(() => ({}));
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([1]));

  const meta = parseSidebarMeta(value);

  function updateMeta(newMeta: SidebarMeta) {
    actions.setProp(selectedNodeId, (props: Record<string, unknown>) => {
      props.sidebarData = JSON.stringify(newMeta);
    });
  }

  function updateItems(items: SidebarNavItem[]) {
    updateMeta({ ...meta, items });
  }

  function toggleOpen(key: number) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function addItem(type: SidebarNavItem["type"]) {
    const key = meta.nextKey;
    const newItem: SidebarNavItem = { key, type };
    if (type === "item") newItem.label = "New Item";
    if (type === "group-label") newItem.label = "Group";
    updateMeta({
      ...meta,
      items: [...meta.items, newItem],
      nextKey: key + 1,
    });
    if (type === "item") {
      setOpenItems((prev) => new Set([...prev, key]));
    }
  }

  function removeItem(key: number) {
    updateItems(meta.items.filter((it) => it.key !== key));
  }

  function moveItemUp(idx: number) {
    if (idx === 0) return;
    const items = [...meta.items];
    [items[idx - 1], items[idx]] = [items[idx], items[idx - 1]];
    updateItems(items);
  }

  function moveItemDown(idx: number) {
    if (idx === meta.items.length - 1) return;
    const items = [...meta.items];
    [items[idx], items[idx + 1]] = [items[idx + 1], items[idx]];
    updateItems(items);
  }

  function updateItem(key: number, patch: Partial<SidebarNavItem>) {
    updateItems(meta.items.map((it) => (it.key === key ? { ...it, ...patch } : it)));
  }

  function setItemType(key: number, newType: SidebarNavItem["type"]) {
    const item = meta.items.find((it) => it.key === key);
    if (!item) return;
    const base: SidebarNavItem = { key, type: newType };
    if (newType !== "separator") base.label = item.label || (newType === "group-label" ? "Group" : "New Item");
    if (newType === "item") {
      base.icon = item.icon;
      base.active = item.active;
      base.badge = item.badge;
      base.badgeBgClass = item.badgeBgClass;
      base.badgeTextClass = item.badgeTextClass;
    }
    updateItems(meta.items.map((it) => (it.key === key ? base : it)));
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs text-[var(--vscode-descriptionForeground,#888)]">ナビ項目構成</label>

      {meta.items.map((item, idx) => (
        <div
          key={item.key}
          className="flex flex-col gap-1 rounded border border-[var(--vscode-panel-border,#444)] p-1.5"
        >
          {/* Header row */}
          <div className="flex items-center gap-1">
            {item.type === "item" && (
              <button
                type="button"
                className={BTN_CLASS}
                onClick={() => toggleOpen(item.key)}
                title={openItems.has(item.key) ? "折りたたむ" : "展開"}
              >
                {openItems.has(item.key) ? "▼" : "▶"}
              </button>
            )}
            <select
              value={item.type}
              onChange={(e) => setItemType(item.key, e.target.value as SidebarNavItem["type"])}
              className={`${INPUT_CLASS} w-[100px] shrink-0`}
            >
              <option value="item">item</option>
              <option value="group-label">group</option>
              <option value="separator">separator</option>
            </select>
            {item.type !== "separator" && (
              <input
                type="text"
                value={item.label ?? ""}
                onChange={(e) => updateItem(item.key, { label: e.target.value })}
                className={`${INPUT_CLASS} flex-1`}
                placeholder="ラベル"
              />
            )}
            {item.type === "separator" && (
              <span className="flex-1 text-[11px] text-[var(--vscode-descriptionForeground,#888)] italic">
                ─── 区切り ───
              </span>
            )}
            <button
              type="button"
              className={BTN_CLASS}
              onClick={() => moveItemUp(idx)}
              disabled={idx === 0}
              title="上へ"
            >
              ↑
            </button>
            <button
              type="button"
              className={BTN_CLASS}
              onClick={() => moveItemDown(idx)}
              disabled={idx === meta.items.length - 1}
              title="下へ"
            >
              ↓
            </button>
            <button
              type="button"
              className={BTN_DANGER_CLASS}
              onClick={() => removeItem(item.key)}
              title="削除"
            >
              ✕
            </button>
          </div>

          {/* Item details */}
          {item.type === "item" && openItems.has(item.key) && (
            <div className="flex flex-col gap-1 pl-2">
              {/* Icon */}
              <div className="flex flex-col gap-0.5">
                <label className="text-[11px] text-[var(--vscode-descriptionForeground,#888)]">アイコン</label>
                <IconCombobox
                  value={item.icon ?? ""}
                  onChange={(v) => updateItem(item.key, { icon: v })}
                />
              </div>

              {/* Active */}
              <div className="flex items-center gap-2">
                <label className="text-[11px] text-[var(--vscode-descriptionForeground,#888)]">アクティブ</label>
                <button
                  type="button"
                  className={`${BTN_CLASS} min-w-[28px]`}
                  onClick={() => updateItem(item.key, { active: !item.active })}
                >
                  {item.active ? "☑" : "☐"}
                </button>
              </div>

              {/* Badge */}
              <div className="flex flex-col gap-0.5">
                <label className="text-[11px] text-[var(--vscode-descriptionForeground,#888)]">バッジ</label>
                <input
                  type="text"
                  value={item.badge ?? ""}
                  onChange={(e) => updateItem(item.key, { badge: e.target.value })}
                  className={`${INPUT_CLASS} w-full`}
                  placeholder="バッジテキスト（例: 5, New）"
                />
              </div>

              {item.badge && (
                <>
                  <div className="flex flex-col gap-0.5">
                    <label className="text-[11px] text-[var(--vscode-descriptionForeground,#888)]">バッジ背景クラス</label>
                    <input
                      type="text"
                      value={item.badgeBgClass ?? ""}
                      onChange={(e) => updateItem(item.key, { badgeBgClass: e.target.value })}
                      className={`${INPUT_CLASS} w-full`}
                      placeholder="例: bg-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <label className="text-[11px] text-[var(--vscode-descriptionForeground,#888)]">バッジ文字クラス</label>
                    <input
                      type="text"
                      value={item.badgeTextClass ?? ""}
                      onChange={(e) => updateItem(item.key, { badgeTextClass: e.target.value })}
                      className={`${INPUT_CLASS} w-full`}
                      placeholder="例: text-primary-foreground"
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Add buttons */}
      <div className="flex gap-1 flex-wrap">
        <button type="button" className={BTN_CLASS} onClick={() => addItem("item")}>
          + アイテム
        </button>
        <button type="button" className={BTN_CLASS} onClick={() => addItem("group-label")}>
          + グループ
        </button>
        <button type="button" className={BTN_CLASS} onClick={() => addItem("separator")}>
          + 区切り
        </button>
      </div>
    </div>
  );
}
