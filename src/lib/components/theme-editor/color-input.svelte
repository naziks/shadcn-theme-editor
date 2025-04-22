<script lang="ts">
    import type { HTMLInputAttributes } from 'svelte/elements'

    interface Props extends Omit<HTMLInputAttributes, 'type'> {}

    let {
        value = $bindable(),
        class: className,
        ...restProps
    }: Props = $props()
</script>

<div
    class="flex size-5 aspect-square rounded-md border border-input bg-background p-0 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm gap-3 {className ?? ''}"
    style={`background-color: ${value};`}
>
    <input
            {...restProps}
            bind:value
            type="color"
            class="h-full w-full border-none bg-transparent opacity-0 focus:outline-none"
    />
</div>
