# Chart コンポーネント仕様

## 概要
`CraftChart` — 棒グラフ・折れ線グラフ・円グラフを表示する静的チャートコンポーネント。

---

## 編集画面での挙動

```
<div className="rounded-lg border p-4 {className}" style={width/height}>
  <p>"Chart ({chartType})"</p>
  <!-- chartType に応じて切り替え -->
  <!-- bar: div ベースの棒グラフ（flexbox） -->
  <!-- line: SVG polyline の折れ線グラフ -->
  <!-- pie: SVG strokeDasharray の円グラフ（3色固定） -->
</div>
```

- サンプルデータはハードコード（変更不可）
- `height: calc(100% - 2rem)` でタイトル領域分を除外

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| chartType | "bar"\|"line"\|"pie" | "bar" | チャートの種類 |
| width | string | "auto" | 幅 |
| height | string | "300px" | 高さ（デフォルト 300px） |
| className | string | "" | 追加 Tailwind クラス |
