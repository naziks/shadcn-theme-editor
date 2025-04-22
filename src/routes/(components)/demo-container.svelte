<script lang="ts">
	import { cn } from "$lib/utils/shadcn.js";
	import type {Snippet} from "svelte";

	interface Props {
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	}

	const { class: className, children, ...rest }: Props = $props();
</script>

<div class={cn("flex items-center justify-center [&>div]:w-full", className)} {...rest}>
	{@render children?.()}
</div>
