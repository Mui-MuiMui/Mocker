# Separator コンポーネント仕様

## 概要
`CraftSeparator` — 水平または垂直の区切り線。

---

## 編集画面での挙動

```
<div role="separator" className="{orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]'} shrink-0 bg-border {className}" style={width/height} />
```

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| orientation | "horizontal"\|"vertical" | "horizontal" | 方向 |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
