import { useNode, type UserComponent } from "@craftjs/core";
import { cn } from "../../utils/cn";
import { cva } from "class-variance-authority";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface CraftAlertProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  width?: string;
  height?: string;
  className?: string;
}

export const CraftAlert: UserComponent<CraftAlertProps> = ({
  title = "Alert",
  description = "This is an alert message.",
  variant = "default",
  width = "auto",
  height = "auto",
  className = "",
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      style={{ width: width !== "auto" ? width : undefined, height: height !== "auto" ? height : undefined }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
      {title && <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>}
      {description && <div className="text-sm [&_p]:leading-relaxed">{description}</div>}
    </div>
  );
};

CraftAlert.craft = {
  displayName: "Alert",
  props: {
    title: "Alert",
    description: "This is an alert message.",
    variant: "default",
    width: "auto",
    height: "auto",
    className: "",
  },
  rules: {
    canDrag: () => true,
    canMoveIn: () => false,
  },
};
