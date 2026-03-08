# DatePicker コンポーネント仕様

## 概要
`CraftDatePicker` — 日付（または日時）を選択するポップオーバー型ピッカー。

---

## 編集画面での挙動

```
<div style={width/height} className={className}>
  <!-- トリガー部分 -->
  <div className="relative flex items-center">
    <input type="text" readOnly placeholder={placeholder}
      className="... {height !== 'auto' ? 'h-full' : 'h-9'}"
      style={{ pointerEvents: "none" }}
    />
    <button><!-- CalendarIcon --></button>
  </div>
  <!-- ポップオーバー（open === true 時） -->
  <div className="fixed inset-0" />  <!-- backdrop -->
  <div>
    <!-- カレンダーパネル + mode==="datetime" 時は時刻入力 + OKボタン -->
  </div>
</div>
```

- Editor モード（`enabled === true`）時: input に `pointerEvents: "none"`（クリックで選択できるようにするため）
- ポップオーバーは編集画面でも開閉できる（backdrop クリックで閉じる）

---

## Webプレビューでの挙動

### previewServer フォールバック（datepicker）
- DatePicker 専用のフォールバック実装
- カレンダーは動的（月ナビゲーション、日付クリックで選択）
- `createPortal` で body に portal（fixed, z-9999）
- `todayBgClass` / `todayTextClass` は本日ハイライトに適用
- `selectedBgClass` / `selectedTextClass` は選択日に適用

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| mode | "date"\|"datetime" | "date" | 選択モード |
| dateFormat | string | "yyyy/MM/dd" | 日付フォーマット |
| placeholder | string | "日付を選択..." | プレースホルダー |
| editable | boolean | false | 手入力を許可するか |
| disabled | boolean | false | 無効状態 |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
| calendarBorderClass | string | "" | カレンダーのボーダー色 |
| calendarShadowClass | string | "" | カレンダーのシャドウ |
| todayBgClass | string | "" | 本日の背景色 |
| todayTextClass | string | "" | 本日のテキスト色 |
| todayBorderClass | string | "" | 本日のボーダー色 |
| todayShadowClass | string | "" | 本日のシャドウ |
| selectedBgClass | string | "" | 選択日の背景色 |
| selectedTextClass | string | "" | 選択日のテキスト色 |
| selectedBorderClass | string | "" | 選択日のボーダー色 |
| selectedShadowClass | string | "" | 選択日のシャドウ |
| buttonBgClass | string | "" | ナビゲーションボタンの背景色 |
| hoverBgClass | string | "" | 日付ボタンのホバー背景色 |
