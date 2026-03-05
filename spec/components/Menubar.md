# Menubar コンポーネント仕様

## 概要
`CraftMenubar` — アプリケーションメニューバー。JSON 形式でメニュー構造を定義する。

---

## 編集画面での挙動

```
<div className="flex h-9 items-center space-x-1 rounded-md border bg-background p-1 {className}">
  <div className="relative">
    <button className="{buttonBgClass} {buttonBorderClass}">{menu label}</button>
    <!-- activeIndex === i の場合のみ表示 -->
    <div className="absolute ... {dropdownBgClass} {dropdownBorderClass}">
      <!-- 各アイテム -->
      <div className="my-1 h-px bg-border" />  <!-- separator -->
      <div>✓ {label}</div>  <!-- checkbox -->
      <div>{label} <span>{shortcut}</span></div>  <!-- item -->
    </div>
  </div>
</div>
```

- `activeIndex` state でクリックしたメニューを開閉

### menuData の構造（JSON 文字列）
```typescript
type MenuItemDef =
  | { type: "item"; label: string; shortcut?: string }
  | { type: "checkbox"; label: string; checked?: boolean; shortcut?: string }
  | { type: "separator" }

type TopLevelMenuDef = { label: string; items: MenuItemDef[]; width?: string }
```

デフォルト: File / Edit / View / Help の4メニュー。パース失敗時はデフォルトにフォールバック。

---

## Webプレビューでの挙動

### 生成 TSX（craftToTsx.ts `renderMenubar`）
```tsx
<Menubar className={className} style={style}>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New Tab <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
      <MenubarSeparator />
      <MenubarCheckboxItem checked>Show Bookmarks</MenubarCheckboxItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| menuData | string (JSON) | File/Edit/View/Help | メニュー構造 |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
| buttonBgClass | string | "" | メニューボタンの背景色 |
| buttonTextClass | string | "" | メニューボタンのテキスト色 |
| buttonBorderClass | string | "" | メニューボタンのボーダー色 |
| buttonBorderWidth | string | "" | メニューボタンのボーダー幅 |
| buttonShadowClass | string | "" | メニューボタンのシャドウ |
| hoverBgClass | string | "" | ホバー時の背景色 |
| hoverTextClass | string | "" | ホバー時のテキスト色 |
| dropdownBgClass | string | "" | ドロップダウンの背景色 |
| dropdownTextClass | string | "" | ドロップダウンのテキスト色 |
| dropdownBorderClass | string | "" | ドロップダウンのボーダー色 |
| dropdownBorderWidth | string | "" | ドロップダウンのボーダー幅 |
| dropdownShadowClass | string | "" | ドロップダウンのシャドウ |
| dropdownWidth | string | "" | ドロップダウンの幅 |
| shortcutTextClass | string | "" | ショートカットのテキスト色 |
