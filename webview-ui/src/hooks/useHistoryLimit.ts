import { useEffect, useRef } from "react";
import { useEditor } from "@craftjs/core";

interface HistoryLike {
  timeline: unknown[];
  pointer: number;
  add: (patches: unknown, inversePatches: unknown) => void;
}

/**
 * Craft.js の操作履歴に上限を設定するフック。
 * store.history.add() をラップし、上限超過時に古いエントリを削除する。
 */
export function useHistoryLimit(maxSize: number) {
  const { store } = useEditor() as unknown as { store: { history: HistoryLike } };
  const patchedRef = useRef(false);
  const maxSizeRef = useRef(maxSize);
  maxSizeRef.current = maxSize;

  useEffect(() => {
    if (!store?.history) return;
    const history = store.history;

    // 既存 timeline をトリミング
    if (history.timeline.length > maxSize) {
      const excess = history.timeline.length - maxSize;
      history.timeline.splice(0, excess);
      history.pointer = Math.max(-1, history.pointer - excess);
    }

    // 初回のみ add() をラップ
    if (!patchedRef.current) {
      const originalAdd = history.add.bind(history);
      history.add = function (patches: unknown, inversePatches: unknown) {
        originalAdd(patches, inversePatches);
        const limit = maxSizeRef.current;
        if (this.timeline.length > limit) {
          const excess = this.timeline.length - limit;
          this.timeline.splice(0, excess);
          this.pointer = Math.max(-1, this.pointer - excess);
        }
      };
      patchedRef.current = true;
    }
  }, [store, maxSize]);
}
