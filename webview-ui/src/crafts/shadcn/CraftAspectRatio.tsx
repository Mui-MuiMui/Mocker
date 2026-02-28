import { useNode, type UserComponent } from "@craftjs/core";
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
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      className={cn("relative w-full", className)}
      style={{
        width: width !== "auto" ? width : undefined,
        aspectRatio: height === "auto" ? ratio : undefined,
        height: height !== "auto" ? height : undefined,
      }}
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
