<script lang="ts">
	import { onMount } from 'svelte';
	import Piece from './Piece.svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { createEventDispatcher } from 'svelte';
	import { checkBoardHasWinner, isBoardEmpty, setupBoard } from '$lib/board';

	// dispatch - event dispatch
	const dispatch = createEventDispatcher();

	// variables indicating current board state
	var currentColumn: number = 0;
	var currentPlayer: number = 1;
	var connectFourBoard: number[][] = [];
	var boardElement: HTMLDivElement;

	// constants used to init board
	const BOARD_WIDTH: number = 7;
	const BOARD_HEIGHT: number = 6;
	const PIECE_SIZE: number = 32;
	const PIECE_MARGIN: number = 25;

	// indicatorOffeset - tweened store containing our current left hand side offset for our piece indicator
	let indicatorOffeset = tweened(0, {
		easing: cubicOut
	});

	onMount(() => {
		// build connect four board to desired size
		connectFourBoard = setupBoard(BOARD_WIDTH, BOARD_HEIGHT);

		// make sure player 1 starts
		currentPlayer = 1;
	});

	function handleMouse(e: MouseEvent) {
		// get the x position of the connect four board's bounding box
		const boardX = boardElement.getBoundingClientRect().x;
		// find the difference between the mouse and board's x start position
		const deltaX = e.clientX - boardX;
		// get the current column we're hovering over by dividing the difference in the x position of the mouse with the size of each connect four column
		currentColumn = Math.min(
			Math.max(Math.floor(deltaX / (PIECE_SIZE + PIECE_MARGIN)), 0),
			BOARD_WIDTH - 1
		);
		// set our indicator piece left hand side offset to our current column x size of each connect four column
		indicatorOffeset.set(currentColumn * (PIECE_SIZE + PIECE_MARGIN));
	}

	function handlePlay(column: number) {
		// place piece down by check column from top to bottom and placing it in first empty slot (value == 0)
		var placed = false;
		// iterate from the bottom row up  and check if we can find any empty values in the current column
		for (let index = connectFourBoard.length - 1; index >= 0 && placed == false; index--) {
			if (connectFourBoard[index][column] == 0) {
				// set the value in the column to the current player
				connectFourBoard[index][column] = currentPlayer;
				// break out of loop
				placed = true;
			}
		}

		// if we've gotten this far and we havent placed anything then it must be a wrong move
		if (!placed) {
			toast.push('Invalid move! please try again player ' + currentPlayer);
			return;
		}

		// check if game is over/there is still space to play on the board
		const winner = checkBoardHasWinner(connectFourBoard);
		if ((winner == -1 && !isBoardEmpty(connectFourBoard)) || winner != -1) {
			toast.push('Congratulations player ' + currentPlayer + '!');
			dispatch('game-over', {
				result: winner
			});
		}

		// switch turn
		currentPlayer = currentPlayer == 1 ? 2 : 1;
	}
</script>

<div class="relative">
	<div class="connect-four-indicator" style="left: {$indicatorOffeset}px">
		<Piece value={currentPlayer} />
	</div>
	<div
		class="connect-four gap-0 pt-4"
		style="--board-width: {BOARD_WIDTH}"
		bind:this={boardElement}
		on:mousemove={handleMouse}
		on:click={() => {
			handlePlay(currentColumn);
		}}
		on:keypress={() => {
			handlePlay(currentColumn);
		}}
		role="button"
		tabindex="0"
		aria-label="start game"
	>
		{#each connectFourBoard as row, _}
			{#each row as value, _}
				<Piece {value} />
			{/each}
		{/each}
	</div>
</div>
