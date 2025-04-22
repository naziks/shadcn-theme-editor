import type { SvelteComponent } from "svelte";
import Apple from "./apple.svelte";
import Google from "./google.svelte";
import PayPal from "./paypal.svelte";

export type Icon = SvelteComponent;

export const Icons = {
	google: Google,
	apple: Apple,
	paypal: PayPal,
};
