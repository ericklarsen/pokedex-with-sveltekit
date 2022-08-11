<script lang="ts">
	import PokemonList from '$lib/components/pokemon-list/index.svelte';
	import PokemonPagination from '$lib/components/pokemon-pagination/index.svelte';
	import { currentComparison } from '$lib/stores/index';
	export let onClose: any;
	export let openSelection: any;

	let isLoading: boolean = true;
	let allPokemons: any = {};

	const handlePage = async (param: string) => {
		isLoading = true;
		const res = await fetch(param);
		const data = await res.json();

		let pokemons = [];
		for (let i = 0; i < data.results.length; i++) {
			const res = await fetch(data.results[i].url);
			const details = await res.json();
			pokemons.push({ ...details, url: data.results[i].url });
		}

		data.results = pokemons;
		allPokemons = data;
		isLoading = false;
	};

	const handleScroll = (e: any) => {
		// console.log(e.target.scrollTop);
	};

	const handleClick = (details: any) => {
		if (openSelection.current === 'pokemon1') {
			currentComparison.update((item) => item.map((data, idx) => (idx ? data : details)));
		} else {
			if ($currentComparison.length > 1) {
				currentComparison.update((item) => item.map((data, idx) => (idx !== 1 ? data : details)));
			} else {
				currentComparison.set([...$currentComparison, details]);
			}
		}
		onClose(false);
		console.log($currentComparison);
	};

	(async () => {
		handlePage('https://pokeapi.co/api/v2/pokemon/');
	})();
</script>

<div class="fixed z-[999999] w-full h-full bg-black/25 top-0 left-0 flex items-end">
	<div class="max-w-[475px] w-full h-fit mx-auto bg-white px-5 py-5">
		<div class="flex w-full justify-between items-center mb-5">
			<h5 class="text-xl font-semibold">Pokemon</h5>
			<p class="cursor-pointer md:hover:opacity-75" on:click={onClose}>[close]</p>
		</div>
		<div class="h-[400px] w-full overflow-y-auto" on:scroll={(e) => handleScroll(e)}>
			{#if isLoading}
				<div class="flex items-center justify-center w-full h-full">
					<div class="w-[40px] h-[40px] rounded-full border-[6px] border-b-black/50 animate-spin" />
				</div>
			{:else}
				{#each allPokemons?.results as item}
					<PokemonList
						isActive={$currentComparison.filter((fil) => fil.id === item.id).length ? true : false}
						details={item}
						onClick={() => handleClick(item)}
					/>
				{/each}
			{/if}
		</div>
		<PokemonPagination onPage={handlePage} pokemon={allPokemons} />
	</div>
</div>
