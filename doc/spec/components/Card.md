# Card コンポーネント仕様

## 概要
`CraftCard` — タイトル・説明文とコンテンツエリアを持つカード型コンテナ。Craft.js の canvas として子コンポーネントを配置できる。

---

## 編集画面での挙動

```
<div className="rounded-xl border bg-card text-card-foreground shadow {className}" style={width/height}>
  <!-- タイトルまたは description がある場合 -->
  <div className="flex flex-col space-y-1.5 p-6">
    <h3 className="...font-semibold...">{title} {linkedMocPath && <LinkIcon />}</h3>
    <p className="text-sm text-muted-foreground" style="white-space:pre-line">{description}</p>
  </div>
  <!-- コンテンツ（canvas） -->
  <div className="p-6 pt-0">
    {children}
  </div>
</div>
```

- `canMoveIn: true` / `canDrop: true` — 子コンポーネントを受け付ける
- `contextMenuMocPath` がある場合: `ring-1 ring-dashed ring-muted-foreground/30` クラスを追加（右クリックメニューが設定されていることを示す）
- `linkedMocPath` がある場合: タイトルにリンクアイコンを表示

---

## Webプレビューでの挙動

```tsx
<Card className={className} style={style}>
  <CardHeader>
    <CardTitle>{title}</CardTitle>
    <CardDescription>{description}</CardDescription>
  </CardHeader>
  <CardContent>
    {children}
  </CardContent>
</Card>
```

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| title | string | "Card Title" | カードタイトル |
| description | string | "" | カード説明文 |
| linkedMocPath | string | "" | リンク先の .moc パス |
| contextMenuMocPath | string | "" | 右クリックメニューの .moc パス |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
