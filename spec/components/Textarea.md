# Textarea コンポーネント仕様

## 概要
`CraftTextarea` — 複数行テキスト入力フィールド。

---

## 編集画面での挙動

```
<div style={{ width, height }}>
  <textarea rows={rows} placeholder={placeholder} disabled={disabled}
    className={cn("flex min-h-[60px] rounded-md border ... w-full", height !== "auto" && "h-full", className)}
  />
</div>
```

- `width` / `height` は両方とも外側 div の style に適用
- `height !== "auto"` の場合: textarea に `h-full` クラスを追加

---

## Webプレビューでの挙動

shadcn/ui の `<Textarea>` コンポーネントを使用。

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| placeholder | string | "Type your message here." | プレースホルダー |
| rows | number | 3 | 表示行数 |
| disabled | boolean | false | 無効状態 |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
