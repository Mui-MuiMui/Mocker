# Table コンポーネント仕様

## 概要
`CraftTable` — セル単位で子コンポーネントを配置できるスロットベースのテーブル。行・列の追加/削除、colspan/rowspan、固定ヘッダー、固定列をサポート。

---

## 編集画面での挙動

### レンダリング構造
```
<div className="overflow-auto" style={width/height}>
  <table className="border-separate border-spacing-0 {className}" style={width}>
    <colgroup>
      <col style={{ width: colWidths[physC] }} />  <!-- 各列の幅 -->
    </colgroup>
    <thead className="bg-muted/50">  <!-- isHeader=true の行 -->
      <tr>
        <th style={{ width, height: 1px, ...sticky }}>
          <div className="flex p-1 h-full ...">
            <Element id="cell_R_C" is={TableCellSlot} canvas />
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ width, height: 1px, ...sticky }}>
          <div className="flex p-1 h-full ...">
            <Element id="cell_R_C" is={TableCellSlot} canvas />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

- セル ID: `cell_{物理行インデックス}_{物理列インデックス}`（0始まり）
- `tableMeta` JSON で行・列の構成を管理
- colspan/rowspan を持つセルが占有するセルは `hiddenCells` で非表示

### tableMeta の構造（JSON 文字列）
```json
{
  "rowMap": [0, 1, 2],
  "colMap": [0, 1, 2],
  "nextKey": 3,
  "colWidths": { "0": "auto", "1": "auto", "2": "auto" }
}
```

### TableCellSlot
セルごとに配置されるスロットコンポーネント。

| prop | 型 | デフォルト |
|---|---|---|
| isHeader | boolean | false |
| bgClass | string | "" |
| borderClass | string | "" |
| colspan | number | undefined |
| rowspan | number | undefined |
| width | string | "" |
| height | string | "" |
| className | string | "" |

- `canDrag: false` / `canDrop: true` / `canMoveIn: true` / `canMoveOut: true`
- 常に `flex` コンテナ（`flex flex-row`）。TailwindEditor の `items-*`（Content V-Align）と `justify-*`（Text Align）が正しく機能する

### ボーダー適用
- セルに `border-r` / `border-b`、テーブルに `border-t` / `border-l` を付与し、`border-separate border-spacing-0` で隙間なく結合
- `borderColor` / `borderWidth` から `border-*` クラスを生成

### Sticky 関連
- `stickyHeader` (数値): 先頭 N 行を `position: sticky; top: 累積高` で固定
- `pinnedLeft` (数値): 左側 N 列を `position: sticky; left: 累積幅` で固定

---

## Webプレビューでの挙動

### 生成 TSX（craftToTsx.ts `renderTable`）
shadcn/ui の Table コンポーネント（Table/TableHeader/TableBody/TableRow/TableHead/TableCell）で出力。
- td/th に `height: 1px` トリック（常に設定）して内側 div の `h-full` を機能させる
- inner div は `flex {className}` として Content V-Align が機能する

### previewServer フォールバック（table）
- useEffect で sticky header の `top` 値を累積計算して `style.top` を動的設定
- style を `...rest` から除外して computed style の上書きを防ぐ

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| tableMeta | string (JSON) | 3×3 デフォルト | 行・列構成 |
| width | string | "auto" | テーブルの幅 |
| height | string | "auto" | テーブルの高さ |
| className | string | "" | 追加 Tailwind クラス |
| borderColor | string | "" | ボーダー色（Tailwind クラス、空 = `border-border`） |
| borderWidth | string | "1" | ボーダー幅（"0"/"1"/"2"/"4"） |
| stickyHeader | string | "" | 固定する先頭行数 |
| pinnedLeft | string | "" | 固定する左側列数 |

---

## 既知の落とし穴

- TableMetaEditor の行・列番号表示は **1始まり**（ユーザー向け表示）、`cell_` ID は **0始まり**（内部キー）
- TableCellSlot は `align` prop が削除され常に `flex flex-row`。TailwindEditor でのみスタイルを制御する
- td に `height: 1px` を必ず設定しないと、内側 div の `h-full` が機能しない（CSS 仕様）
