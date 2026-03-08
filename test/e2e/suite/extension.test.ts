import * as assert from "assert";
import * as vscode from "vscode";

const EXTENSION_ID = "Mui-MuiMui.momoc";
const COMMANDS = [
  "momoc.createMocFile",
  "momoc.toggleCodeDesign",
  "momoc.openPreview",
  "momoc.switchLayoutMode",
  "momoc.toggleTheme",
  "momoc.exportFlatTsx",
  "momoc.openBrowserPreview",
  "momoc.exportImage",
];

suite("Momoc 拡張機能 結合テスト", () => {
  let ext: vscode.Extension<unknown>;

  suiteSetup(async () => {
    const found = vscode.extensions.getExtension(EXTENSION_ID);
    assert.ok(found, `拡張機能 ${EXTENSION_ID} が見つかりません`);
    ext = found;
    await ext.activate();
  });

  test("拡張機能が登録されている", () => {
    assert.ok(
      vscode.extensions.getExtension(EXTENSION_ID),
      `拡張機能 ${EXTENSION_ID} が登録されていません`
    );
  });

  test("拡張機能がアクティベートされている", () => {
    assert.strictEqual(ext.isActive, true, "拡張機能がアクティブではありません");
  });

  test("全コマンドが登録されている", async () => {
    const allCommands = await vscode.commands.getCommands(true);
    for (const command of COMMANDS) {
      assert.ok(
        allCommands.includes(command),
        `コマンド ${command} が登録されていません`
      );
    }
  });

  test("momoc.switchLayoutMode - アクティブエディタなしで実行しても例外なし", async () => {
    await assert.doesNotReject(
      () => Promise.resolve(vscode.commands.executeCommand("momoc.switchLayoutMode")),
      "momoc.switchLayoutMode の実行中に例外が発生しました"
    );
  });

  test("momoc.toggleTheme - アクティブエディタなしで実行しても例外なし", async () => {
    await assert.doesNotReject(
      () => Promise.resolve(vscode.commands.executeCommand("momoc.toggleTheme")),
      "momoc.toggleTheme の実行中に例外が発生しました"
    );
  });

  test("momoc.exportImage - アクティブエディタなしで実行しても例外なし", async () => {
    await assert.doesNotReject(
      () => Promise.resolve(vscode.commands.executeCommand("momoc.exportImage")),
      "momoc.exportImage の実行中に例外が発生しました"
    );
  });

  test("momoc.exportFlatTsx - .mocファイルなしで実行しても例外なし", async () => {
    await assert.doesNotReject(
      () => Promise.resolve(vscode.commands.executeCommand("momoc.exportFlatTsx")),
      "momoc.exportFlatTsx の実行中に例外が発生しました"
    );
  });
});
