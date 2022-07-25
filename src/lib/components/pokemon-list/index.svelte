<script lang="ts">
	import { goto } from '$app/navigation';
	import { isLoading } from '$lib/stores';
	import Pokeball from '$lib/assets/pokeball.svg';

	export let details: any;
	let sprites: any = details?.sprites.front_default;

	if (!details?.sprites.front_default) {
		sprites = Pokeball;
	}

	const handleClick = async (param: any) => {
		isLoading.show();
		goto(`/pokemon/${param}`);
	};
</script>

<div
	class="p-2 border mb-2 hover:bg-black/10  cursor-pointer flex items-center"
	on:click={() => handleClick(details.id)}
>
	<img src={sprites} alt={details?.name} class="w-[54px] h-[54px] object-contain mr-3" />
	<p class="capitalize">{details?.name}</p>
</div>
