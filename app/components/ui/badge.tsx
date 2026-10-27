import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/utility/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-medium select-none",
  {
    variants: {
      variant: {
        default: "bg-zinc-200/70 text-zinc-600",
        active: "bg-zinc-200 text-zinc-800",
        kbd: "border border-zinc-200 bg-zinc-100 font-mono text-[8px] text-zinc-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
