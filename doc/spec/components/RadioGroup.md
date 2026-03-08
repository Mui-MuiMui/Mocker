# RadioGroup コンポーネント仕様

## 概要
`CraftRadioGroup` — ラジオボタングループ。カードレイアウトと説明テキストをサポート。

---

## 編集画面での挙動

```
<div role="radiogroup" className="... {className}" style={width/height}>
  <!-- 各アイテム: variant / description の組み合わせで4パターン -->
  <!-- variant="card" + description あり: カード型（flex items-start gap-4） -->
  <!-- variant="card" + description なし: カード型（flex items-center） -->
  <!-- default + description あり: flex items-start space-x-2 -->
  <!-- default: flex items-center space-x-2 -->
  <button role="radio" aria-checked={item === value} />
  <label>{item}</label>
  <p>{description}</p>
</div>
```

- `value` prop で選択状態を制御（`item === value` が true のアイテムが選択済み）
- `orientation: "horizontal"` → `flex flex-row gap-4` / `"vertical"` → `grid gap-2`
- `variant="card"` + 選択済み → `border-primary` で強調

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| items | string | "Option A,Option B,Option C" | カンマ区切りの選択肢 |
| value | string | "Option A" | 選択中の値 |
| orientation | "vertical"\|"horizontal" | "vertical" | 並び方向 |
| variant | "default"\|"card" | "default" | レイアウトバリアント |
| descriptions | string | "" | カンマ区切りの説明テキスト |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
| cardBorderColor | string | "" | カードのボーダー色（inline style） |
| cardBgColor | string | "" | カードの背景色（inline style） |
| descriptionColor | string | "" | 説明テキストの色（inline style） |
