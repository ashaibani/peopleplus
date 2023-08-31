<script lang="ts">
	export let value = -1;

	const colours = ['white', 'yellow', 'red'];

	// set current colour to whatever the value of the piece is - we default to white if no value can be found.
	$: colour = colours[value] ?? colours[0];
</script>

<div class="connect-four-piece ml-4" style="background-color: {colour};" />
