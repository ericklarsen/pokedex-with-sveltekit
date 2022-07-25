<script lang="ts" context="module">
	import type { LoadOutput } from '@sveltejs/kit';

	/** @type {import('@sveltejs/kit').Load} */
	export function load({ error, status }: LoadOutput) {
		return {
			props: {
				title: `${status}`
			}
		};
	}
</script>

<script lang="ts">
	export let title: string;
</script>

<h1 style="font-size: 40px; margin: 0 auto; width: fit-content;">{title}</h1>
