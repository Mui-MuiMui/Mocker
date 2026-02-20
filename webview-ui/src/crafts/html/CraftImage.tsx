import { useNode, type UserComponent } from "@craftjs/core";
import { Image } from "lucide-react";
import { cn } from "../../utils/cn";

interface CraftImageProps {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  className?: string;
}

export const CraftImage: UserComponent<CraftImageProps> = ({
  src = "",
  alt = "",
  width = "300px",
  height = "200px",
  objectFit = "cover",
  className = "",
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const style: React.CSSProperties = {
    width: width || undefined,
    height: height || undefined,
  };

  if (!src) {
    return (
      <div
        ref={(ref) => {
          if (ref) connect(drag(ref));
        }}
        className={cn(
          "flex flex-col items-center justify-center gap-2 bg-gray-200 text-gray-400",
          className,
        )}
        style={style}
      >
        <Image size={32} />
        <span className="text-xs">画像URLを設定</span>
      </div>
    );
  }

  return (
    <img
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      src={src}
      alt={alt}
      className={cn("max-w-full", className)}
      style={{ ...style, objectFit }}
    />
  );
};

CraftImage.craft = {
  displayName: "Image",
  props: {
    src: "",
    alt: "",
    width: "300px",
    height: "200px",
    objectFit: "cover",
    className: "",
  },
  rules: {
    canDrag: () => true,
    canMoveIn: () => false,
  },
};
