# Carousel コンポーネント仕様

## 概要
`CraftCarousel` — スライドショー形式のカルーセル。編集画面では最初のスライドのみ表示。

---

## 編集画面での挙動

```
<div className="relative w-full {className}" style={width/height}>
  <div className="overflow-hidden rounded-lg">
    <!-- 最初のスライドのみ表示 -->
    <div className="aspect-video border bg-muted flex items-center justify-center">
      {items[0]}
    </div>
  </div>
  <!-- ナビゲーションボタン（左右） -->
  <button className="absolute left-2 ..."><ChevronLeft /></button>
  <button className="absolute right-2 ..."><ChevronRight /></button>
  <!-- インジケータードット -->
  <div className="flex justify-center gap-1.5 mt-2">
    <span className="bg-primary" />  <!-- アクティブ -->
    <span className="bg-primary/30" />  <!-- 非アクティブ -->
  </div>
</div>
```

- 編集画面では最初のスライドのみ表示、ナビゲーションは見た目のみ（機能なし）

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| items | string | "Slide 1,Slide 2,Slide 3" | カンマ区切りのスライドラベル |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
