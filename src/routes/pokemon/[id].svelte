<script lang="ts" context="module">
	/** @type {import('./__types/[id]').Load} */
	export async function load({ params }: any) {
		const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
		const data = await res.json();

		let abilities = [];
		for (let i = 0; i < data.abilities.length; i++) {
			const res = await fetch(data.abilities[i].ability.url);
			const resData = await res.json();
			abilities.push(resData);
		}

		data.abilities = abilities;

		return {
			props: {
				details: data
			}
		};
	}
</script>

<script lang="ts">
	import { isLoading } from '$lib/stores';
	import { onMount } from 'svelte';
	import Pokeball from '$lib/assets/pokeball.svg';

	export let details: any;

	onMount(() => {
		isLoading.unshow();
	});

	let sprites: string = details.sprites.front_default;

	if (!sprites) {
		sprites = Pokeball;
	} else {
		setInterval(() => {
			if (sprites !== details.sprites.front_default) {
				sprites = details.sprites.front_default;
			} else {
				sprites = details.sprites.back_default;
			}
		}, 1000);
	}
	console.log(details);
</script>

<svelte:head>
	<title>Details - {details.name}</title>
</svelte:head>

<div class="w-full mb-10 flex items-center justify-between">
	<a
		href="/"
		class="w-fit h-[fit-content] p-1 px-4 border-[2px] border-black/50 cursor-pointer hover:bg-black/75 hover:text-white"
	>
		Back
	</a>
	<div class="flex flex-col items-end">
		<h5 class="text-base">Name</h5>
		<h1 class="font-bold text-4xl text-center capitalize">{details.name}</h1>
	</div>
</div>

<div class="max-w-[475px] mx-auto">
	<img class="w-[150px] h-[150px] object-contain mx-auto" src={sprites} alt={details.name} />
	<div class="text-xs mb-8 flex items-center justify-center mt-3">
		<p class="text-center italic opacity-50">Base Experience</p>
		<div class="p-1 px-2 bg-green-500 text-white font-bold ml-2">{details.base_experience}exp</div>
	</div>

	<div class="w-full mb-10">
		<h5 class="text-lg font-bold">Details :</h5>
		<p class="w-fit text-base mt-2">
			Type -
			{#each details.types as item, idx}
				{`${item.type.name}${idx + 1 !== details.types.length ? ', ' : ''}`}
			{/each}
		</p>
		<p class="w-fit text-base mt-2">
			Height - {`${details.height / 10}m`}
		</p>
		<p class="w-fit text-base mt-2">
			Weight - {`${details.weight}kg`}
		</p>
	</div>

	<div class="w-full mb-10">
		<h5 class="text-lg font-bold mb-3">Stats :</h5>
		{#each details.stats as item}
			<div class="w-full flex items-center mb-4">
				<p class="w-[40%]">{item.stat.name}</p>
				<div class="w-[60%] h-5 bg-gray-200 relative">
					<div
						class="absolute top-0 left-0 h-full z-10  flex items-center w-0 transition-all duration-1000"
						class:bg-green-400={item.base_stat >= 50}
						class:bg-red-400={item.base_stat < 50}
						style={`width: ${item.base_stat < 100 ? item.base_stat : 100}%`}
					>
						<p class="text-[12px] font-mono absolute z-20 right-1 text-white">{item.base_stat}</p>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<div class="w-full mb-10">
		<h5 class="text-lg font-bold mb-4">Abilities :</h5>
		<div class="w-full">
			{#each details.abilities as item}
				<div class="w-full p-3 px-5 border-[2px] mb-4 last:mb-0 border-black/50">
					<h6 class=" text-base uppercase font-bold mb-1">{item.name}</h6>
					<p class="text-sm">{item.effect_entries[0].effect}</p>

					<p class="mt-4 text-xs opacity-70 italic font-bold text-red-700">
						Short Effect: <span class="font-mono text-black font-normal"
							>{item.effect_entries[0].short_effect}</span
						>
					</p>
				</div>
			{/each}
		</div>
	</div>
</div>
