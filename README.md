# Shadcn Theme Editor (Svelte)

## Description
Shadcn Theme Editor is a simple tool that allows you simply customize theme colors of your Shadcn web application.
It provides a user-friendly interface to modify the theme colors and see the changes in real-time.

## Quick Start
### Install dependencies
```bash
yarn add shadcn-theme-editor -D
```
### Use in project
The following structure is required to be tree-shaken on the build stage and not be included in the production build.
```sveltehtml
<!-- src/routes/+layout.svelte -->

{#if import.meta.env.DEV}
	{#await import('shadcn-theme-editor') then { default: ShadcnThemeEditor }}
		<ShadcnThemeEditor />
	{/await}
{/if}
```

## Usage
![alt text](https://github.com/naziks/shadcn-theme-editor/blob/main/docs/images/preview.png?raw=true)


## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
