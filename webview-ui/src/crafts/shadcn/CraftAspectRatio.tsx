import { useEffect } from "react";
import { useNode, useEditor, type UserComponent } from "@craftjs/core";
import { cn } from "../../utils/cn";

interface CraftAspectRatioProps {
  ratio?: number;
  width?: string;
  height?: string;
  className?: string;
  children?: React.ReactNode;
}

export const CraftAspectRatio: UserComponent<CraftAspectRatioProps> = ({
  ratio = 16 / 9,
  width = "auto",
  height = "auto",
  className = "",
  children,
}) => {
  const { id, connectors: { connect, drag } } = useNode();
  const { actions } = useEditor();

  // width が主: width が明示的に設定されている
  const widthControlled = width !== "auto";
  // height が主: width は auto、height が明示的に設定されている
  const heightControlled = !widthControlled && height !== "auto";

  // コーナードラッグ時に RenderNode が両方を commit する場合、width を主にして height をリセット
  useEffect(() => {
    if (widthControlled && height !== "auto") {
      actions.setProp(id, (p: Record<string, unknown>) => {
        p.height = "auto";
      });
    }
  }, [widthControlled, height, id, actions]);

  return (
    <div
      ref={(ref) => { if (ref) connect(drag(ref)); }}
      // デフォルト（両方 auto）のみ w-full でコンテナを埋める
      className={cn("relative", !widthControlled && !heightControlled && "w-full", className)}
      style={{
        width: widthControlled ? width : undefined,
        // heightControlled の場合のみ明示的な height を適用。
        // それ以外は "auto" を inline style で明示し、RenderNode の直接 DOM 操作を上書き。
        height: heightControlled ? height : "auto",
        aspectRatio: ratio,
      }}
    >
      {children ?? (
        <div className="flex min-h-[60px] items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/30 text-xs text-muted-foreground">
          コンポーネントをドロップ
        </div>
      )}
    </div>
  );
};

CraftAspectRatio.craft = {
  displayName: "AspectRatio",
  props: {
    ratio: 16 / 9,
    width: "auto",
    height: "auto",
    className: "",
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => true,
    canMoveOut: () => true,
  },
};
