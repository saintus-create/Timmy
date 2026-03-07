---
description: How to add components from the local fab-ui registry
---

# Workflow: fab-ui Local Registry

We are treating the local clone of `fab-ui` at `/Users/2024-jan/Timmy/fab-repo` as our primary **Registry**, **Installation Source**, and **Source of Truth**.

## 1. Source of Truth (Design System)
- **CSS Engine**: The project's `client/src/index.css` is synchronized with `fab-ui`'s OKLCH-based Tailwind v4 theme.
- **Tokens**: All new components must adhere to the OKLCH color palette (`--background`, `--primary`, etc.) and the vignette/noise utility layers.

## 2. Component Installation (Manual 'npx')
When the user asks to "add" a component from fab-ui:

1. **Locate Metadata**: check `fab-repo/registry.json` for the component's entry.
2. **Resolve Dependencies**:
   - Check `dependencies` (npm packages) and install if missing.
   - Check `registryDependencies` (other fab-ui components) and fetch them recursively.
3. **Copy Source**:
   - Source: `/Users/2024-jan/Timmy/fab-repo/registry/default/ui/[name].tsx`
   - Destination: `/Users/2024-jan/Timmy/client/src/components/ui/[name].tsx`
4. **Adjust Imports**:
   - Ensure imports like `@/lib/utils` or `@/components/ui/...` match the local project structure.

## 3. Usage
Simply tell me:
> "Add the [name] component from our fab source."

I will then perform the file-based "installation" following the steps above.
