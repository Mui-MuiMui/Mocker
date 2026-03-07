# DropdownMenu コンポーネント仕様

## 概要
`CraftDropdownMenu` — トリガーボタンをクリックするとメニューが開くドロップダウン。

---

## 編集画面での挙動

```
<div className="relative inline-block {className}" style={width/height}>
  <button className="{triggerBgClass} {triggerBorderClass} {triggerShadowClass}">
    {triggerText} <ChevronDown />
  </button>
  <!-- open === true の場合 -->
  <div className="absolute ... {dropdownBgClass} {dropdownBorderClass}">
    <!-- セクションラベル（あれば） -->
    <!-- 各アイテム: separator / checkbox / item -->
  </div>
</div>
```

- `open` state でクリックのたびに開閉
- `checkedItems` state でチェックボックスの状態を管理

### menuData の構造
Menubar と同じ型定義（`MenuItemDef[]`）。デフォルト: Profile / Settings / Notifications / Log out の1グループ。

---

## Webプレビューでの挙動

### 生成 TSX（craftToTsx.ts `renderDropdownMenu`）
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" className={triggerCls}>{triggerText}</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className={dropdownCls} style={{ width: dropdownWidth }}>
    <DropdownMenuLabel>Profile</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuCheckboxItem checked>Show</DropdownMenuCheckboxItem>
    <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
  </DropdownMenuContent>
</DropdownMenu>
```

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| triggerText | string | "Open Menu" | トリガーボタンのテキスト |
| menuData | string (JSON) | 1グループ4アイテム | メニュー構造 |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
| triggerBgClass | string | "" | トリガーの背景色 |
| triggerTextClass | string | "" | トリガーのテキスト色 |
| triggerBorderClass | string | "" | トリガーのボーダー色 |
| triggerBorderWidth | string | "" | トリガーのボーダー幅 |
| triggerShadowClass | string | "" | トリガーのシャドウ |
| dropdownBgClass | string | "" | ドロップダウンの背景色 |
| dropdownTextClass | string | "" | ドロップダウンのテキスト色 |
| dropdownBorderClass | string | "" | ドロップダウンのボーダー色 |
| dropdownBorderWidth | string | "" | ドロップダウンのボーダー幅 |
| dropdownShadowClass | string | "" | ドロップダウンのシャドウ |
| dropdownWidth | string | "" | ドロップダウンの幅 |
| hoverBgClass | string | "" | ホバー時の背景色 |
| hoverTextClass | string | "" | ホバー時のテキスト色 |
| shortcutTextClass | string | "" | ショートカットのテキスト色 |
| checkTextClass | string | "" | チェックマークのテキスト色 |
