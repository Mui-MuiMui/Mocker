# Skeleton コンポーネント仕様

## 概要
`CraftSkeleton` — ローディング中のプレースホルダーアニメーション。

---

## 編集画面での挙動

```
<div className="animate-pulse rounded-md bg-primary/10 {className}" style={width/height} />
```

- デフォルトの width: `"100%"` / height: `"20px"`（他コンポーネントと異なる）

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| width | string | "100%" | 幅（デフォルト 100%） |
| height | string | "20px" | 高さ（デフォルト 20px） |
| className | string | "" | 追加 Tailwind クラス |
