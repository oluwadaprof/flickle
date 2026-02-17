import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";



const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-mono uppercase tracking-wider ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 shadow-[4px_4px_0_0_hsl(var(--primary)/0.3)] hover:shadow-[2px_2px_0_0_hsl(var(--primary)/0.3)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]",
        destructive: "bg-destructive text-destructive-foreground border-2 border-destructive hover:bg-destructive/90 shadow-[4px_4px_0_0_hsl(var(--destructive)/0.3)]",
        outline: "border-2 border-border bg-transparent hover:bg-secondary hover:text-foreground hover:border-primary/50",
        secondary: "bg-secondary text-secondary-foreground border-2 border-border hover:bg-secondary/80 hover:border-primary/50",
        ghost: "text-foreground hover:bg-secondary hover:text-foreground border-2 border-transparent",
        link: "text-primary underline-offset-4 hover:underline border-0",
        game: "bg-secondary text-foreground border-2 border-border hover:bg-muted hover:border-primary/50",
        tile: "bg-muted border-2 border-border text-foreground hover:border-primary/50 font-bold",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 px-8",
        icon: "h-9 w-9",
        tile: "h-12 w-12 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
