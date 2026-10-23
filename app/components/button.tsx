import React from "react";
import Link from "next/link";
import { cn } from "../utility/cn";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "default" | "sm" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  asChild?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border border-orange-800 bg-orange-600 text-zinc-100 shadow-xs hover:bg-orange-700 hover:shadow-sm active:scale-[0.98] text-shadow-2xs",
  secondary:
    "border border-zinc-300 bg-zinc-100 text-zinc-800 shadow-xs hover:bg-zinc-200 hover:shadow-sm active:scale-[0.98] text-shadow-xs",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "px-4 py-1.5 text-sm",
  sm: "px-3 py-1 text-xs",
  lg: "px-5 py-2 text-base",
};

const baseStyles =
  "inline-flex items-center justify-center font-medium rounded-xl cursor-pointer transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

export function buttonVariants({
  variant = "primary",
  size = "default",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
}

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  {
    variant = "primary",
    size = "default",
    href,
    asChild = false,
    className,
    children,
    ...props
  },
  ref,
) {
  const classes = buttonVariants({ variant, size, className });

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{ className?: string }>,
      {
        className: cn(
          classes,
          (children.props as { className?: string }).className,
        ),
        ...props,
      },
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={classes}
        {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
export default Button;
