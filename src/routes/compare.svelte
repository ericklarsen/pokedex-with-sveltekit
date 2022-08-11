<script lang="ts">
	import Header from '$lib/components/header/index.svelte';
	import PokemonSelection from '$lib/components/pokemon-selection/index.svelte';
	import CompareIcon from '$lib/assets/compareIcon.svelte';
	import { currentComparison } from '$lib/stores/index';

	let openSelection: any = {
		show: false,
		current: 'pokemon1'
	};

	const handlOpenSelection = (param1: boolean, param2?: string) => {
		openSelection.show = param1;
		if (param2) {
			openSelection.current = param2;
		}
	};
</script>

<Header title="Compare" />

<div class="w-full h-[150px] flex items-center justify-between">
	<div class="w-[45%]" on:click={() => handlOpenSelection(true, 'pokemon1')}>
		{#if $currentComparison[0].id !== 0}
			<div class="w-full h-full p-2">
				<img
					class="w-full h-full object-contain"
					src={$currentComparison[0].sprites.front_default}
					alt="pokemon"
				/>
				<h5 class="w-full text-center mt-2 capitalize font-semibold">
					{$currentComparison[0]?.name}
				</h5>
			</div>
		{:else}
			<div
				class="w-full p-2 px-4 text-center bg-black/75 border-2 border-black/75 text-white md:hover:bg-white md:hover:text-black cursor-pointer"
			>
				Select Pokemon 1
			</div>
		{/if}
	</div>
	<div class="w-[4%]">
		<svelte:component this={CompareIcon} />
	</div>
	<div class="w-[45%]" on:click={() => handlOpenSelection(true, 'pokemon2')}>
		{#if $currentComparison.length > 1}
			<div class="w-full h-full p-2">
				<img
					class="w-full h-full object-contain"
					src={$currentComparison[1].sprites.front_default}
					alt="pokemon"
				/>
				<h5 class="w-full text-center mt-2 capitalize font-semibold">
					{$currentComparison[1]?.name}
				</h5>
			</div>
		{:else}
			<div
				class="w-full p-2 px-4 text-center bg-black/75 border-2 border-black/75 text-white md:hover:bg-white md:hover:text-black cursor-pointer"
			>
				Select Pokemon 2
			</div>
		{/if}
	</div>
</div>

{#if $currentComparison.length > 1}
	<div class="w-full mb-6 mt-14">
		<h5 class="text-lg font-bold mb-3">Stats :</h5>
		{#each $currentComparison[0].stats as item, idx}
			<div class="w-full flex items-center justify-between mb-4">
				<p class="w-[40%]">{item.stat.name}</p>
				<div class="w-[45%] h-5 bg-gray-200 relative">
					<div
						class="absolute top-0 left-0 h-full z-10  flex items-center w-0 transition-all duration-1000"
						class:bg-green-400={item.base_stat >= 50}
						class:bg-red-400={item.base_stat < 50}
						style={`width: ${item.base_stat < 100 ? item.base_stat : 100}%`}
					>
						<p class="text-[12px] font-mono absolute z-20 right-1 text-white">{item.base_stat}</p>
					</div>
				</div>
				<div class="w-[10%] h-5 relative">
					<p
						class="text-[12px] w-full text-right font-mono absolute z-20 right-1 font-bold "
						class:text-red-500={item.base_stat - $currentComparison[1].stats[idx].base_stat < 0}
						class:text-green-500={item.base_stat - $currentComparison[1].stats[idx].base_stat > 0}
					>
						{item.base_stat - $currentComparison[1].stats[idx].base_stat > 0
							? `+${item.base_stat - $currentComparison[1].stats[idx].base_stat}`
							: item.base_stat - $currentComparison[1].stats[idx].base_stat}
					</p>
				</div>
			</div>
		{/each}
	</div>
{/if}

{#if openSelection.show}
	<PokemonSelection {openSelection} onClose={() => handlOpenSelection(false)} />
{/if}
