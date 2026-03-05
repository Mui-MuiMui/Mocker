# Tabs コンポーネント仕様

## 概要
`CraftTabs` — 複数タブを切り替えて異なるコンテンツを表示するコンポーネント。各タブのコンテンツは `TabContentSlot` というキャンバススロット。

---

## 編集画面での挙動

### レンダリング構造
```
<div className="flex {direction} {outerBorderColor} {outerShadow} {className}" style={width/height}>
  <!-- タブリスト -->
  <div className="inline-flex ... {tabListBgClass}">
    <button onClick={() => setActiveKey(key)} className="{tabActiveBgClass (アクティブ時)}">
      {icon && <IconComp />}
      {label}
    </button>
    ...
  </div>
  <!-- コンテンツエリア -->
  <div className="flex-1">
    <div style={{ display: key === activeKey ? undefined : "none" }}>
      <div className="rounded-md p-2 {contentBgClass} {contentBorderColor} {contentShadow}">
        <Element id="tab_{key}" is={TabContentSlot} canvas />
      </div>
    </div>
  </div>
</div>
```

- アクティブタブの切り替えは `activeKey` state で管理（編集画面内でタブをクリックして切り替え可能）
- 非アクティブタブの内容は `display: "none"` で非表示（削除はしない）
- `orientation: "vertical"` の場合: 外側 div が `flex-row`、タブリストが縦並び

### tabMeta の構造（JSON 文字列）
```json
{
  "keys": [0, 1, 2],
  "nextKey": 3,
  "labels": { "0": "Tab 1", "1": "Tab 2", "2": "Tab 3" },
  "icons": {},
  "tooltips": {}
}
```

### TabContentSlot
- `canDrag: false` / `canDrop: true` / `canMoveIn: true` / `canMoveOut: true`
- レンダリング: `<div className="min-h-[40px]">`

---

## Webプレビューでの挙動

### 生成 TSX（craftToTsx.ts `renderTabs`）
```tsx
<Tabs defaultValue="tab-0" orientation="horizontal" className={className} style={style}>
  <TabsList className="{tabListBgClass}">
    <TabsTrigger value="tab-0" className="{activeCls}">Tab 1</TabsTrigger>
    <TabsTrigger value="tab-1" className="{activeCls}">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab-0" className="{contentBgClass} {contentBorderColor} {contentShadow}">
    {/* tab_0 スロットの子要素 */}
  </TabsContent>
</Tabs>
```

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| tabMeta | string (JSON) | 3タブ構成 | タブ構成 |
| orientation | "horizontal"\|"vertical" | "horizontal" | タブの向き |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |
| tabListBgClass | string | "" | タブリストの背景色 |
| tabActiveBgClass | string | "" | アクティブタブの背景色 |
| contentBgClass | string | "" | コンテンツエリアの背景色 |
| outerBorderColor | string | "" | 外枠のボーダー色 |
| contentBorderColor | string | "" | コンテンツのボーダー色 |
| outerShadow | string | "" | 外枠のシャドウ |
| contentShadow | string | "" | コンテンツのシャドウ |
