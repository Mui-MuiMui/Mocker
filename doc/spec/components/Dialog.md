# Dialog / AlertDialog / Drawer / Sheet コンポーネント仕様

## 概要
これら4コンポーネントはいずれも「トリガーボタン + linkedMocPath によるオーバーレイ」のパターン。編集画面ではボタンのみ表示。

---

## 各コンポーネントの違い

| コンポーネント | displayName | ボタンスタイル | 追加 prop |
|---|---|---|---|
| CraftDialog | "Dialog" | variant（default/destructive/outline/secondary/ghost/link） | variant |
| CraftAlertDialog | "AlertDialog" | 固定（primary） | なし |
| CraftDrawer | "Drawer" | 固定（outline/bg-background） | なし |
| CraftSheet | "Sheet" | 固定（outline/bg-background） | side |

---

## 編集画面での挙動

```
<button className="{スタイル} h-9 px-4 py-2 {className}" style={width/height}>
  {triggerText}
  {linkedMocPath && <LinkIcon className="ml-1 h-3 w-3 opacity-50" />}
</button>
```

- オーバーレイは編集画面では開かない（ボタンのみ表示）
- `linkedMocPath` がある場合のみリンクアイコンを表示

---

## Webプレビューでの挙動

### CraftDialog
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant={variant}>{triggerText}</Button>
  </DialogTrigger>
  <DialogContent style={{ width, height }}>
    {/* linked: path */}
  </DialogContent>
</Dialog>
```

### CraftSheet
```tsx
<Sheet>
  <SheetTrigger asChild><Button variant="outline">{triggerText}</Button></SheetTrigger>
  <SheetContent side="{side}" style={{ width, height }}>
    {/* linked: path */}
  </SheetContent>
</Sheet>
```

---

## Props 一覧（CraftDialog）

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| triggerText | string | "Open Dialog" | トリガーボタンのテキスト |
| linkedMocPath | string | "" | ダイアログコンテンツの .moc パス |
| variant | "default"\|"destructive"\|... | "default" | ボタンのバリアント |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |

## Props 一覧（CraftSheet）

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| triggerText | string | "Open Sheet" | トリガーボタンのテキスト |
| linkedMocPath | string | "" | シートコンテンツの .moc パス |
| side | "top"\|"right"\|"bottom"\|"left" | "right" | シートの出現方向 |
| width | string | "auto" | 幅 |
| height | string | "auto" | 高さ |
| className | string | "" | 追加 Tailwind クラス |

（AlertDialog / Drawer は triggerText / linkedMocPath / width / height / className のみ）
