# AspectRatio コンポーネント仕様

## 概要
`CraftAspectRatio` — 指定したアスペクト比を維持するコンテナ。子コンポーネントを配置できるキャンバス対応コンポーネント。

---

## 編集画面での挙動

### サイズ計算ロジック
3パターンで動作が分岐する:

1. **`width` 指定あり** (`width !== "auto"`): `width` を明示 → `height: calc(${width} * ${1/ratio})`
2. **`height` 指定あり** (`width === "auto"` かつ `height !== "auto"`): `height` を明示 → `width: calc(${height} * ${ratio})`
3. **両方 auto**: `aspectRatio: ratio` + `w-full`（CSS の aspect-ratio プロパティで管理）

全ケースで `alignSelf: "flex-start"` を適用（flex コンテナ内での収縮防止）。

### 注意点
- useEffect で両軸が明示された場合を検出し、width 優先で height をリセットする
- `keepAspectRatio: true` により RenderNode がドラッグ中にアスペクト比を維持する

---

## Webプレビューでの挙動

- 編集画面と同じ calc() ロジックを previewServer フォールバックでも使用
- shadcn/ui の `<AspectRatio>` コンポーネントは flex コンテナ内で機能しないため、calc() で明示的に計算

---

## Props 一覧

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| ratio | number | 16/9 | アスペクト比（幅 / 高さ） |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| keepAspectRatio | boolean | true | RenderNode ドラッグ中に比率維持 |
| className | string | "" | 追加 Tailwind クラス |

---

## 既知の落とし穴

- `keepAspectRatio` は `COMPONENT_EXCLUDED_PROPS` で PropEditor から非表示（ユーザーが直接変更しない）
- CSS の `aspect-ratio` は flex コンテナ内で機能しない。必ず calc() アプローチを使うこと
