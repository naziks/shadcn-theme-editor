<div align="center">

# Shadcn Theme Editor (Svelte)

![Svelte](https://img.shields.io/badge/Svelte-4A4A55.svg?style&logo=Svelte&logoColor=orange)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style&logo=TypeScript&logoColor=white)  
![Last Commit](https://img.shields.io/github/last-commit/naziks/shadcn-theme-editor-svelte)
![Top Language](https://img.shields.io/github/languages/top/naziks/shadcn-theme-editor-svelte)
![Minified Size](https://badgen.net/bundlephobia/min/shadcn-theme-editor@latest)  
[![NPM Version](https://img.shields.io/npm/v/shadcn-theme-editor-svelte?logo=npm&logoColor=red)](https://www.npmjs.com/package/shadcn-theme-editor-svelte)
[![GitHub Repo](https://img.shields.io/badge/shadcn_theme_editor-161b22?logo=github)](https://github.com/naziks/shadcn-theme-editor-svelte)

</div>

---

> Inspired by [Shadcn Theme Editor](https://github.com/programming-with-ia/shadcn-theme-editor) by [programming-with-ia](https://github.com/programming-with-ia)

## ✨ Description

**Shadcn Theme Editor (Svelte)** is a simple tool that lets you visually customize theme colors in your Shadcn-based web application (or any app that uses CSS variables).  
It provides an intuitive interface to tweak colors and instantly preview changes.

## ⚡ Features

- 🧩 Plug-and-play integration with SvelteKit
- 🎨 Real-time editing of CSS variable-based themes
- 🎛️ Support for HSL and size-based variables
- ⌨️ Keyboard shortcuts for quick toggling
- 🧠 Useful even outside Shadcn projects

## 🚀 Quick Start

### 1. Install (as a dev dependency)

```bash
yarn add -D shadcn-theme-editor-svelte
```
or
```bash
yarn add -D shadcn-theme-editor-svelte
```

### 2. Add to your SvelteKit app

```sveltehtml
<!-- src/routes/+layout.svelte -->

{#if import.meta.env.DEV}
{#await import('shadcn-theme-editor-svelte') then { default: ShadcnThemeEditor }}
<ShadcnThemeEditor />
{/await}
{/if}
```

> ☝️ This ensures the editor is only loaded during development.

## 🧠 Usage

### Shortcuts

- `Ctrl / Command + Enter` — Toggle editor visibility
- `Ctrl / Command + Shift + Enter` — Toggle editor position (Left / Right)

### Preview

![Preview](https://github.com/naziks/shadcn-theme-editor-svelte/blob/main/docs/images/preview.png?raw=true)

## ⚙️ How It Works

Instead of pulling values from `tailwind.config.js` or CSS files, this tool directly reads styles from the `:root` or `html` element.  
That means it can be used in **any project** that relies on CSS variables — not just Shadcn-based apps.

## 🧩 Supported Values

Currently supported input formats for variables:

- ✅ **HSL** values (e.g., `0 0% 100%`)
- ✅ **Sizes**: `px`, `rem`, `em`, `vh`, `vw` (e.g., `10px`)

All other variable types can still be edited manually via text input.

## 📦 Package Info

- 📁 [Source code](https://github.com/naziks/shadcn-theme-editor-svelte)
- 📄 [NPM Package](https://www.npmjs.com/package/shadcn-theme-editor-svelte)

## 🙌 Contributing

Contributions, feedback, and issues are welcome!  
Feel free to open an [issue](https://github.com/naziks/shadcn-theme-editor-svelte/issues) or submit a [pull request](https://github.com/naziks/shadcn-theme-editor-svelte/pulls).

## 📄 License

Licensed under the [MIT License](./LICENSE).
