# テストルール

## テスト構成

| 種別 | ディレクトリ | フレームワーク | 実行コマンド |
|---|---|---|---|
| ユニットテスト | `test/unit/` | Vitest | `pnpm test` |
| 結合テスト（E2E） | `test/e2e/` | Mocha + @vscode/test-electron | `pnpm run test:e2e` |

- ユニットテスト対象: `src/services/` 配下のロジック（パーサー、シリアライザー、コード生成など）
- E2Eテスト対象: 拡張機能コマンドの登録・実行の疎通確認（`test/e2e/suite/extension.test.ts`）

## テストの実行タイミング

コミット前には必ず両方のテストがパスすることを確認すること（ビルド確認と同様の必須チェック）:

```bash
pnpm test                # ユニットテスト
pnpm run build:extension # E2Eテスト実行前に必要
pnpm run test:e2e        # E2Eテスト（初回はVSCodeをダウンロード）
```

## テスト見直しが必要なケース

以下の変更を行った場合、対応するテストの追加・修正が必要かどうかを**必ずチェック**すること:

### ユニットテストの見直しが必要なケース

- `src/services/` 配下のファイルを変更した場合
- パーサー・シリアライザー・コード生成ロジックの仕様変更
- 新しいコンポーネントタイプを追加した場合（craftToTsx.ts / mocParser.ts への影響）

### E2Eテストの見直しが必要なケース

- `package.json` の `contributes.commands` にコマンドを追加・削除した場合 → `extension.test.ts` の `COMMANDS` 配列を更新
- 新しいコマンドを `src/extension.ts` に登録した場合 → 対応するテストケースを追加
- 拡張機能ID（`publisher.name`）を変更した場合 → `EXTENSION_ID` 定数を更新

## テストを追加するときのパターン

- **ユニットテスト**: `test/unit/services/` に既存ファイルを参考に Vitest の `describe`/`it` スタイルで追加
- **E2Eテスト**: `test/e2e/suite/extension.test.ts` に `suite`/`test` TDDスタイルで追加
