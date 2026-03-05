# Collapsible コンポーネント仕様

## 概要
`CraftCollapsible` — ヘッダーとコンテンツを持つ折りたたみUI。ヘッダーとコンテンツはどちらも `CollapsibleSlot` というキャンバススロット。

---

## 編集画面での挙動

### レンダリング構造
```
<div className="rounded-md border {outerBorderColor} {outerShadow} {className}" style={width/height}>
  <!-- ヘッダーゾーン -->
  <div className="flex items-center justify-between px-4 py-2">
    <div className="flex-1">
      <Element id="header" is={CollapsibleSlot} canvas className="flex min-h-[24px] items-center gap-2" />
    </div>
    <!-- triggerStyle !== "none" の場合 -->
    <button className="{triggerBorderColor} {triggerShadow}">
      <svg><!-- chevron / plus-minus / arrow アイコン --></svg>
    </button>
  </div>
  <!-- コンテンツゾーン -->
  <div className="border-t px-4 py-2 {dividerBorderColor} {contentShadow}">
    <!-- linkedMocPath がある場合 -->
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <LinkIcon /> {linkedFileName}
    </div>
    <!-- linkedMocPath がない場合 -->
    <Element id="content" is={CollapsibleSlot} canvas className="min-h-[40px]" />
  </div>
</div>
```

- 編集画面では折りたたみ動作はなし（常時コンテンツを表示）
- `linkedMocPath` が設定されている場合、コンテンツスロットの代わりにリンク表示

### CollapsibleSlot
- `canDrag: false` / `canDrop: true` / `canMoveIn: true` / `canMoveOut: true`
- レンダリング: `<div className={cn("min-h-[20px]", className)}>`

### triggerStyle の種類
- `"chevron"`: ∨ → 開閉で180°回転
- `"plus-minus"`: + / −
- `"arrow"`: → → 開閉で90°回転
- `"none"`: トリガーボタン非表示

---

## Webプレビューでの挙動

### previewServer フォールバック（collapsible）
- `CollCtx`（`open/toggle`）で開閉状態を管理
- `CollapsibleTrigger`: `data-variant` に triggerStyle を渡し、アイコンの回転角度を動的計算
- `CollapsibleContent`: `open === false` の場合 `null` を返す

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| open | boolean | false | 初期開閉状態 |
| triggerStyle | "chevron"\|"plus-minus"\|"arrow"\|"none" | "chevron" | トリガーアイコンの種類 |
| linkedMocPath | string | "" | コンテンツの .moc パス |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
| outerBorderColor | string | "" | 外枠のボーダー色 |
| dividerBorderColor | string | "" | ヘッダー/コンテンツ間の区切り色 |
| triggerBorderColor | string | "" | トリガーボタンのボーダー色 |
| outerShadow | string | "" | 外枠のシャドウ |
| contentShadow | string | "" | コンテンツのシャドウ |
| triggerShadow | string | "" | トリガーボタンのシャドウ |
