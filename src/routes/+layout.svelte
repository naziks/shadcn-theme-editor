<script lang="ts">
    import "$root/src/app.scss";
    import type { Snippet } from "svelte";
    import {ThemeEditor} from "$lib/index.js";

    let { children }: { children?: Snippet } = $props();
</script>

<ThemeEditor />
{@render children?.()}
