import { useEffect, useRef, type MutableRefObject } from "react";
import { useEditor } from "@craftjs/core";
import { useEditorStore } from "../stores/editorStore";

interface EditorLoaderProps {
  loadingRef: MutableRefObject<boolean>;
  lastSavedRef: MutableRefObject<string>;
}

/**
 * Loads saved Craft.js state from the document content when the file is opened.
 * Must be placed inside <Editor> to access useEditor().
 */
export function EditorLoader({ loadingRef, lastSavedRef }: EditorLoaderProps) {
  const { actions } = useEditor();
  const { documentContent } = useEditorStore();
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (!documentContent) return;

    // Try to deserialize the content as Craft.js JSON
    try {
      const parsed = JSON.parse(documentContent);
      if (parsed && typeof parsed === "object" && parsed.ROOT) {
        // Suppress onNodesChange saves during deserialize
        loadingRef.current = true;
        actions.deserialize(documentContent);
        lastSavedRef.current = documentContent;
        hasLoadedRef.current = true;

        // Allow saves again after a tick (deserialize triggers sync events)
        requestAnimationFrame(() => {
          loadingRef.current = false;
        });
      }
    } catch {
      // Not valid JSON - new or empty file, use default editor state
      if (!hasLoadedRef.current) {
        hasLoadedRef.current = true;
        loadingRef.current = false;
      }
    }
  }, [documentContent, actions, loadingRef, lastSavedRef]);

  return null;
}
