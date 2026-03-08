# Resizable コンポーネント仕様

## 概要
`CraftResizable` — ドラッグで各パネルのサイズを変更できる分割レイアウト。水平・垂直の方向をサポート。各パネルは `ResizablePanelSlot` というキャンバススロット。

---

## 編集画面での挙動

### レンダリング構造
```
<div className="flex {direction} border {borderColor} {shadow} {borderRadius} {className}" style={width/height}>
  <!-- パネル × N -->
  <div style={{ flex: getPanelFlex(size) }}>
    <div className="flex-1 overflow-auto">
      <Element id="panel_{key}" is={ResizablePanelSlot} canvas />
    </div>
    <!-- セパレーター（最後のパネル以外） -->
    <div onMouseDown={handleSeparatorDrag} style={{ width/height: separatorSize + "px" }}
         className="{separatorColor}">
      {withHandle && <GripHorizontal / GripVertical />}
    </div>
  </div>
</div>
```

- セパレーターをドラッグすると `liveSizes` state が更新され、mouseup で `actions.setProp` に確定
- `panelMeta` JSON でパネル構成を管理
- `direction` が `"horizontal"` → `flex-row`、`"vertical"` → `flex-col`

### panelMeta の構造（JSON 文字列）
```json
{
  "direction": "horizontal",
  "nextKey": 2,
  "panels": [
    { "key": 0, "size": 50 },
    { "key": 1, "size": 50 }
  ]
}
```

`size` は `%` 単位または `px` 値（`"100px"` 形式で絶対指定）。

### ResizablePanelSlot
| prop | 型 | 説明 |
|---|---|---|
| children | ReactNode | 子コンポーネント |

- `custom: { noResize: true }` → RenderNode のリサイズハンドルを無効化
- `canDrag: false` / `canDrop: true` / `canMoveIn: true` / `canMoveOut: true`
- レンダリング: `<div className="min-h-[40px] h-full w-full overflow-auto">`

---

## Webプレビューでの挙動

### 生成 TSX（craftToTsx.ts `renderResizable`）
```tsx
<div className="{border} {shadow} {borderRadius}">
  <ResizablePanelGroup direction="horizontal">
    <ResizablePanel defaultSize={50}>
      {/* スロット内の子要素 */}
    </ResizablePanel>
    <ResizableHandle withHandle className="{separatorColor}" style={{ width: separatorSize }} />
    <ResizablePanel defaultSize={50}>
      ...
    </ResizablePanel>
  </ResizablePanelGroup>
</div>
```

- 絶対単位 (`"100px"`) の場合: `defaultSize` を使わず `style={{ flex: "0 0 100px" }}`
- `separatorColor` は Tailwind `bg-*` クラス（空 = `bg-border`）

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| panelMeta | string (JSON) | 2パネル水平50:50 | パネル構成 |
| withHandle | boolean | true | セパレーターにグリップアイコンを表示 |
| borderColor | string | "" | 外枠のボーダー色 |
| separatorColor | string | "" | セパレーター色（`bg-*` クラス、空 = `bg-border`） |
| separatorSize | string | "4" | セパレーターの太さ（px） |
| borderRadius | string | "rounded-lg" | 外枠の角丸 |
| shadow | string | "" | 外枠のシャドウ |
| className | string | "" | 追加 Tailwind クラス |
| width | string | "auto" | 幅 |
| height | string | "200px" | 高さ |

---

## 既知の落とし穴

- `ResizablePanelSlot` は `custom: { noResize: true }` が必要。設定しないと RenderNode が 6 点リサイズハンドルを表示してしまう
- セパレータードラッグは `allNumeric` チェック（size が全て数値/% の場合）が通るときのみ有効
