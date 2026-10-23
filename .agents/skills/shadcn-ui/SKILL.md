---
name: shadcn-ui
description: >-
  Use this skill when installing, configuring, authoring, or refactoring shadcn/ui components in Next.js and React. Covers component initialization, CLI commands, Radix UI primitive patterns, CVA variant handling, accessibility, and composition best practices.
---

# shadcn/ui Component Skill

This skill guides the implementation, composition, and maintenance of UI components using the **shadcn/ui** design philosophy: accessible Radix primitives, Tailwind styling, Class Variance Authority (CVA), and full codebase ownership.

---

## 1. Core Architecture & Philosophy

1. **Copy-and-Own**: Components live directly in the project codebase (typically `@/components/ui/`), not as opaque npm library dependencies. You have complete freedom to modify their markup and styles.
2. **Headless Primitives**: Complex accessible behaviors (dialogs, dropdowns, accordions, tooltips, popovers) are built on top of accessible primitives (such as Radix UI / `@radix-ui/react-*` or Base UI).
3. **Class Variance Authority (`cva`)**: Variants (size, intent, hierarchy) are declared declaratively with `cva`, making variants strongly typed and easily extendable.
4. **Class Merging (`cn`)**: All components accept a `className` prop and merge it using the `cn()` utility (`clsx` + `tailwind-merge`) so consuming code can cleanly override default styles.

---

## 2. CLI Setup & Adding Components

### Initializing in a Next.js Project

If `components.json` does not already exist:
```bash
npx shadcn@latest init
```

Key configuration points:
- **Style**: `New York` (refined, compact) or `Default`.
- **Base Color**: Zinc / Neutral / Slate (aligned with project design).
- **CSS Variables**: Yes (allows instant theme and dark mode switching).
- **Tailwind v4**: Uses modern CSS variables in `@theme inline` or CSS root.

### Adding Components
Always install components via the official CLI to ensure matching dependencies and utilities are pulled in:
```bash
# Add single component
npx shadcn@latest add button

# Add multiple components
npx shadcn@latest add dialog dropdown-menu tooltip card input
```

If adding custom components manually, follow the exact pattern described below.

---

## 3. Component Authoring Standards

### Standard Component Pattern with `cva` and `cn`

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/app/utility/cn" // or "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { buttonVariants }
```

---

## 4. Next.js App Router & React 19 Rules

1. **Client Boundaries (`"use client"`)**:
   - Any component that relies on browser events, hooks (`useState`, `useEffect`), or Radix portal/dialog primitives **must** have `"use client"` at the top of the file.
   - Server Components can freely import and render Client Components, but cannot pass non-serializable functions as props.
2. **Polymorphism with `asChild` (`Slot`)**:
   - Use the `asChild` pattern from `@radix-ui/react-slot` instead of custom polymorphic `as="a"` props.
   - Example with Next.js Link:
     ```tsx
     <Button asChild>
       <Link href="/dashboard">Go to Dashboard</Link>
     </Button>
     ```
3. **Icons**:
   - Standardize icon size inside buttons/inputs using `[&_svg]:size-4 [&_svg]:shrink-0`.
   - Maintain icon consistency across the app (Phosphor, Lucide, or Radix icons).

---

## 5. Verification Checklist

- [ ] Does the component accept `className` and merge it with `cn()`?
- [ ] Are interactive states covered (`hover:`, `focus-visible:`, `active:`, `disabled:`)?
- [ ] Is keyboard accessibility preserved (Enter / Space / Esc keys for dialogs and menus)?
- [ ] Does it adapt properly to dark mode using semantic tokens (`bg-background`, `text-foreground`, `border-border`)?
- [ ] Is `"use client"` placed when using state or Radix primitives?
