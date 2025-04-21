<script lang="ts">
	import type { ShadcnVariable } from '$lib/types.js'
	import { CircleHelpIcon } from 'lucide-svelte'

	interface Props {
		variable: ShadcnVariable
	}
	const { variable = $bindable() }: Props = $props()

	const title = $derived.by(() => {
		return `${variable.variable}: ${variable.value};`
	})
</script>

<li class="theme-entry flex-col items-normal flex-wrap" {title}>
	<div class="flex w-full items-center gap-1">
		<CircleHelpIcon class="size-5" />
		<span>{variable.name}</span>
	</div>
	<span class="flex w-full flex-1 overflow-hidden rounded border border-white/20 bg-white/5 min-w-1/2	">
		<input
			type="text"
			bind:value={variable.value}
			class="w-full bg-transparent text-center text-white/90 outline-none"
		/>
	</span>
</li>
