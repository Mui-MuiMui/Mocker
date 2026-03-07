# Switch コンポーネント仕様

## 概要
`CraftSwitch` — ON/OFF トグルスイッチ。カードレイアウトとインラインレイアウトをサポート。

---

## 編集画面での挙動

### variant="default"
```
<div className="flex items-center space-x-2" style={width/height}>
  <button role="switch" aria-checked={checked} className="{checked ? bg-primary + checkedCls : uncheckedCls} {size}">
    <span className="thumb" />
  </button>
  <div>
    <label className="{labelColor}">{label}</label>
    <p className="{descriptionColor}">{description}</p>
  </div>
</div>
```

### variant="card"
```
<div className="flex justify-between items-center border p-4 rounded-lg {cardBorderColor} {cardBgColor}" style={width/height}>
  <div>
    <label>{label}</label>
    <p>{description}</p>
  </div>
  <button role="switch" aria-checked={checked} />
</div>
```

- `invalid: true` → スイッチに `ring-2 ring-destructive`
- サイズ: `default` → h-5 w-9 / `sm` → h-4 w-7

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| label | string | "Toggle" | ラベルテキスト |
| checked | boolean | false | ON/OFF 状態 |
| disabled | boolean | false | 無効状態 |
| description | string | "" | 説明テキスト |
| invalid | boolean | false | バリデーションエラー状態 |
| size | "default"\|"sm" | "default" | スイッチのサイズ |
| variant | "default"\|"card" | "default" | レイアウトバリアント |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
| checkedClassName | string | "" | ON 時に追加するクラス |
| uncheckedClassName | string | "" | OFF 時に追加するクラス |
| cardBorderColor | string | "" | カードのボーダー色（inline style） |
| cardBgColor | string | "" | カードの背景色（inline style） |
| descriptionColor | string | "" | 説明テキストの色（inline style） |
| labelColor | string | "" | ラベルの色（inline style） |
