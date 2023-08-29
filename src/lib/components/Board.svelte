<script lang="ts">
	import { onMount } from 'svelte';
	import Piece from './Piece.svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	var currentColumn: number = 0;
	var currentPlayer: number = 1;
	var connectFourBoard: number[][] = [];
	var boardElement: HTMLDivElement;

	const boardWidth: number = 7;
	const boardHeight: number = 6;
	const PIECE_SIZE: number = 32;
	const PIECE_MARGIN: number = 8;

	let indicatorOffeset = tweened(0, {
		easing: cubicOut
	});

	onMount(() => {
		// build connect four board
		connectFourBoard = setupBoard(boardWidth, boardHeight);

		// make sure player 1 starts
		currentPlayer = 1;
	});

	// setupBoard creates a 2d array according to our params. this is what represents our connect four board.
	function setupBoard(boardWidth: number, boardHeight: number): number[][] {
		var board: number[][] = [];
		for (let i = 0; i < boardHeight; i++) {
			var row: number[] = [];
			for (let i = 0; i < boardWidth; i++) {
				row = [...row, 0];
			}
			board = [...board, row];
		}
		return board;
	}

	function isBoardEmpty(): boolean {
		return connectFourBoard.some((row) => row.includes(0));
	}

	function checkBoardHasWinner(): number {
		for (let i = 0; i < connectFourBoard.length; i++) {
			const row = connectFourBoard[i];
			for (let j = 0; j < row.length; j++) {
				const element = row[j];
				if (element == 0) {
					continue;
				}
				// check horizontal
				if (
					!!row[j + 3] &&
					element == row[j + 1] &&
					element == row[j + 2] &&
					element == row[j + 3]
				) {
					return element;
				}

				// check vertical
				// first we check we can access that far ahead vertically
				if (!!connectFourBoard[i + 3]) {
					// then we compare values
					if (
						element == connectFourBoard[i + 1][j] &&
						element == connectFourBoard[i + 2][j] &&
						element == connectFourBoard[i + 3][j]
					) {
						return element;
					}
				}

				// check diagonal right
				// first we check we can access that far ahead vertically
				if (!!connectFourBoard[i + 3]) {
					// then we compare values
					if (
						element == connectFourBoard[i + 1][j + 1] &&
						element == connectFourBoard[i + 2][j + 2] &&
						element == connectFourBoard[i + 3][j + 3]
					) {
						return element;
					}
				}

				// check diagonal left
				// first we check we can access that far ahead vertically
				if (!!connectFourBoard[i - 3]) {
					// then we compare values
					if (
						element == connectFourBoard[i - 1][j + 1] &&
						element == connectFourBoard[i - 2][j + 2] &&
						element == connectFourBoard[i - 3][j + 3]
					) {
						return element;
					}
				}
			}
		}
		return -1;
	}

	function handleMouse(e: MouseEvent) {
		const boardX = boardElement.getBoundingClientRect().x;
		const deltaX = e.clientX - boardX;
		currentColumn = Math.min(Math.max(Math.floor(deltaX / (PIECE_SIZE + PIECE_MARGIN + 24)), 0), 6);
		indicatorOffeset.set(currentColumn * (PIECE_SIZE + PIECE_MARGIN + 24));
	}

	function handlePlay(column: number) {
		// place piece down by check column from top to bottom and placing it in first empty slot (value == 0)
		var placed = false;
		for (let index = connectFourBoard.length - 1; index >= 0 && placed == false; index--) {
			if (connectFourBoard[index][column] == 0) {
				connectFourBoard[index][column] = currentPlayer;
				placed = true;
			}
		}

		if (!placed) {
			toast.push('Invalid move! please try again player ' + currentPlayer);
			return;
		}

		// check if game is over/there is still space to play on the board
		const winner = checkBoardHasWinner();
		if ((winner == -1 && !isBoardEmpty()) || winner != -1) {
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
	<!-- svelte-ignore missing-declaration -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="connect-four gap-0 pt-4"
		bind:this={boardElement}
		on:mousemove={handleMouse}
		on:click={() => {
			handlePlay(currentColumn);
		}}
	>
		{#each connectFourBoard as row, _}
			{#each row as value, _}
				<Piece {value} />
			{/each}
		{/each}
	</div>
</div>
