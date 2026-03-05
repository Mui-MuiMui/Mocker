# NavigationMenu コンポーネント仕様

## 概要
`CraftNavigationMenu` — 各メニュー項目のドロップダウンコンテンツをキャンバスで編集できるナビゲーションバー。各ドロップダウンは `NavMenuSlot`。

---

## 編集画面での挙動

```
<nav className="relative flex items-center {className}" style={width/height}>
  <ul className="flex list-none items-center gap-1">
    <li className="relative">
      <button className="{buttonBgClass} {buttonBorderClass} {buttonShadowClass}">
        {item label}
        <ChevronDown />
      </button>
      <!-- ドロップダウン（クリックで表示/非表示） -->
      <div style={{ display: activeIndex === i ? undefined : "none" }}>
        <Element id="menu_{i}" is={NavMenuSlot} canvas />
      </div>
    </li>
  </ul>
</nav>
```

- Editor モード（`enabled === true`）: **クリック**でドロップダウン開閉（ホバーではない）
- 非 Editor モード: ホバーで表示

### NavMenuSlot
- `custom: { noResize: true }` → リサイズハンドルを無効化
- `canDrag: false` / `canDrop: true` / `canMoveIn: true` / `canMoveOut: true`

---

## Webプレビューでの挙動

### 生成 TSX（craftToTsx.ts `renderNavigationMenu`）
- 各メニューは `group-hover:block` パターンでホバー表示
- スロット内の子要素は `renderNodeFn` で再帰的にレンダリング

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| items | string | "Getting Started,Components,Documentation" | カンマ区切りのメニュー項目ラベル |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
| buttonBgClass | string | "" | ボタンの背景色 |
| hoverBgClass | string | "" | ホバー時の背景色 |
| hoverTextClass | string | "" | ホバー時のテキスト色 |
| buttonBorderClass | string | "" | ボタンのボーダー色 |
| buttonBorderWidth | string | "" | ボタンのボーダー幅（"0"/"1"/"2"/"4"/"8"） |
| buttonShadowClass | string | "" | ボタンのシャドウ |
