import { useEffect } from "react";
import { useNode, useEditor, type UserComponent } from "@craftjs/core";
import { cn } from "../../utils/cn";

interface CraftAspectRatioProps {
  ratio?: number;
  width?: string;
  height?: string;
  /** RenderNode がドラッグ中に比率を維持するために参照。PropEditor では非表示。 */
  keepAspectRatio?: boolean;
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

  // flex コンテナの align-items:stretch が CSS aspect-ratio を上書きするため、
  // 寸法が明示されている場合は calc() で相手軸を明示的に計算する。
  // keepAspectRatio:true により RenderNode がドラッグ中に比率を維持する。
  //
  // - widthControlled: width 明示 → height を calc で計算
  // - heightControlled: height 明示 → width を calc で計算
  // - default: w-full + aspect-ratio（寸法不定のため CSS 任せ）
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
          aspectRatio: ratio,
          alignSelf: "flex-start",
        };

  return (
    <div
      ref={(ref) => { if (ref) connect(drag(ref)); }}
      className={cn("relative overflow-hidden", !widthControlled && !heightControlled && "w-full", className)}
      style={computedStyle}
    >
      {/* 選択タブ: 子要素がフルサイズでも AspectRatio を選択可能にする。
          top-0 のオーバーレイ配置のため比率計算には影響しない。 */}
      <div className="absolute left-0 top-0 z-10 flex h-5 cursor-default select-none items-center rounded-br-sm bg-background/80 px-1.5 text-[10px] text-muted-foreground whitespace-nowrap">
        AspectRatio
      </div>
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
    keepAspectRatio: true,
    className: "",
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => true,
    canMoveOut: () => true,
  },
};
