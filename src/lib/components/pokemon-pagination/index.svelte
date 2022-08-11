<script lang="ts">
	import { allPokemons, isLoading } from '$lib/stores';

	export let pokemon: any;
	export let onPage: any;
</script>

<div class="w-full flex items-center justify-between mt-10">
	<div
		class={`w-[48.5%] p-2 bg-black/75 text-white text-center cursor-pointer ${
			!pokemon.previous && 'opacity-50 pointer-events-none'
		}`}
		on:click={() => onPage(pokemon.previous)}
	>
		Previous
	</div>
	<div
		class={`w-[48.5%] p-2 bg-black/75 text-white text-center cursor-pointer ${
			!pokemon.next && 'opacity-50 pointer-events-none'
		}`}
		on:click={() => onPage(pokemon.next)}
	>
		Next
	</div>
</div>
