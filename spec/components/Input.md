# Input コンポーネント仕様

## 概要
`CraftInput` — テキスト入力フィールド。

---

## 編集画面での挙動

```
<div style={{ width }}>
  <input type={type} placeholder={placeholder} disabled={disabled}
    className="flex rounded-md border border-input bg-transparent px-3 py-1 text-base ..."
    style={{ height, pointerEvents: "none" }}
    className={cn("...", className)}
  />
</div>
```

- Editor モード（`enabled === true`）時: input に `pointerEvents: "none"` を設定（クリックで選択できるようにするため）
- `width !== "auto"`: 外側 div の style に width を設定
- `height !== "auto"`: input の style に height を設定

---

## Webプレビューでの挙動

shadcn/ui の `<Input>` コンポーネントを使用（`pointerEvents` なし、実際に入力可能）。

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| type | "text"\|"email"\|"password"\|"number"\|"tel"\|"url"\|"search" | "text" | 入力タイプ |
| placeholder | string | "Enter text..." | プレースホルダー |
| disabled | boolean | false | 無効状態 |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
