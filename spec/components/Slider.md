# Slider コンポーネント仕様

## 概要
`CraftSlider` — 範囲内の値を視覚的に選択するスライダー。

---

## 編集画面での挙動

```
<div className="relative flex touch-none select-none items-center {className}" style={width/height}>
  <!-- トラック -->
  <div className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20 {trackClassName}">
    <!-- フィル -->
    <div className="{fillClassName || 'bg-primary'}" style={{ width: `${percentage}%` }} />
  </div>
  <!-- サム -->
  <div className="absolute h-4 w-4 rounded-full border bg-background shadow"
    style={{ left: `calc(${percentage}% - 8px)` }} />
</div>
```

- `percentage = ((value - min) / (max - min)) * 100`

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| value | number | 50 | 現在値 |
| min | number | 0 | 最小値 |
| max | number | 100 | 最大値 |
| step | number | 1 | ステップ幅 |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
| fillClassName | string | "" | フィル部分のカラークラス |
| trackClassName | string | "" | トラック部分のクラス |
