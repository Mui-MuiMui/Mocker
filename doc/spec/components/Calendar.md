# Calendar コンポーネント仕様

## 概要
`CraftCalendar` — 月表示カレンダーの静的表示コンポーネント。DatePicker とは異なり、独立したカレンダー UI として配置する。

---

## 編集画面での挙動

```
<div className="p-3 rounded-md border {className}" style={width/height}>
  <!-- 月ナビゲーション（前月 / 月名 / 次月ボタン） -->
  <!-- 7列グリッド（曜日ヘッダー + 日付ボタン） -->
  <!-- 本日: {todayBgClass} + {todayTextClass} -->
  <!-- その他: hover:bg-accent -->
</div>
```

- ナビゲーションボタンは機能なし（静的表示のみ）
- 本日のみハイライト

---

## Webプレビューでの挙動

### previewServer フォールバック（calendar）
単純な静的カレンダー表示。`todayBgClass` / `todayTextClass` を本日セルに適用。

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
| todayBgClass | string | "" | 本日の背景色 |
| todayTextClass | string | "" | 本日のテキスト色 |
