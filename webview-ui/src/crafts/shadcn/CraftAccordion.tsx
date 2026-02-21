import { useNode, type UserComponent } from "@craftjs/core";
import { cn } from "../../utils/cn";

interface CraftAccordionProps {
  items?: string;
  type?: "single" | "multiple";
  width?: string;
  height?: string;
  className?: string;
}

export const CraftAccordion: UserComponent<CraftAccordionProps> = ({
  items = "Item 1,Item 2,Item 3",
  type = "single",
  width = "auto",
  height = "auto",
  className = "",
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const itemList = items.split(",").map((s) => s.trim());

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      className={cn("w-full", className)}
      style={{ width: width !== "auto" ? width : undefined, height: height !== "auto" ? height : undefined }}
    >
      {itemList.map((item, i) => (
        <div key={i} className="border-b">
          <button className="flex w-full items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
            {item}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"><path d="m6 9 6 6 6-6"/></svg>
          </button>
        </div>
      ))}
    </div>
  );
};

CraftAccordion.craft = {
  displayName: "Accordion",
  props: {
    items: "Item 1,Item 2,Item 3",
    type: "single",
    width: "auto",
    height: "auto",
    className: "",
  },
  rules: {
    canDrag: () => true,
    canMoveIn: () => false,
  },
};
