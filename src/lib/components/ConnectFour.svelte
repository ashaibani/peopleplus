<script lang="ts">
	import Board from './Board.svelte';

	// gamestate - the state of the current game
	var stateOfGame: string = 'start';

	var gameResult: number = 0;

	function handleWinner(e: { detail: { result: number } }) {
		stateOfGame = 'finished';
		gameResult = e.detail.result;
	}
</script>

<div class="mt-32 justify-center text-center {stateOfGame === 'active_game' ? 'flex' : ''}">
	{#if stateOfGame === 'start'}
		<h1>Connect 4</h1>
		<button
			type="button"
			on:click={() => {
				stateOfGame = 'active_game';
			}}>Click to start</button
		>
	{:else if stateOfGame === 'active_game'}
		<Board on:game-over={handleWinner} />
	{:else if gameResult == -1}
		<h1>Its a draw!</h1>
		<button
			type="button"
			on:click={() => {
				stateOfGame = 'active_game';
			}}>Play again!</button
		>
	{:else}
		<h1>Player {gameResult} wins!</h1>
		<button
			type="button"
			on:click={() => {
				stateOfGame = 'active_game';
			}}>Start over</button
		>
	{/if}
</div>
