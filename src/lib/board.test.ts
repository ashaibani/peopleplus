import { expect, test, describe } from 'vitest'
import { checkBoardHasWinner, setupBoard } from './board'

describe("Connect 4", () => {

    test('correct board is generated', () => {
        const exampleBoard = setupBoard(6, 5)

        expect(exampleBoard.length).toBe(5)
        expect(exampleBoard[0].length).toBe(6)
    })

    test('board horizontal win is detected', () => {
        const exampleBoard = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 2],
            [0, 1, 1, 1, 1, 2, 2],
        ]

        expect(checkBoardHasWinner(exampleBoard)).toBe(1)
    })

    test('board vertical win is detected', () => {
        const exampleBoard = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0],
            [0, 1, 2, 2, 0, 0, 0],
            [0, 1, 2, 2, 0, 0, 0],
        ]

        expect(checkBoardHasWinner(exampleBoard)).toBe(1)
    })

    test('board diagonal win is detected', () => {
        const exampleBoard = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 2, 0, 0],
            [0, 0, 1, 2, 2, 0, 0],
            [0, 1, 2, 2, 2, 0, 0],
        ]

        expect(checkBoardHasWinner(exampleBoard)).toBe(1)
    })

    test('board is a draw', () => {
        const exampleBoard = [
            [1, 1, 2, 2, 1, 1, 2],
            [1, 2, 1, 1, 2, 2, 1],
            [2, 2, 2, 1, 1, 1, 2],
            [1, 2, 1, 2, 2, 2, 1],
            [2, 1, 1, 2, 1, 1, 2],
            [2, 1, 2, 2, 2, 1, 2],
        ]

        expect(checkBoardHasWinner(exampleBoard)).toBe(-1)
    })

})
