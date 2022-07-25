<script lang="ts">
	import { isOpenTypes, isLoading, allPokemons, currentTypes } from '$lib/stores/index';
	import { fly } from 'svelte/transition';
	let list: any = {};

	(async () => {
		isLoading.show();
		const res = await fetch('https://pokeapi.co/api/v2/type/');
		list = await res.json();
		isLoading.unshow();
	})();

	const handleClick = async (param: string) => {
		currentTypes.set(param);
		isLoading.show();
		isOpenTypes.update(() => false);
		const res = await fetch(param);
		const data = await res.json();

		let results: any = [];
		for (let i = 0; i < data.pokemon.length; i++) {
			const res = await fetch(data.pokemon[i].pokemon.url);
			const result = await res.json();
			results.push({ url: data.pokemon[i].pokemon.url, ...result });
		}

		allPokemons.set({ results: results });
		isLoading.unshow();
	};
</script>

<div class="fixed w-full h-full top-0 left-0 bg-black/50 z-[99999]">
	<div class="max-w-[475px] w-full mx-auto bg-white border-2 px-6 py-6" in:fly={{ y: -600 }}>
		<div class="flex items-center justify-between w-full">
			<h1 class="text-lg font-bold">Types</h1>
			<p class="cursor-pointer hover:opacity-75" on:click={() => isOpenTypes.update(() => false)}>
				[close]
			</p>
		</div>

		<div class="w-full flex flex-wrap mt-5 ">
			{#if !$isLoading}
				{#each list?.results as item}
					<div
						on:click={() => handleClick(item.url)}
						class={`p-2 px-5 border-2 mr-2 mb-4 hover:bg-black/75 hover:text-white cursor-pointer ${
							item.url === $currentTypes && 'bg-black/75 text-white'
						}`}
					>
						{item.name}
					</div>
				{/each}
			{:else}
				<div class="h-[300px]">
					<p>Loading...</p>
				</div>
			{/if}
		</div>
	</div>
</div>
