<script lang="ts">
	export let title: any;
</script>

<div class="w-full mb-10">
	<h1 class="font-mono font-bold text-4xl text-center">{title}</h1>
	<slot />
</div>
