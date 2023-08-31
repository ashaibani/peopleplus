// setupBoard creates a 2d array according to our params. this is what represents our connect four board.
export function setupBoard(boardWidth: number, boardHeight: number): number[][] {
    // init our 2d array
    var board: number[][] = [];
    // iterate over desired board height
    for (let i = 0; i < boardHeight; i++) {
        // init a new row
        var row: number[] = [];
        // iterate over desired board width
        for (let i = 0; i < boardWidth; i++) {
            // append a 0 to the row
            row = [...row, 0];
        }
        // append row to the board
        board = [...board, row];
    }
    return board;
}

// isBoardEmpty checks if any of the rows on the provided board have an empty value (value == 0)
export function isBoardEmpty(connectFourBoard: number[][]): boolean {
    return connectFourBoard.some((row) => row.includes(0));
}

// checkBoardHasWinner checks every possible value on the board for a matching set of none 0 values
export function checkBoardHasWinner(connectFourBoard: number[][]): number {
    // iterate over each row
    for (let i = 0; i < connectFourBoard.length; i++) {
        // extract current row
        const row = connectFourBoard[i];
        // iterate over current row
        for (let j = 0; j < row.length; j++) {
            // extract current element
            const element = row[j];
            if (element == 0) {
                continue;
            }
            // check horizontal
            // first we check we can access that far ahead horizontally
            // (this is just for readability, both if statements can be squashed into one)
            if (!!row[j + 3]) {
                // then we compare values
                if (element == row[j + 1] && element == row[j + 2] && element == row[j + 3]) {
                    return element;
                }
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
