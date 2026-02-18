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
  const lastDeserializedRef = useRef<string>("");
  const actionsRef = useRef(actions);
  actionsRef.current = actions;

  useEffect(() => {
    if (!documentContent) return;

    // Skip if we already deserialized this exact content
    if (documentContent === lastDeserializedRef.current) return;

    // Try to deserialize the content as Craft.js JSON
    try {
      const parsed = JSON.parse(documentContent);
      if (parsed && typeof parsed === "object" && parsed.ROOT) {
        // Suppress onNodesChange saves during deserialize
        loadingRef.current = true;
        actionsRef.current.deserialize(documentContent);
        lastSavedRef.current = documentContent;
        lastDeserializedRef.current = documentContent;

        // Allow saves again after a tick (deserialize triggers sync events)
        requestAnimationFrame(() => {
          loadingRef.current = false;
        });
      }
    } catch {
      // Not valid JSON - new or empty file, use default editor state
      loadingRef.current = false;
    }
    // Only re-run when documentContent changes (actions is accessed via ref)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentContent, loadingRef, lastSavedRef]);

  return null;
}
