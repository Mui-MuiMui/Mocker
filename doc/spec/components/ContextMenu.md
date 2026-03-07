# ContextMenu コンポーネント仕様

## 概要
`CraftContextMenu` — 右クリックメニューのプレビュー表示コンポーネント。メニュー内容を直接表示する（ポップアップではなく常時表示）。

---

## 編集画面での挙動

```
<div className="flex flex-col rounded-md p-1 {panelBgClass} {panelBorderClass} {panelShadowClass} {className}" style={width/height}>
  <div className="px-2 py-1 text-xs text-muted-foreground font-medium border-b mb-1">右クリックメニュー</div>
  <!-- 各アイテム -->
  <div className="my-1 h-px bg-border" />  <!-- separator -->
  <div>✓ {label}</div>  <!-- checkbox -->
  <div>{label} <span>{shortcut}</span></div>  <!-- item -->
</div>
```

- 右クリックでポップアップするのではなく、**メニューの中身を常時表示**するプレビューコンポーネント
- デフォルト width: `"200px"`（他コンポーネントと異なり `"auto"` ではない）

---

## Webプレビューでの挙動

### 生成 TSX（craftToTsx.ts `renderContextMenu`）
```tsx
<ContextMenuContent className={panelCls} style={{ width }}>
  <ContextMenuLabel>Open</ContextMenuLabel>
  <ContextMenuSeparator />
  <ContextMenuCheckboxItem checked>Edit</ContextMenuCheckboxItem>
  <ContextMenuItem>Delete <ContextMenuShortcut>⌘D</ContextMenuShortcut></ContextMenuItem>
</ContextMenuContent>
```

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| menuData | string (JSON) | Open/Edit/Show Details/Delete | メニュー構造 |
| width | string | "200px" | 幅（デフォルト 200px） |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
| panelBgClass | string | "" | パネルの背景色 |
| panelTextClass | string | "" | パネルのテキスト色 |
| panelBorderClass | string | "" | パネルのボーダー色 |
| panelBorderWidth | string | "" | パネルのボーダー幅 |
| panelShadowClass | string | "" | パネルのシャドウ |
| hoverBgClass | string | "" | ホバー時の背景色 |
| hoverTextClass | string | "" | ホバー時のテキスト色 |
| shortcutTextClass | string | "" | ショートカットのテキスト色 |
| checkTextClass | string | "" | チェックマークのテキスト色 |
