# ToggleGroup コンポーネント仕様

## 概要
`CraftToggleGroup` — 複数のトグルボタンをグループ化したコンポーネント。

---

## 編集画面での挙動

```
<div role="group" className="flex {orientation} gap-{gap} {className}" style={width/height}>
  <!-- items をカンマ分割して各ボタンを表示 -->
  <!-- description あり: 縦スタック（ボタン + 説明テキスト） -->
  <!-- description なし: ボタンのみ -->
  <!-- 最初のアイテム（i===0）が aria-pressed="true" / data-state="on"（選択状態） -->
</div>
```

- `orientation: "vertical"` → `flex-col`
- `disabled: true` → `opacity-50 pointer-events-none`
- gap: `"0"/"1"/"2"/"3"/"4"/"6"/"8"` → `gap-*` クラス

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| items | string | "Bold,Italic,Underline" | カンマ区切りのアイテムラベル |
| type | "single"\|"multiple" | "single" | 選択モード |
| variant | "default"\|"outline" | "default" | スタイルバリアント |
| size | "default"\|"sm"\|"lg" | "default" | サイズ |
| disabled | boolean | false | 無効状態 |
| gap | string | "1" | ボタン間の間隔（gap-* クラスの値） |
| orientation | "horizontal"\|"vertical" | "horizontal" | 並び方向 |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
| descriptions | string | "" | カンマ区切りの説明テキスト（各アイテムに対応） |
| cardBorderColor | string | "" | カードのボーダー色（inline style） |
| cardBgColor | string | "" | カードの背景色（inline style） |
| descriptionColor | string | "" | 説明テキストの色（inline style） |
