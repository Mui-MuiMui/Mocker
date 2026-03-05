# Popover コンポーネント仕様

## 概要
`CraftPopover` — ポップオーバーのトリガーボタン。コンテンツは `linkedMocPath` で参照。

---

## 編集画面での挙動

```
<button className="inline-flex ... border border-input bg-background shadow-sm hover:bg-accent h-9 px-4 py-2 {className}" style={width/height}>
  {triggerText}
  {linkedMocPath && <LinkIcon className="ml-1 h-3 w-3 opacity-50" />}
</button>
```

- ポップオーバーは編集画面では開かない（トリガーボタンのみ表示）
- `linkedMocPath` がある場合のみリンクアイコンを表示

---

## Webプレビューでの挙動

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" className={className}>{triggerText}</Button>
  </PopoverTrigger>
  <PopoverContent>
    {/* linked: path */}
  </PopoverContent>
</Popover>
```

**注**: CraftPopover は現在パレットアイテムに登録されていない（resolvers には登録済み）。

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| triggerText | string | "Open Popover" | トリガーボタンのテキスト |
| linkedMocPath | string | "" | ポップオーバーコンテンツの .moc パス |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
