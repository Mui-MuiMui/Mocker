import { useNode, type UserComponent } from "@craftjs/core";
import { cn } from "../../utils/cn";
import { cva } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface CraftBadgeProps {
  text?: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
  tooltipText?: string;
  fontFamily?: string;
  fontWeight?: string;
  fontSize?: string;
  textColor?: string;
  bgColor?: string;
  width?: string;
  height?: string;
  className?: string;
}

export const CraftBadge: UserComponent<CraftBadgeProps> = ({
  text = "Badge",
  variant = "default",
  tooltipText = "",
  fontFamily = "",
  fontWeight = "",
  fontSize = "",
  textColor = "",
  bgColor = "",
  width = "auto",
  height = "auto",
  className = "",
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <span
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      className={cn(badgeVariants({ variant }), fontFamily, fontWeight, fontSize, textColor, bgColor, className)}
      style={{ width: width !== "auto" ? width : undefined, height: height !== "auto" ? height : undefined }}
    >
      {text}
    </span>
  );
};

CraftBadge.craft = {
  displayName: "Badge",
  props: {
    text: "Badge",
    variant: "default",
    tooltipText: "",
    fontFamily: "",
    fontWeight: "",
    fontSize: "",
    textColor: "",
    bgColor: "",
    width: "auto",
    height: "auto",
    className: "",
  },
  rules: {
    canDrag: () => true,
    canMoveIn: () => false,
  },
};
