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

// --- NavItemEditor ---

interface NavItemEditorProps {
  item: SidebarNavItem;
  depth: number;
  index: number;
  totalCount: number;
  openItems: Set<number>;
  onToggleOpen: (key: number) => void;
  onUpdate: (patch: Partial<SidebarNavItem>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  /** Adds a new child item to this item (root handles key allocation + nextKey increment) */
  addChildToItem: (parentKey: number) => void;
  onUpdateChildren: (newChildren: SidebarNavItem[]) => void;
}

function NavItemEditor({
  item,
  depth,
  index,
  totalCount,
  openItems,
  onToggleOpen,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  addChildToItem,
  onUpdateChildren,
}: NavItemEditorProps) {
  const isExpanded = openItems.has(item.key);
  const children = item.children || [];
  const hasChildren = children.length > 0;

  function updateChild(childKey: number, patch: Partial<SidebarNavItem>) {
    onUpdateChildren(children.map((c) => (c.key === childKey ? { ...c, ...patch } : c)));
  }

  function removeChild(childKey: number) {
    onUpdateChildren(children.filter((c) => c.key !== childKey));
  }

  function moveChildUp(idx: number) {
    if (idx === 0) return;
    const arr = [...children];
    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    onUpdateChildren(arr);
  }

  function moveChildDown(idx: number) {
    if (idx === children.length - 1) return;
    const arr = [...children];
    [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    onUpdateChildren(arr);
  }

  function updateGrandchildren(childKey: number, grandchildren: SidebarNavItem[]) {
    onUpdateChildren(children.map((c) => (c.key === childKey ? { ...c, children: grandchildren } : c)));
  }

  const indentStyle = depth > 0 ? { paddingLeft: `${depth * 16}px` } : undefined;

  return (
    <div style={indentStyle}>
      <div className="flex flex-col gap-1 rounded border border-[var(--vscode-panel-border,#444)] p-1.5">
        {/* Header row */}
        <div className="flex items-center gap-1">
          {item.type === "item" && (
            <button
              type="button"
              className={BTN_CLASS}
              onClick={() => onToggleOpen(item.key)}
              title={isExpanded ? "折りたたむ" : "展開"}
            >
              {isExpanded ? "▼" : "▶"}
            </button>
          )}
          {depth === 0 && (
            <select
              value={item.type}
              onChange={(e) => {
                const newType = e.target.value as SidebarNavItem["type"];
                const base: SidebarNavItem = { key: item.key, type: newType };
                if (newType !== "separator") base.label = item.label || (newType === "group-label" ? "Group" : "New Item");
                if (newType === "item") {
                  base.icon = item.icon;
                  base.active = item.active;
                  base.badge = item.badge;
                  base.badgeBgClass = item.badgeBgClass;
                  base.badgeTextClass = item.badgeTextClass;
                  base.children = item.children;
                  base.defaultOpen = item.defaultOpen;
                }
                onUpdate(base);
              }}
              className={`${INPUT_CLASS} w-[100px] shrink-0`}
            >
              <option value="item">item</option>
              <option value="group-label">group</option>
              <option value="separator">separator</option>
            </select>
          )}
          {item.type !== "separator" && (
            <input
              type="text"
              value={item.label ?? ""}
              onChange={(e) => onUpdate({ label: e.target.value })}
              className={`${INPUT_CLASS} flex-1`}
              placeholder="ラベル"
            />
          )}
          {item.type === "separator" && <span className="flex-1" />}
          <button
            type="button"
            className={BTN_CLASS}
            onClick={onMoveUp}
            disabled={index === 0}
            title="上へ"
          >
            ↑
          </button>
          <button
            type="button"
            className={BTN_CLASS}
            onClick={onMoveDown}
            disabled={index === totalCount - 1}
            title="下へ"
          >
            ↓
          </button>
          <button
            type="button"
            className={BTN_DANGER_CLASS}
            onClick={onDelete}
            title="削除"
          >
            ✕
          </button>
        </div>

        {/* Item details */}
        {item.type === "item" && isExpanded && (
          <div className="flex flex-col gap-1 pl-2">
            {/* Icon — hidden for grandchildren (depth=2) */}
            {depth < 2 && (
              <div className="flex flex-col gap-0.5">
                <label className="text-[11px] text-[var(--vscode-descriptionForeground,#888)]">アイコン</label>
                <IconCombobox
                  value={item.icon ?? ""}
                  onChange={(v) => onUpdate({ icon: v })}
                />
              </div>
            )}

            {/* Active */}
            <div className="flex items-center gap-2">
              <label className="text-[11px] text-[var(--vscode-descriptionForeground,#888)]">アクティブ</label>
              <button
                type="button"
                className={`${BTN_CLASS} min-w-[28px]`}
                onClick={() => onUpdate({ active: !item.active })}
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
                onChange={(e) => onUpdate({ badge: e.target.value })}
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
                    onChange={(e) => onUpdate({ badgeBgClass: e.target.value })}
                    className={`${INPUT_CLASS} w-full`}
                    placeholder="例: bg-primary"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <label className="text-[11px] text-[var(--vscode-descriptionForeground,#888)]">バッジ文字クラス</label>
                  <input
                    type="text"
                    value={item.badgeTextClass ?? ""}
                    onChange={(e) => onUpdate({ badgeTextClass: e.target.value })}
                    className={`${INPUT_CLASS} w-full`}
                    placeholder="例: text-primary-foreground"
                  />
                </div>
              </>
            )}

            {/* defaultOpen toggle — only if has children */}
            {hasChildren && (
              <div className="flex items-center gap-2">
                <label className="text-[11px] text-[var(--vscode-descriptionForeground,#888)]">初期展開</label>
                <button
                  type="button"
                  className={`${BTN_CLASS} min-w-[28px]`}
                  onClick={() => onUpdate({ defaultOpen: !item.defaultOpen })}
                >
                  {item.defaultOpen ? "☑" : "☐"}
                </button>
              </div>
            )}

            {/* Children */}
            {children.map((child, childIdx) => (
              <NavItemEditor
                key={child.key}
                item={child}
                depth={depth + 1}
                index={childIdx}
                totalCount={children.length}
                openItems={openItems}
                onToggleOpen={onToggleOpen}
                onUpdate={(patch) => updateChild(child.key, patch)}
                onDelete={() => removeChild(child.key)}
                onMoveUp={() => moveChildUp(childIdx)}
                onMoveDown={() => moveChildDown(childIdx)}
                addChildToItem={addChildToItem}
                onUpdateChildren={(grandchildren) => updateGrandchildren(child.key, grandchildren)}
              />
            ))}

            {/* Add child button — only for depth < 2 */}
            {depth < 2 && (
              <button
                type="button"
                className={BTN_CLASS}
                onClick={() => addChildToItem(item.key)}
              >
                + 子アイテム追加
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// --- SidebarMetaEditor ---

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

  function toggleOpen(key: number) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function patchItemByKey(items: SidebarNavItem[], key: number, patch: Partial<SidebarNavItem>): SidebarNavItem[] {
    return items.map((it) => {
      if (it.key === key) return { ...it, ...patch };
      if (it.children) return { ...it, children: patchItemByKey(it.children, key, patch) };
      return it;
    });
  }

  function removeItemByKey(items: SidebarNavItem[], key: number): SidebarNavItem[] {
    return items
      .filter((it) => it.key !== key)
      .map((it) => (it.children ? { ...it, children: removeItemByKey(it.children, key) } : it));
  }

  function findItemByKey(items: SidebarNavItem[], key: number): SidebarNavItem | undefined {
    for (const it of items) {
      if (it.key === key) return it;
      if (it.children) {
        const found = findItemByKey(it.children, key);
        if (found) return found;
      }
    }
  }

  /** Adds a new child item to the item with the given key, and increments nextKey */
  function addChildToItem(parentKey: number) {
    const key = meta.nextKey;
    const newChild: SidebarNavItem = { key, type: "item", label: "New Item" };
    const parent = findItemByKey(meta.items, parentKey);
    const newChildren = [...(parent?.children || []), newChild];
    const newItems = patchItemByKey(meta.items, parentKey, { children: newChildren });
    updateMeta({ ...meta, items: newItems, nextKey: key + 1 });
    setOpenItems((prev) => new Set([...prev, key]));
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

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs text-[var(--vscode-descriptionForeground,#888)]">ナビ項目構成</label>

      {meta.items.map((item, idx) => (
        <NavItemEditor
          key={item.key}
          item={item}
          depth={0}
          index={idx}
          totalCount={meta.items.length}
          openItems={openItems}
          onToggleOpen={toggleOpen}
          onUpdate={(patch) =>
            updateMeta({ ...meta, items: patchItemByKey(meta.items, item.key, patch) })
          }
          onDelete={() =>
            updateMeta({ ...meta, items: removeItemByKey(meta.items, item.key) })
          }
          onMoveUp={() => {
            if (idx === 0) return;
            const items = [...meta.items];
            [items[idx - 1], items[idx]] = [items[idx], items[idx - 1]];
            updateMeta({ ...meta, items });
          }}
          onMoveDown={() => {
            if (idx === meta.items.length - 1) return;
            const items = [...meta.items];
            [items[idx], items[idx + 1]] = [items[idx + 1], items[idx]];
            updateMeta({ ...meta, items });
          }}
          addChildToItem={addChildToItem}
          onUpdateChildren={(newChildren) =>
            updateMeta({ ...meta, items: patchItemByKey(meta.items, item.key, { children: newChildren }) })
          }
        />
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
