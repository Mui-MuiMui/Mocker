# Label コンポーネント仕様

## 概要
`CraftLabel` — フォームラベル。複数行テキストをサポート。

---

## 編集画面での挙動

```
<label htmlFor={htmlFor || undefined}
  className={cn("text-sm font-medium leading-none ...", className)}
  style={{ width, height, whiteSpace: "pre-line", display: inlineBlock? "inline-block" : undefined }}
>
  {text}
</label>
```

- `width` または `height` が `"auto"` 以外で、かつ既存の display クラス（flex/grid/block/inline-block/inline-flex）がない場合: `display: "inline-block"` を自動付加
- `whiteSpace: "pre-line"` で改行対応

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| text | string | "Label" | ラベルテキスト |
| htmlFor | string | "" | 紐付ける input の id（空文字 = 未設定） |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
