<script>
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	const menu = [
		{
			id: 'home',
			url: '/'
		},
		{
			id: 'compare',
			url: '/compare'
		},
		{
			id: 'battle',
			url: '/battle'
		}
	];

	console.log($page.url.pathname);
</script>

<div class="w-full h-full fixed z-[99] top-0 left-0 flex items-end pointer-events-none">
	<div
		class="max-w-[475px] w-full mx-auto pointer-events-auto px-2 py-4 flex items-center bg-white border-2 border-b-0"
	>
		{#each menu as item}
			<a
				href={item.url}
				class="flex flex-col items-center justify-center font-mono flex-1 text-center font-bold transition-all hover:text-red-800"
			>
				<p class="capitalize">{item.id}</p>
				{#if $page.url.pathname === item.url}
					<div class="w-2 h-2 bg-green-500 mt-1 rounded-[100%]" />
				{/if}
			</a>
		{/each}
	</div>
</div>
