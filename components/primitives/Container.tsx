import { cn } from "@/lib/cn";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "header" | "footer" | "article" | "main" | "aside";
};

export function Container({ as: Tag = "div", className, ...rest }: ContainerProps) {
  return <Tag className={cn("wrap", className)} {...rest} />;
}
