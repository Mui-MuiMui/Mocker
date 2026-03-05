# HoverCard コンポーネント仕様

## 概要
`CraftHoverCard` — ホバーするとカードを表示するトリガーテキスト。コンテンツは `linkedMocPath` で参照。

---

## 編集画面での挙動

```
<span className="text-sm font-medium underline underline-offset-4 cursor-pointer {className}" style={width/height}>
  {triggerText}
  {linkedMocPath && <LinkIcon className="inline h-3 w-3 opacity-50" />}
</span>
```

- ホバーカードは編集画面では表示されない（トリガーテキストのみ）
- `linkedMocPath` がある場合のみリンクアイコンを表示

---

## Webプレビューでの挙動

### 生成 TSX（craftToTsx.ts）
```tsx
<HoverCard>
  <HoverCardTrigger asChild>
    <span className="...underline...">{triggerText}</span>
  </HoverCardTrigger>
  <HoverCardContent className="{cardBorderClass} {cardShadowClass} {cardBorderRadius}">
    {/* linked: path */}
  </HoverCardContent>
</HoverCard>
```

### 別コンポーネントへの HoverCard ラッピング
他コンポーネントの prop に `hoverCardMocPath` が設定されている場合、`wrapWithHoverCard` 関数がそのコンポーネントを `<HoverCard>` でラップする。

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| triggerText | string | "Hover me" | トリガーテキスト |
| linkedMocPath | string | "" | ホバーカードコンテンツの .moc パス |
| cardBorderClass | string | "" | カードのボーダー色 |
| cardBorderWidth | string | "" | カードのボーダー幅 |
| cardShadowClass | string | "" | カードのシャドウ |
| cardBorderRadius | string | "rounded-md" | カードの角丸 |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
