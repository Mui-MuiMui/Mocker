# Progress コンポーネント仕様

## 概要
`CraftProgress` — 進捗状況をバーで表示するコンポーネント。

---

## 編集画面での挙動

```
<div role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}
  className="relative h-2 w-full overflow-hidden rounded-full bg-primary/20 {className}"
  style={width/height}
>
  <div className="h-full bg-primary" style={{ transform: `translateX(-${100 - value}%)` }} />
</div>
```

- `value` (0〜100) が進捗率。`translateX` で塗りつぶし幅を制御

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| value | number | 50 | 進捗値（0〜100） |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
