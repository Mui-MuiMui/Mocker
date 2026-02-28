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

  const widthControlled = width !== "auto";
  const heightControlled = !widthControlled && height !== "auto";

  // コーナードラッグ後に両方が設定された場合、width を主として height をリセット
  useEffect(() => {
    if (widthControlled && height !== "auto") {
      actions.setProp(id, (p: Record<string, unknown>) => {
        p.height = "auto";
      });
    }
  }, [widthControlled, height, id, actions]);

  // CSS aspect-ratio を常に使用してドラッグ中も動的に比率を維持する。
  // align-self: flex-start で flex コンテナの align-items:stretch による
  // height 上書きを回避する。
  //
  // - widthControlled: width 明示 + height:auto → aspect-ratio が高さを計算
  // - heightControlled: height 明示 + width はブラウザが aspect-ratio から計算
  // - default: w-full で幅を確保し aspect-ratio が高さを計算
  const computedStyle: React.CSSProperties = widthControlled
    ? {
        width,
        aspectRatio: ratio,
        alignSelf: "flex-start",
      }
    : heightControlled
      ? {
          height,
          aspectRatio: ratio,
          alignSelf: "flex-start",
        }
      : {
          aspectRatio: ratio,
          alignSelf: "flex-start",
        };

  return (
    <div
      ref={(ref) => { if (ref) connect(drag(ref)); }}
      className={cn("relative", !widthControlled && !heightControlled && "w-full", className)}
      style={computedStyle}
    >
      {children ?? (
        <div className="flex h-full min-h-[60px] items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/30 text-xs text-muted-foreground">
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
