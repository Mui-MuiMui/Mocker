# Alert コンポーネント仕様

## 概要
`CraftAlert` — アイコン付きのアラートメッセージ。

---

## 編集画面での挙動

```
<div role="alert" className="{alertVariants({ variant })} {className}" style={width/height}>
  <IconComp />  <!-- lucide-react からアイコン名で動的取得 -->
  <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>
  <div className="text-sm" style={{ whiteSpace: "pre-line" }}>{description}</div>
</div>
```

- CVA `alertVariants` で variant から基本スタイルを生成
- アイコンは `lucide-react` から `icon` prop（アイコン名）で動的取得
- `title` / `description` は `whiteSpace: "pre-line"` で改行対応

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| title | string | "Alert" | タイトル |
| description | string | "This is an alert message." | 説明文 |
| variant | "default"\|"destructive" | "default" | スタイルバリアント |
| icon | string | "AlertCircle" | lucide-react アイコン名 |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
