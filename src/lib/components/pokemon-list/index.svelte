<script lang="ts">
	import { goto } from '$app/navigation';
	import { isLoading } from '$lib/stores';
	import Pokeball from '$lib/assets/pokeball.svg';

	export let details: any;
	export let onClick: any;
	export let isActive: boolean = false;

	let sprites: any = Pokeball;

	if (!details?.sprites?.front_default) {
		sprites = Pokeball;
	} else {
		sprites = details?.sprites?.front_default;
	}
</script>

<div
	class={`p-2 border mb-2 hover:bg-black/10  cursor-pointer flex items-center ${
		isActive && 'bg-black/10 pointer-events-none'
	}`}
	class:pointer-events-none={!details?.sprites?.front_default}
	on:click={onClick}
>
	<img src={sprites} alt={details?.name} class="w-[54px] h-[54px] object-contain mr-3" />
	<p class="capitalize">{details?.name}</p>
</div>
