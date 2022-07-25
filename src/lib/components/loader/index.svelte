<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div
	transition:fade={{ duration: 100 }}
	class="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/50 flex items-center justify-center z-[999999]"
>
	<div class="w-[40px] h-[40px] rounded-full border-[6px] border-b-black/50 animate-spin" />
</div>
