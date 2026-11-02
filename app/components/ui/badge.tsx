import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/utility/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[9px] font-medium select-none transition-colors",
  {
    variants: {
      variant: {
        default: "bg-zinc-100 text-zinc-700 border border-zinc-200/60",
        secondary: "bg-zinc-100/80 text-zinc-600",
        outline: "border border-zinc-200 text-zinc-600 bg-transparent",
        destructive: "bg-red-50 text-red-700 border border-red-200/60",
        warning: "bg-amber-50 text-amber-700 border border-amber-200/60",
        success: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
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
