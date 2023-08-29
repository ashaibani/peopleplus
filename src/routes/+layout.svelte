<script lang="ts">
	import '$lib/global.css';
	import { SvelteToast } from '@zerodevx/svelte-toast';
</script>

<svelte:head>
	<title>PeoplePlus Demo</title>
</svelte:head>
<SvelteToast />

<slot />
