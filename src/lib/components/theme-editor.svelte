<script lang="ts">
	import { getCurrentVariables, mergeVariables } from '$lib/utils/index.js'
	import ThemeGroup from './theme-group.svelte'
	import type { ShadcnVariable } from '$lib/types.js'
	import { onMount } from 'svelte'
	import { BROWSER } from 'esm-env'
	import {
		ArrowLeftRight,
		CopyIcon,
		PaletteIcon,
		Redo2Icon,
		RotateCcwIcon,
		Undo2Icon,
	} from 'lucide-svelte'
	import { PersistedState } from 'runed'
	import { fly, scale } from 'svelte/transition'
	import { StateHistoryDiff } from '$lib/utils/state-history/index.js'

	const variablesStore = new PersistedState<ShadcnVariable[]>('theme-editor-variables', [], {
		syncTabs: true,
		serializer: {
			serialize: JSON.stringify,
			deserialize(value) {
				const defaultValue = getCurrentVariables()
				try {
					return mergeVariables(defaultValue, JSON.parse(value))
				} catch {
					return defaultValue
				}
			},
		},
	})

	const history = new StateHistoryDiff(
		() => JSON.parse(JSON.stringify(variablesStore.current)) as ShadcnVariable[],
		(newSnapshot) => {
			console.log(newSnapshot[0])
			variablesStore.current = newSnapshot
		},
	)

	const visible = new PersistedState('theme-editor-visible', false)
	const side = new PersistedState<'left' | 'right'>('theme-editor-side', 'left')

	const toggleSide = () => {
		side.current = side.current === 'left' ? 'right' : 'left'
	}

	let stylesRef = $state<HTMLStyleElement | null>(null)

	const generateStyles = (variables: ShadcnVariable[], important = true) => {
		const styles = variables
			.map(({ variable, value }) => {
				return `${variable}: ${value}${important ? ' !important' : ''};`
			})
			.join('\n')

		return `:root {\n${styles}\n}`
	}

	const groupOrder = ['unknown', 'number', 'color']
	const groupedVariables = $derived.by(() => {
		const grouped = Object.groupBy(variablesStore.current, (variable) => {
			return variable.type
		})

		return Object.entries(grouped).toSorted(([groupNameA], [groupNameB]) => {
			return groupOrder.indexOf(groupNameA) - groupOrder.indexOf(groupNameB)
		})
	})

	const updateStyles = (variables: ShadcnVariable[]) => {
		if (!stylesRef) return

		stylesRef.innerHTML = generateStyles(variables)
	}

	const copyStyles = () => {
		const styles = generateStyles(variablesStore.current, false)
		console.log(styles)
		navigator.clipboard
			.writeText(styles)
			.then(() => {
				alert('CSS was successfully copied to the clipboard')
				// toast.info('CSS was successfully copied to the clipboard')
			})
			.catch(() => {
				console.group('Styles')
				console.log(styles)
				console.groupEnd()
				alert('Failed to copy CSS to the clipboard. Written in console instead.')
				// toast.error('Failed to copy CSS to the clipboard. Written in console instead.')
			})
	}

	$effect(() => {
		updateStyles(variablesStore.current)
	})

	const shortcutHandler = (event: KeyboardEvent) => {
		if (!event.ctrlKey && !event.metaKey) return
		if (event.code === 'Enter') {
			if (event.shiftKey) {
				toggleSide()
			} else {
				visible.current = !visible.current
			}
		}
	}

	const preventClose = (event: BeforeUnloadEvent) => {
		if (!history.canUndo) return
		// Recommended
		event.preventDefault()

		// Included for legacy support, e.g. Chrome/Edge < 119
		event.returnValue = true
	}

	onMount(() => {
		window.addEventListener('keydown', shortcutHandler)
		window.addEventListener('beforeunload', preventClose)
		stylesRef = document.createElement('style')
		document.head.appendChild(stylesRef)

		updateStyles(variablesStore.current)

		return () => {
			window.removeEventListener('keydown', shortcutHandler)
			window.removeEventListener('beforeunload', preventClose)
			stylesRef?.remove()
		}
	})

	const resetVariables = () => {
		if (!BROWSER) return
		updateStyles([])
		variablesStore.current = getCurrentVariables()
	}
</script>

{#if visible.current}
	<aside
		transition:fly={{ x: 320 * (side.current === 'left' ? -1 : 1) }}
		class="shadcn-theme-editor fixed top-0 z-[1005000] h-full w-80 overflow-auto border-white/10 bg-black/70 pb-4 text-white shadow-md backdrop-blur transition-all {side.current === 'left' ? 'left-0 border-r-2' : 'left-[100vw] -translate-x-full transform border-l-2'}"
	>
		<h1
			class="sticky left-0 top-0 z-50 flex items-center justify-between bg-black/50 px-4 py-2 font-bold"
		>
			<span>Theme Editor</span>
			<button class="ml-2" onclick={() => resetVariables()} title="Reset Styles">
				<RotateCcwIcon class="size-5 text-red-500" />
			</button>
			<span class="flex-1"></span>

			<span class="inline-flex items-center gap-2">
				<button onclick={() => toggleSide()} title="Toggle Sidebar position left-right">
					<ArrowLeftRight class="size-5" />
				</button>
				<button onclick={() => copyStyles()} title="Copy Current Theme">
					<CopyIcon class="size-5" />
				</button>
				<button class="select-none text-2xl" onclick={() => (visible.current = false)}>
					&times;
				</button>
			</span>
		</h1>

		{#each groupedVariables as [groupName], index}
			<ThemeGroup
				{groupName}
				bind:variables={() => groupedVariables[index][1], (v) => (groupedVariables[index][1] = v)}
			/>
		{/each}

		{#if history.canUndo || history.canRedo}
			<div
				transition:scale
				class="pointer-events-none sticky bottom-0 left-0 z-[100500] flex w-full items-center justify-center"
			>
				<div
					class="pointer-events-auto mb-2 flex items-center gap-2 rounded-full bg-indigo-500/50 p-1"
				>
					<button class="history-button" disabled={!history.canUndo} onclick={() => history.undo()}>
						<Undo2Icon class="size-4" />
					</button>
					<button class="history-button" disabled={!history.canRedo} onclick={() => history.redo()}>
						<Redo2Icon class="size-4" />
					</button>
				</div>
			</div>
		{/if}
	</aside>
{/if}

{#if !visible.current}
	<div
		transition:scale
		class="sidebar-toggle pointer-events-none fixed bottom-0 z-[100500] flex items-center justify-center transition-all {side.current === 'left' ? 'left-0' : 'left-[100vw] -translate-x-full transform'}"
	>
		<button
			class="sidebar-toggle-button pointer-events-auto text-white mx-2 mb-2 flex h-auto select-none gap-0 whitespace-nowrap rounded-full bg-indigo-500 p-4"
			onclick={() => (visible.current = true)}
		>
			<PaletteIcon class="!size-6" />
			<span class="max-w-[6.8rem] overflow-hidden transition-all">
				<span class="pl-2">Theme Editor</span>
			</span>
		</button>
	</div>
{/if}

<style lang="scss">
	aside::-webkit-scrollbar {
		display: none;
	}

	.history-button {
		@apply select-none whitespace-nowrap;
		@apply flex h-auto gap-0 rounded-full bg-indigo-500 p-2;

		&:disabled {
			@apply cursor-not-allowed opacity-50;
		}
	}

	.sidebar-toggle {
		:global(.sidebar-toggle-button):not(:hover) :global(span) {
			max-width: 0 !important;
		}
	}

	:global(.theme-entry) {
		@apply flex items-center gap-2 rounded bg-white/5 p-2 text-white/80 hover:bg-white/20;
	}
</style>
