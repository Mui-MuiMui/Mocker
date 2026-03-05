# Pagination コンポーネント仕様

## 概要
`CraftPagination` — ページ切り替えナビゲーション。

---

## 編集画面での挙動

```
<nav role="navigation" aria-label="pagination" className="flex w-full {className}" style={width/height}>
  <ul className="flex flex-row items-center gap-1">
    <li><!-- Previous ボタン --></li>
    <li><!-- ページ 1 ボタン (active) --></li>
    <li><!-- ページ 2 ボタン --></li>
    ...
    <li><!-- Next ボタン --></li>
  </ul>
</nav>
```

- `currentPage` ページが `activeBgClass` / `activeTextClass` / `activeBorderClass` / `activeShadowClass` でハイライト
- `hoveredPage` state でホバー中のページを追跡（-1: prev, -2: next）
- `activeBorderWidth` の変換: `""` → `border`（1px）、`"0"` → `border-0`、`"2"` → `border-2`、`"4"` → `border-4`、`"8"` → `border-8`
- `hasCustomHover`: `hoverBgClass` または `hoverTextClass` が設定されている場合のみホバースタイルを適用

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| totalPages | number | 5 | 総ページ数 |
| currentPage | number | 1 | 現在のページ |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
| hoverBgClass | string | "" | ホバー時の背景色 |
| hoverTextClass | string | "" | ホバー時のテキスト色 |
| activeBgClass | string | "" | アクティブページの背景色 |
| activeTextClass | string | "" | アクティブページのテキスト色 |
| activeBorderClass | string | "" | アクティブページのボーダー色 |
| activeBorderWidth | string | "" | アクティブページのボーダー幅（空 = border 1px） |
| activeShadowClass | string | "" | アクティブページのシャドウ |
