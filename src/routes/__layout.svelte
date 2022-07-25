<script>
	import { isLoading } from '$lib/stores/index';
	import '../app.css';
	import BottomMenu from '$lib/components/bottom-menu/index.svelte';
	import Footer from '$lib/components/footer/index.svelte';
	import Loader from '$lib/components/loader/index.svelte';
</script>

<!-- Loading -->
{#if $isLoading}
	<Loader />
{/if}
<!-- Loading -->
<div class="max-w-[475px] w-[100%] mx-auto px-[20px] py-[40px] font-mono relative">
	<slot />
	<Footer />
</div>
<BottomMenu />
