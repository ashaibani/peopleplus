<script lang="ts">
	export let value = -1;

	const colours = ['white', 'yellow', 'red'];
	$: colour = colours[value] ?? colours[0];
</script>

<div class="connect-four-piece ml-4" style="background-color: {colour};" />
