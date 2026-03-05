# Tooltip コンポーネント仕様

## 概要
`CraftTooltip` — トリガーテキストとツールチップを常時表示するプレビューコンポーネント。

---

## 編集画面での挙動

```
<div className="inline-flex flex-col items-center gap-1 {className}" style={width/height}>
  <button className="... border ...">
    {triggerText}
  </button>
  <!-- ツールチップを常時表示 -->
  <div className="rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in ...">
    {text}
  </div>
</div>
```

- ツールチップは常時表示（ホバーで切り替えではなく常に見える）

---

## Webプレビューでの挙動

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">{triggerText}</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>{text}</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

previewServer フォールバック（tooltip）: `createPortal` で fixed 配置（z-9999）。

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| triggerText | string | "Hover" | トリガーボタンのテキスト |
| text | string | "Tooltip text" | ツールチップの内容 |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
