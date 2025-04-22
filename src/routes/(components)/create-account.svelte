<script lang="ts">
	import { Button } from "$ui/button/index.js";
	import * as Card from "$ui/card/index.js";
	import { Label } from "$ui/label/index.js";
	import { Input } from "$ui/input/index.js";
	import { GithubIcon ,SlackIcon } from "lucide-svelte";
</script>

<Card.Root>
	<Card.Header class="space-y-1">
		<Card.Title class="text-2xl">Create an account</Card.Title>
		<Card.Description>Enter your email below to create your account</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-4">
		<div class="grid grid-cols-2 gap-6">
			<Button variant="outline">
				<GithubIcon class="mr-2 h-4 w-4" />
				GitHub
			</Button>
			<Button variant="outline">
				<SlackIcon class="mr-2 h-4 w-4" />
				Slack
			</Button>
		</div>
		<div class="relative">
			<div class="absolute inset-0 flex items-center">
				<span class="w-full border-t"></span>
			</div>
			<div class="relative flex justify-center text-xs uppercase">
				<span class="bg-card text-muted-foreground px-2"> Or continue with </span>
			</div>
		</div>
		<div class="grid gap-2">
			<Label for="email">Email</Label>
			<Input id="email" type="email" placeholder="m@example.com" />
		</div>
		<div class="grid gap-2">
			<Label for="password">Password</Label>
			<Input id="password" type="password" />
		</div>
	</Card.Content>
	<Card.Footer>
		<Button class="w-full">Create account</Button>
	</Card.Footer>
</Card.Root>
