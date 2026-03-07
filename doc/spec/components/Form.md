# Form コンポーネント仕様

## 概要
`CraftForm` — フォームのサンプル表示コンポーネント。フォームの見た目（Username / Email フィールド + 送信ボタン）をハードコードで表示する。

---

## 編集画面での挙動

```
<div className="space-y-4 {className}" style={width/height}>
  <!-- Username フィールド -->
  <div className="space-y-2">
    <label className="text-sm font-medium">Username</label>
    <input type="text" placeholder="Enter username" className="h-9 rounded-md border ..." />
    <p className="text-[0.8rem] text-muted-foreground">This is your public display name.</p>
  </div>
  <!-- Email フィールド（エラー状態） -->
  <div className="space-y-2">
    <label className="text-sm font-medium">Email</label>
    <input type="email" placeholder="Enter email" className="h-9 rounded-md border border-destructive ..." />
    <p className="text-[0.8rem] text-destructive">Please enter a valid email address.</p>
  </div>
  <!-- 送信ボタン -->
  <button className="bg-primary text-primary-foreground h-9 px-4 py-2">Submit</button>
</div>
```

- フォームの内容（フィールド名・プレースホルダー・バリデーション表示）はハードコード。変更できる prop は `width` / `height` / `className` のみ
- Email フィールドはバリデーションエラー状態のスタイリングを表示（デモ用）

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
