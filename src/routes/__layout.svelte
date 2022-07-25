<script>
	import { isLoading } from '$lib/stores/index';
	import { fade } from 'svelte/transition';
	import '../app.css';
	import BottomMenu from '$lib/components/bottom-menu/index.svelte';
	import Footer from '$lib/components/footer/index.svelte';
</script>

<!-- Loading -->
{#if $isLoading}
	<div
		transition:fade={{ duration: 100 }}
		class="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/50 flex items-center justify-center z-[999999]"
	>
		<div class="w-[40px] h-[40px] rounded-full border-[6px] border-b-black/50 animate-spin" />
	</div>
{/if}
<!-- Loading -->
<div class="max-w-[475px] w-[100%] mx-auto px-[20px] py-[40px] font-mono relative">
	<slot />
	<Footer />
</div>
<BottomMenu />
