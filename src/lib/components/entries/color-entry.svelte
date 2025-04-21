<script lang="ts">
	import type { ShadcnVariable } from '$lib/types.js'
	import ColorInput from '$lib/components/color-input.svelte'
	import convert from 'color-convert'
	import { hslToString, parseHsl } from '$lib/utils/index.js'

	interface Props {
		variable: ShadcnVariable
	}
	const { variable = $bindable() }: Props = $props()

	const title = $derived.by(() => {
		return `${variable.variable}: ${variable.value};`
	})

	const hslToHex = (hlsString: string) => {
		const hsl = parseHsl(hlsString)
		if (!hsl) return
		return '#' + convert.hsl.hex(...hsl)
	}

	let colorValue = $derived.by(() => hslToHex(variable.value))
	const valueChange = (event: Event) => {
		const value = (event.target as HTMLInputElement).value
		const hsl = convert.hex.hsl(value)
		variable.value = hslToString(...hsl)
	}
</script>

<li class="theme-entry" {title}>
	<label class="contents cursor-pointer">
		<ColorInput class="size-5" value={colorValue} oninput={valueChange} />
		{variable.name}
	</label>
</li>
