# ScrollArea コンポーネント仕様

## 概要
`CraftScrollArea` — スクロール可能なコンテナ。子コンポーネントを自由に配置できるキャンバス対応コンポーネント。

---

## 編集画面での挙動

```
<div className="relative overflow-auto rounded-md border" style={width/height}>
  <div className="p-4">
    {children}  <!-- Craft.js の canvas -->
  </div>
</div>
```

- `canMoveIn: true` / `canDrop: true` — 子コンポーネントを受け付ける

---

## Webプレビューでの挙動

shadcn/ui の `<ScrollArea>` コンポーネントを使用。

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| width | string | "auto" | 幅 |
| height | string | "200px" | 高さ（デフォルト 200px） |
| className | string | "" | 追加 Tailwind クラス |
