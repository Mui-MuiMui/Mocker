# Sonner コンポーネント仕様

## 概要
`CraftSonner` — トースト通知のプレビューコンポーネント。トリガーボタンとトーストのデザインを常時表示する。

---

## 編集画面での挙動

```
<div className="flex flex-col gap-2 {className}" style={width/height}>
  <!-- トリガーボタン -->
  <button className="inline-flex ... border bg-background h-9 px-4 py-2 w-fit">
    {triggerText}
  </button>
  <!-- トーストプレビュー（常時表示） -->
  <div className="rounded-lg border bg-background p-4 shadow-lg">
    <div className="text-sm font-semibold">{text}</div>
  </div>
</div>
```

- トーストは自動消退せず常時表示（静的プレビュー）

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| triggerText | string | "Show Toast" | トリガーボタンのテキスト |
| text | string | "Event has been created." | トーストのメッセージ |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
