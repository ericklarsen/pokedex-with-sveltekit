<script lang="ts">
	import { allPokemons, isLoading } from '$lib/stores';

	export let pokemon: any;

	const handlePage = async (param: string) => {
		isLoading.show();
		const res = await fetch(param);
		const data = await res.json();

		let pokemons = [];
		for (let i = 0; i < data.results.length; i++) {
			const res = await fetch(data.results[i].url);
			const details = await res.json();
			pokemons.push({ ...details, url: data.results[i].url });
		}

		data.results = pokemons;
		allPokemons.set(data);
		isLoading.unshow();
		window.scrollTo(0, 180);
	};
</script>

<div class="w-full flex items-center justify-between mt-10">
	<div
		class={`w-[48.5%] p-2 bg-black/75 text-white text-center cursor-pointer ${
			!pokemon.previous && 'opacity-50 pointer-events-none'
		}`}
		on:click={() => handlePage(pokemon.previous)}
	>
		Previous
	</div>
	<div
		class={`w-[48.5%] p-2 bg-black/75 text-white text-center cursor-pointer ${
			!pokemon.next && 'opacity-50 pointer-events-none'
		}`}
		on:click={() => handlePage(pokemon.next)}
	>
		Next
	</div>
</div>
