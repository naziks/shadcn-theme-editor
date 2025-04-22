<script lang="ts">
	import ColorEntry from '$lib/components/theme-editor/entries/color-entry.svelte'
	import NumberEntry from '$lib/components/theme-editor/entries/number-entry.svelte'
	import UnknownEntry from '$lib/components/theme-editor/entries/unknown-entry.svelte'

	import type { ShadcnVariable } from '$lib/types.js'
	import { ChevronRightIcon } from 'lucide-svelte'
	import { slide } from 'svelte/transition'

	interface Props {
		groupName: string
		variables: ShadcnVariable[]
	}

	let { groupName, variables = $bindable() }: Props = $props()

	let visible = $state(true)
	let toggleVisible = () => (visible = !visible)

	const variableBinding = (index: number) => {
		return {
			get current() {
				return variables[index]
			},

			set current(v) {
				variables[index] = v
			},
		}
	}
</script>

<div class="flex flex-col">
	<button
		class="relative mx-4 mb-1 mt-4 flex items-center gap-1 text-xs font-bold text-indigo-400 [&>.icon]:hover:-translate-x-full [&>.icon]:hover:opacity-100"
		onclick={toggleVisible}
	>
		<span
			class="icon absolute left-0 top-0 flex h-full translate-x-[-150%] transform items-center justify-center opacity-0 transition-all"
		>
			<ChevronRightIcon class="size-4 transition-all {visible ? 'rotate-90 transform' : ''}" />
		</span>
		<span>{groupName.toUpperCase()}</span>
		<div class="flex items-center justify-center aspect-square rounded-full text-xs text-white/70 ">({variables.length})</div>
	</button>
	{#if visible}
		<ul class="flex flex-col gap-2 px-4" transition:slide>
			{#each variables as variable, index (variable.name)}
				{#if variable.type === 'color'}
					<ColorEntry bind:variable={() => variables[index], (v) => (variables[index] = v)} />
				{:else if variable.type === 'number'}
					<NumberEntry bind:variable={() => variables[index], (v) => (variables[index] = v)} />
				{:else}
					<UnknownEntry bind:variable={() => variables[index], (v) => (variables[index] = v)} />
				{/if}
			{/each}
		</ul>
	{/if}
</div>
