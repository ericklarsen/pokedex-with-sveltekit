<script context="module">
	// @ts-ignore
	export async function load({ params, fetch, session, stuff }) {
		console.log(params);
		// const ref = url.searchParams.get('ref');

		// return {
		// 	props: {
		// 		ref
		// 	}
		// };
	}
</script>

<script>
	import { isLoading } from '$lib/stores/index';
	import '../app.css';
	import BottomMenu from '$lib/components/bottom-menu/index.svelte';
	import Footer from '$lib/components/footer/index.svelte';
	import Loader from '$lib/components/loader/index.svelte';
	import { page } from '$app/stores';
	// export let ref;

	const pathname = $page.url.pathname;
	$: console.log(pathname);
</script>

<!-- Loading -->
{#if $isLoading}
	<Loader />
{/if}
<!-- Loading -->
<div
	class={`max-w-[475px] w-[100%] min-h-[100vh] mx-auto ${
		pathname !== '/battle' && 'pb-[200px] px-[20px] py-[40px]'
	} font-mono relative`}
>
	<slot />
	{#if pathname !== '/battle'}
		<Footer />
	{/if}
</div>
<BottomMenu />
