<script lang="ts" context="module">
	export async function load() {
		const res = await fetch('https://pokeapi.co/api/v2/pokemon/');
		const data = await res.json();

		let pokemons = [];
		for (let i = 0; i < data.results.length; i++) {
			const res = await fetch(data.results[i].url);
			const details = await res.json();
			pokemons.push({ ...details, url: data.results[i].url });
		}

		data.results = pokemons;
		return {
			props: {
				pokemon: data
			}
		};
	}
</script>

<script lang="ts">
	import PokemonTypes from '$lib/components/pokemon-types/index.svelte';
	import PokemonList from '$lib/components/pokemon-list/index.svelte';
	import PokemonPagination from '$lib/components/pokemon-pagination/index.svelte';
	import MenuIcon from '$lib/assets/menu-icon.svelte';
	import { isOpenTypes, isLoading, allPokemons } from '$lib/stores/index';
	import { onMount } from 'svelte';

	interface results {
		id: number;
		name: string;
		url: string;
		sprites: {
			front_default: string;
		};
	}
	interface Pokemon {
		count: number;
		next: string;
		previous: string;
		results: results[];
	}

	export let pokemon: Pokemon;
	let timer: any;
	let searchResult: any = {};
	let isMount: boolean = false;

	onMount(() => {
		isMount = true;
	});

	const debounce = (e: any) => {
		clearTimeout(timer);
		timer = setTimeout(async () => {
			if (!e.target.value) {
				searchResult = {};
				return;
			}
			isLoading.show();
			try {
				const res = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${e.target.value.toLowerCase()}`
				);
				const data = await res.json();
				searchResult = data;
			} catch (e) {
				searchResult = {};
			}
			isLoading.unshow();
		}, 500);
	};

	$: {
		if (isMount) {
			if ($isOpenTypes) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = '';
			}
		}
	}
</script>

<svelte:head>
	<title>Home - Pokedex</title>
</svelte:head>

{#if $isOpenTypes}
	<PokemonTypes />
{/if}

<div class="w-5 h-5 absolute right-5 top-12 cursor-pointer" on:click={() => isOpenTypes.set(true)}>
	<svelte:component this={MenuIcon} />
</div>

<div class="w-full mb-10">
	<h1 class="font-mono font-bold text-4xl text-center">Pokedex</h1>
	<input
		type="text"
		class="border-b p-2 px-4 w-full mt-12 focus:outline-1"
		placeholder="Search by name..."
		on:input={(e) => debounce(e)}
	/>
</div>

{#if searchResult?.name}
	<PokemonList details={searchResult} />
{:else if $allPokemons.results.length}
	{#each $allPokemons.results as item}
		<PokemonList details={item} />
	{/each}
	<PokemonPagination pokemon={$allPokemons} />
{:else}
	{#each pokemon?.results as item}
		<PokemonList details={item} />
	{/each}
	<PokemonPagination {pokemon} />
{/if}
