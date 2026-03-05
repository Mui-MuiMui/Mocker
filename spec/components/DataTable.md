# DataTable コンポーネント仕様

## 概要
`CraftDataTable` — カラム定義と CSV データを持つ高機能テーブル。ソート・フィルタ・ページネーション・行選択・列表示切り替えをサポート。

---

## 編集画面での挙動

```
<div className="flex flex-col gap-2 {className}" style={width/height}>
  <!-- ツールバー（filterType==="bar" または columnToggle 時） -->
  <!-- テーブル（thead + tbody） -->
  <!-- ページネーション（pageable 時） -->
</div>
```

- Editor モード（`enabled === true`）時: ソート・フィルタ・ページネーション機能は無効（静的表示）
- Editor モード外: 全機能が有効（インタラクティブ操作可能）
- `stickyHeader: true` → thead セルに `position: sticky; top: 0; z-index: 2`
- `pinnedLeft` (数値): 左側 N 列を `position: sticky; left: 累積幅`

### columnDefs の構造（JSON 文字列）
```typescript
type ColumnDef = {
  key: string
  label: string
  type?: "text" | "number" | "badge" | "slot"
  width?: string
  align?: "left" | "center" | "right"
  sortable?: boolean
  filterable?: boolean
  // スタイル props...
}
```

### csvData の形式
1行目がヘッダー行、2行目以降がデータ行（カンマ区切り）。

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| columnDefs | string (JSON) | デフォルト定義 | カラム定義 |
| csvData | string | デフォルトデータ | CSV 形式のデータ |
| filterType | "none"\|"header"\|"bar" | "none" | フィルター UI の種類 |
| pageable | boolean | false | ページネーション有効 |
| pageSize | string | "10" | 1ページあたりの行数 |
| selectable | boolean | false | 行選択を有効化 |
| columnToggle | boolean | false | 列表示切り替えを有効化 |
| stickyHeader | boolean | false | ヘッダー行を固定 |
| pinnedLeft | string | "0" | 固定する左側列数 |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
| headerBgClass | string | "" | ヘッダーの背景色 |
| hoverRowClass | string | "" | 行ホバー時のクラス |
| selectedRowClass | string | "" | 選択行のクラス |
| headerTextClass | string | "" | ヘッダーのテキスト色 |
| headerHoverTextClass | string | "" | ヘッダーホバー時のテキスト色 |
| headerBorderClass | string | "" | ヘッダーのボーダー色 |
| tableBorderClass | string | "" | テーブルのボーダー色 |
| sortIconClass | string | "" | ソートアイコンの色 |
| filterIconClass | string | "" | フィルターアイコンの色 |
