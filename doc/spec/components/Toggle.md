# Toggle コンポーネント仕様

## 概要
`CraftToggle` — 押下状態を持つトグルボタン。アイコンのみ、テキストのみ、両方のレイアウトをサポート。

---

## 編集画面での挙動

```
<div className="inline-flex" style={width/height}>
  <button type="button" aria-pressed={pressed}
    className="{variant} {size} {pressed ? 'bg-accent text-accent-foreground' : 'bg-transparent'}"
    style={{ whiteSpace: "pre-line", width: custom? "100%" : undefined }}
  >
    {icon && <IconComp style={{ fill: pressed ? "currentColor" : undefined }} />}
    {text}
  </button>
</div>
```

- `pressed: true` → `bg-accent text-accent-foreground` + アイコンが塗りつぶし（fill: currentColor）

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| text | string | "Toggle" | ボタンテキスト |
| variant | "default"\|"outline" | "default" | スタイルバリアント |
| size | "default"\|"sm"\|"lg" | "default" | サイズ |
| pressed | boolean | false | 押下状態 |
| disabled | boolean | false | 無効状態 |
| icon | string | "" | lucide-react アイコン名（空 = アイコンなし） |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
