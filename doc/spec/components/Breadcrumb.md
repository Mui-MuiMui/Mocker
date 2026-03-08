# Breadcrumb コンポーネント仕様

## 概要
`CraftBreadcrumb` — パンくずリスト。`maxVisible` で中間項目を省略表示できる。

---

## 編集画面での挙動

```
<nav aria-label="breadcrumb" className={className} style={width/height}>
  <ol className="flex flex-wrap items-center gap-1.5 ...">
    <li>{first item（リンク）}</li>
    <!-- maxVisible 省略 -->
    <li><ChevronRight /> <EllipsisIcon /> <!-- ドロップダウンで省略項目 --> </li>
    <!-- 末尾項目 -->
    <li><ChevronRight /> <span>{last item（テキスト）}</span></li>
  </ol>
</nav>
```

### 省略ロジック
- `maxVisible === "0"`: 全アイテムを表示
- `maxVisible > 0` かつ `items.length > maxVisible`: 先頭1件 + 末尾 `(maxVisible-1)` 件を表示、中間を `...` に置換
- 省略アイコンクリックでドロップダウン表示（document の mousedown で外側クリック時に閉じる）
- **最後のアイテム**: `<BreadcrumbPage>`（リンクなし） / **それ以外**: `<BreadcrumbLink href="#">`

---

## Webプレビューでの挙動

### 生成 TSX（craftToTsx.ts `renderBreadcrumb`）
shadcn/ui の Breadcrumb コンポーネント（BreadcrumbList / BreadcrumbItem / BreadcrumbLink / BreadcrumbPage / BreadcrumbSeparator / BreadcrumbEllipsis）で出力。

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| items | string | "Home,Products,Current" | カンマ区切りのパンくず項目 |
| maxVisible | string | "0" | 最大表示数（0 = 全表示） |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
