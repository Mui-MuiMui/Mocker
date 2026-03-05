# Badge コンポーネント仕様

## 概要
`CraftBadge` — バリアントスタイルを持つバッジ。

---

## 編集画面での挙動

```
<span className={cn(badgeVariants({ variant }), className)}
  style={{ width, height, whiteSpace: "pre-line" }}
>
  {text}
</span>
```

- CVA `badgeVariants` で variant から基本スタイルを生成
- `whiteSpace: "pre-line"` で改行対応

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| text | string | "Badge" | バッジテキスト |
| variant | "default"\|"secondary"\|"destructive"\|"outline" | "default" | スタイルバリアント |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
