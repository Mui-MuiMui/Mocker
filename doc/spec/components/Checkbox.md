# Checkbox コンポーネント仕様

## 概要
`CraftCheckbox` — チェックボックス + ラベルのフォームコントロール。

---

## 編集画面での挙動

```
<div className="flex items-center space-x-2 {className}" style={width/height}>
  <button role="checkbox" className="h-4 w-4 shrink-0 rounded-sm border border-primary {checked ? bg-primary : ''}">
    {checked && <svg><!-- check mark --></svg>}
  </button>
  {label && <label className="text-sm font-medium leading-none">{label}</label>}
</div>
```

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| label | string | "Accept terms" | ラベルテキスト（空 = 非表示） |
| checked | boolean | false | チェック状態 |
| disabled | boolean | false | 無効状態 |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
