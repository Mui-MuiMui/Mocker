import { useNode, type UserComponent } from "@craftjs/core";
import { cn } from "../../utils/cn";
import * as Icons from "lucide-react";

interface CraftIconProps {
  icon: string;
  iconSize: string;
  pointerEvents: boolean;
  width: string;
  height: string;
  className: string;
}

export const CraftIcon: UserComponent<CraftIconProps> = ({
  icon = "Heart",
  iconSize = "6",
  pointerEvents = true,
  width = "auto",
  height = "auto",
  className = "",
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const IconComponent = icon
    ? (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[icon]
    : null;

  return (
    <span
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      className={cn("inline-flex items-center justify-center", className)}
      style={{
        width: width && width !== "auto" ? width : undefined,
        height: height && height !== "auto" ? height : undefined,
        pointerEvents: pointerEvents ? undefined : "none",
      }}
    >
      {IconComponent && <IconComponent className={`h-${iconSize} w-${iconSize}`} />}
    </span>
  );
};

CraftIcon.craft = {
  displayName: "Icon",
  props: {
    icon: "Heart",
    iconSize: "6",
    pointerEvents: true,
    width: "auto",
    height: "auto",
    className: "",
  },
  rules: {
    canDrag: () => true,
    canMoveIn: () => false,
  },
};
