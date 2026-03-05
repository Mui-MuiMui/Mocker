import React from "react";

const KBD_CLASS =
  "pointer-events-none inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground select-none";

/**
 * 文字列中の <kbd>...</kbd> タグをスタイル付き kbd 要素に変換して返す。
 * タグが含まれない場合は文字列をそのまま返す。
 */
export function renderKbd(text: string): React.ReactNode {
  if (!text.includes("<kbd>")) return text;

  const parts = text.split(/(<kbd>.*?<\/kbd>)/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^<kbd>(.*?)<\/kbd>$/);
        if (match) {
          return (
            <kbd key={i} className={KBD_CLASS}>
              {match[1]}
            </kbd>
          );
        }
        return part || null;
      })}
    </>
  );
}
