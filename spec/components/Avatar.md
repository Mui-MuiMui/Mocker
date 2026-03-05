# Avatar コンポーネント仕様

## 概要
`CraftAvatar` — 画像またはフォールバックテキストを表示するアバター。

---

## 編集画面での挙動

```
<span className="relative flex shrink-0 overflow-hidden rounded-full {sizeClass} {className}" style={width/height}>
  <!-- src がある場合 -->
  <img src={resolvedSrc} className="aspect-square h-full w-full" />
  <!-- src がない場合 -->
  <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
    {fallback}
  </span>
</span>
```

- `useResolvedImageSrc` hook で src を解決（プロジェクト内パスを絶対パスに変換）
- サイズクラス: `sm` → `h-8 w-8` / `default` → `h-10 w-10` / `lg` → `h-16 w-16`

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| src | string | "" | 画像ソース（空 = フォールバック表示） |
| fallback | string | "AB" | 画像がない場合のフォールバックテキスト |
| size | "default"\|"sm"\|"lg" | "default" | サイズ |
| width | string | "auto" | 幅（size を上書き） |
| height | string | "auto" | 高さ（size を上書き） |
| className | string | "" | 追加 Tailwind クラス |
