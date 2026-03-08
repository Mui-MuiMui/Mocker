# Accordion コンポーネント仕様

## 概要
`CraftAccordion` — 複数のアイテムを折りたたみ表示するコンポーネント。各アイテムは静的テキスト（子コンポーネントは配置不可）。

---

## 編集画面での挙動

```
<div className="w-full {className}" style={width/height}>
  <!-- items をカンマ分割して各アイテムを表示 -->
  <div className="border-b">
    <div className="flex items-center justify-between py-4 px-1 font-medium">
      <span>{item label} {linkedMocPaths[i] && <LinkIcon />}</span>
      <ChevronDown />
    </div>
  </div>
  ...
</div>
```

- アコーディオンの開閉動作は編集画面では機能しない（静的表示）
- `linkedMocPaths[i]` がある場合: 該当アイテムにリンクアイコンを表示

---

## Webプレビューでの挙動

### 生成 TSX（craftToTsx.ts `renderAccordion`）
```tsx
<Accordion type="single" collapsible className={className} style={style}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Item 1</AccordionTrigger>
    <AccordionContent>
      {/* linked: path */}  <!-- linkedMocPaths がある場合 -->
      Content for Item 1.   <!-- ない場合のデフォルトテキスト -->
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

- `type: "multiple"` の場合: `collapsible` 属性を付与しない

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| items | string | "Item 1,Item 2,Item 3" | カンマ区切りのアイテムラベル |
| type | "single"\|"multiple" | "single" | 展開モード |
| linkedMocPaths | string | "" | カンマ区切りの .moc パス（各アイテムに対応） |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
