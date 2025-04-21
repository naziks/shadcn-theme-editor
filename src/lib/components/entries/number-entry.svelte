<script lang="ts">
	import type { ShadcnVariable } from '$lib/types.js'
	import { numberRegexp } from '$lib/utils/index.js'
	import { FileDigitIcon } from 'lucide-svelte'

	interface Props {
		variable: ShadcnVariable
	}
	const { variable = $bindable() }: Props = $props()

	const title = $derived.by(() => {
		return `${variable.variable}: ${variable.value};`
	})

	let matchedNumber = $derived.by(() => numberRegexp.exec(variable.value))
	let numberValue = $derived.by(() => matchedNumber?.groups?.value)
	let numberUnit = $derived.by(() => matchedNumber?.groups?.unit)

	const valueChange = (event: Event) => {
		let value = parseFloat((event.target as HTMLInputElement).value);
		if (isNaN(value)) {
			variable.value = `${numberUnit}`;
		} else {
			variable.value = `${value ?? ''}${numberUnit}`
		}
	}

	const unitChange = (event: Event) => {
		const unit = (event.target as HTMLSelectElement).value
		variable.value = `${numberValue}${unit}`
	}

	const units = ['rem', 'em', 'px', 'vw', 'wh'] as const
</script>

<li class="theme-entry" {title}>
	<FileDigitIcon class="aspect-square size-5 p-0" />
	{variable.name}
	<span class="inline-flex flex-1 overflow-hidden rounded bg-white/5">
		<input
			step="0.001"
			type="number"
			class="w-full bg-transparent text-right text-white/90 outline-none"
			value={numberValue}
			oninput={valueChange}
		/>
		<select
			value={numberUnit}
			onchange={unitChange}
			class="w-auto bg-transparent text-white/90 outline-none"
		>
			{#each units as unit}
				<option value={unit}>{unit}</option>
			{/each}
		</select>
	</span>
</li>
