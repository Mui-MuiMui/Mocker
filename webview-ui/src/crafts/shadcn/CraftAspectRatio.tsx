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

  // CSS aspect-ratio は flex の align-items:stretch で上書きされるため
  // calc() で明示的に他方の寸法を計算する。
  // - widthControlled: height = width * (1/ratio)
  // - heightControlled: width = height * ratio
  // - default: aspect-ratio CSS + align-self:flex-start で flex stretch を回避
  const computedStyle: React.CSSProperties = widthControlled
    ? {
        width,
        height: `calc(${width} * ${1 / ratio})`,
        alignSelf: "flex-start",
      }
    : heightControlled
      ? {
          height,
          width: `calc(${height} * ${ratio})`,
          alignSelf: "flex-start",
        }
      : {
          // デフォルト: w-full + aspect-ratio CSS
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
