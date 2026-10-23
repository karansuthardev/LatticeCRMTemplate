---
name: tailwind-standards
description: >-
  Use this skill when writing, refactoring, or reviewing Tailwind CSS styles, layout structures, and design tokens (especially for Tailwind CSS v4 and modern CSS conventions). Enforces design consistency, semantic tokens, responsive mobile-first layouts, and accessible interaction states.
---

# Tailwind CSS Standards & UI/UX Guidelines

This skill defines styling rules, layout architecture, and best practices for building responsive, maintainable, and visually coherent user interfaces using **Tailwind CSS** (with modern support for Tailwind CSS v4).

---

## 1. Tailwind v4 & Design Token Architecture

### CSS-First Configuration
In Tailwind v4, styles are configured directly in CSS files (such as `globals.css`) using standard CSS variables and the `@theme` directive, rather than a legacy `tailwind.config.js`:

```css
@import "tailwindcss";

:root {
  --background: var(--color-zinc-100);
  --foreground: var(--color-zinc-800);
  --card: #ffffff;
  --card-foreground: var(--color-zinc-800);
  --primary: var(--color-zinc-900);
  --primary-foreground: #ffffff;
  --muted: var(--color-zinc-200);
  --muted-foreground: var(--color-zinc-500);
  --border: var(--color-zinc-200);
  --radius: 0.5rem;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-border: var(--border);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
}
```

### Rule: Prefer Semantic Tokens Over Raw Palette Utilities
- **Do**: `bg-background text-foreground border-border text-muted-foreground`
- **Avoid**: `bg-zinc-100 text-zinc-800 border-zinc-200 text-zinc-500` throughout components, which breaks dark mode theming and global brand adjustments.

---

## 2. Layout & Responsive Principles

### 1. Mobile-First Always
Start designing for 360px–375px mobile viewports, then progressively enhance layout at larger breakpoints:
* Base (default): Mobile phone portrait
* `sm:`: 640px (large phone / small tablet)
* `md:`: 768px (tablet portrait)
* `lg:`: 1024px (laptop / tablet landscape)
* `xl:`: 1280px (standard desktop)
* `2xl:`: 1536px (wide screens)

```tsx
// Grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {items.map(item => <Card key={item.id} />)}
</div>
```

### 2. Container Consistency
Maintain uniform max-width and horizontal gutters across pages:
```tsx
<main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
  {children}
</main>
```

### 3. Spacing Scale System
Use standard spacing multipliers:
- Component inner padding: `p-3`, `p-4`, or `p-6`
- Card and section gaps: `gap-4`, `gap-6`, `gap-8`
- Major section vertical rhythms: `py-12`, `py-16`, `py-24`

---

## 3. Dynamic Classes & Class Safety

### The Golden Rule: Full Class Names
Tailwind extracts classes by scanning source files for complete strings. **Never construct classes dynamically using string interpolation.**

```tsx
// ❌ BROKEN: Tailwind will purge these classes
const color = "red";
<div className={`text-${color}-500 bg-${color}-50`} />

// ✅ CORRECT: Static class maps or record lookups
const variantStyles: Record<string, string> = {
  danger: "text-red-500 bg-red-50 dark:bg-red-950/30",
  success: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
  info: "text-blue-500 bg-blue-50 dark:bg-blue-950/30",
};
<div className={variantStyles[variant]} />
```

---

## 4. Interactive States & Accessibility (a11y)

### 1. Focus Visible
Never hide focus outlines without replacing them with accessible indicators:
```tsx
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
```

### 2. Hover and Transitions
Keep transitions subtle and snappy. Use `transition-colors duration-150 ease-out`:
```tsx
className="transition-colors hover:bg-muted active:scale-[0.98]"
```

### 3. Disabled States
Ensure disabled elements visually communicate inactive state and disable pointer interactions:
```tsx
className="disabled:pointer-events-none disabled:opacity-50"
```

---

## 5. UI/UX Polish Guidelines

1. **Skeleton Loaders over Empty Spinners**: Use `animate-pulse rounded bg-muted` to preserve layout geometry during loading and avoid Cumulative Layout Shift (CLS).
2. **Typography Hierarchy**:
   - Heading 1: `text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl`
   - Heading 2: `text-2xl font-semibold tracking-tight sm:text-3xl`
   - Body: `text-base text-muted-foreground leading-relaxed`
   - Micro-copy / Labels: `text-xs font-medium uppercase tracking-wider text-muted-foreground`
3. **Class Ordering**: Maintain consistent class order automatically with `prettier-plugin-tailwindcss`.
