# Command コンポーネント仕様

## 概要
`CraftCommand` — コマンドパレット UI。グループ・セパレーター・アイコン・ショートカットを持つアイテムリストと検索フィールドを表示する。

---

## 編集画面での挙動

### レンダリング構造
```
<div className="flex flex-col overflow-hidden rounded-md border bg-popover text-popover-foreground" style={width/height}>
  <div className="flex items-center border-b px-3 {inputBorderClass} {inputRoundedClass}">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <input type="text" placeholder={placeholder} readOnly />
  </div>
  <div className="max-h-[300px] overflow-y-auto overflow-x-hidden p-1">
    {renderItems(items)}
  </div>
</div>
```

- 検索フィールドは **readOnly**（編集画面では入力・絞り込み機能なし、見た目のみ）
- `commandData`（JSON）をパースして `renderItems` でアイテムを再帰的にレンダリング
- アイコンは `lucide-react` から動的取得。未定義アイコンは空スペース（`<span className="h-4 w-4 shrink-0" />`）

### commandData の構造（JSON 文字列）
```typescript
type CommandItemDef =
  | { type: "item"; label: string; icon?: string; shortcut?: string }
  | { type: "separator" }
  | { type: "group"; label: string; items: CommandItemDef[] }
```

パース失敗時は `DEFAULT_COMMAND_DATA`（Suggestions / Settings の2グループ）にフォールバック。

### ボーダー幅変換
`itemBorderWidth` / `inputBorderWidth` / `separatorBorderWidth` の値:
- `""` → クラスなし（デフォルト）
- `"0"` → `border-0`
- `"1"` → `border`
- `"2"` → `border-2`
- `"4"` → `border-4`
- `"8"` → `border-8`

---

## Webプレビューでの挙動

### 生成 TSX 構造（craftToTsx.ts `renderCommand`）
```tsx
<Command className={className} style={style}>
  <CommandInput placeholder="{placeholder}" className="{inputCls}" />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    {/* グループ・セパレーター・アイテムを再帰的に生成 */}
    <CommandGroup heading="Suggestions">
      <CommandItem value="Calendar" className="{itemCls}">
        <Calendar className="{iconCls}" />
        <span>Calendar</span>
        <span className="{shortcutCls}">⌘S</span>
      </CommandItem>
    </CommandGroup>
    <CommandSeparator className="{separatorCls}" />
  </CommandList>
</Command>
```

### フォールバック実装（previewServer.ts `command`）
- `Command`: `Ctx`（`search/setSearch/visibleCount`）を提供
- `CommandInput`: `ComboboxCtx` が **存在しない場合のみ** 入力フィールドを描画（Combobox 内では null）
- `CommandItem`: `ctx.search` または `comboCtx.search` で value をフィルタリング。クリックで `comboCtx` があれば選択・クローズ
- `CommandEmpty`: search が空 または visibleCount > 0 の場合は非表示

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| commandData | string (JSON) | DEFAULT_COMMAND_DATA | アイテム定義（JSON文字列） |
| placeholder | string | "Type a command or search..." | 検索フィールドのプレースホルダー |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
| itemBgClass | string | "" | アイテム背景色 |
| itemTextClass | string | "" | アイテムテキスト色 |
| itemBorderClass | string | "" | アイテムのボーダー色 |
| itemBorderWidth | string | "" | アイテムのボーダー幅（"0"/"1"/"2"/"4"/"8"） |
| itemShadowClass | string | "" | アイテムのシャドウ |
| hoverBgClass | string | "" | ホバー時の背景色（`hover:` プレフィックスで適用） |
| hoverTextClass | string | "" | ホバー時のテキスト色（`hover:` プレフィックスで適用） |
| iconClass | string | "" | アイコンのクラス（空 = `opacity-60`） |
| shortcutTextClass | string | "" | ショートカットのテキスト色（空 = `text-muted-foreground`） |
| groupHeadingClass | string | "" | グループ見出しのクラス（空 = `text-muted-foreground`） |
| inputBorderClass | string | "" | 検索フィールドエリアのボーダー色 |
| inputBorderWidth | string | "" | 検索フィールドエリアのボーダー幅 |
| inputRoundedClass | string | "" | 検索フィールドエリアの角丸 |
| separatorClass | string | "" | セパレーター背景色（空 = `bg-border`） |
| separatorShadowClass | string | "" | セパレーターのシャドウ |
| separatorBorderClass | string | "" | セパレーターのボーダー色 |
| separatorBorderWidth | string | "" | セパレーターのボーダー幅 |

---

## 既知の落とし穴

- `CommandInput` は Combobox の内部では `null` を返す。これは正しい仕様。Combobox の検索フィールドは `Button`（`role="combobox"`）が担う
- `hoverBgClass` / `hoverTextClass` は `hover:${cls}` という形で適用される（クラス名に `hover:` が自動付与される）
- `COMPONENT_MAP` に placeholder エントリが必要（`tag: "div", propsMap: [], isContainer: false` 等）。エントリを削除すると `renderCommand` に到達する前に `{/* Unknown */}` として返される
