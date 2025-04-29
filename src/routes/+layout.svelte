<script lang="ts">
    import type { Snippet } from "svelte";
    import ThemeEditor from "$lib/index.js";
    import '../app.scss'

    let { children }: { children?: Snippet } = $props();
</script>

<div class="theme-editor-root">
    <ThemeEditor />
</div>
{@render children?.()}
