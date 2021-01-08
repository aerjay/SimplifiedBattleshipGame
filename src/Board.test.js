import React from 'react'
import Board from './Board'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const BOARD_SIZE = 10
const BOARD_A_CHAR_CODE = 'A'.charCodeAt()
const MARKER_TYPE_SHIP = 'ship'
const MARKER_TYPE_HIT = 'hit'
const MARKER_TYPE_MISS = 'miss'
const MARKER_TYPE_EMPTY = 'none'

test('renders all the squares', async () => {
	render(<Board showShipMarker={true} onShipHasSunk={() => {}} onEnemyEndOfTurn={() => {}} onShipPlacement={() => {}}/>)

	const squares = await screen.findAllByRole('button')

	expect(squares).toHaveLength(BOARD_SIZE * BOARD_SIZE)
	squares.forEach(square => expect(square).toHaveClass(MARKER_TYPE_EMPTY))
})

test('renders column labels', () => {
	render(<Board showShipMarker={true} onShipHasSunk={() => {}} onEnemyEndOfTurn={() => {}} onShipPlacement={() => {}}/>)

	for (let index = 1; index < BOARD_SIZE; index++) {
		expect(screen.getByText(index)).toBeInTheDocument()
	}
})

test('renders row labels', () => {
	render(<Board showShipMarker={true} onShipHasSunk={() => {}} onEnemyEndOfTurn={() => {}} onShipPlacement={() => {}}/>)

	for (
		let index = BOARD_A_CHAR_CODE;
		index < BOARD_A_CHAR_CODE + BOARD_SIZE;
		index++
	) {
		expect(screen.getByText(String.fromCharCode(index))).toBeInTheDocument()
	}
})

test('changes square class to ship on click', () => {
	render(<Board showShipMarker={true} onShipHasSunk={() => {}} onEnemyEndOfTurn={() => {}} onShipPlacement={() => {}}/>)
	const a1 = screen.getByTestId('A1')

	userEvent.click(a1)

	expect(a1).toHaveClass(MARKER_TYPE_SHIP)
})

test('changes square class to ship on double click', () => {
	render(<Board showShipMarker={true} onShipHasSunk={() => {}} onEnemyEndOfTurn={() => {}} onShipPlacement={() => {}}/>)
	const a1 = screen.getByTestId('A1')

	userEvent.click(a1)

	expect(a1).toHaveClass(MARKER_TYPE_SHIP)
})

test('changes the class of the first selected square to ship when clicking non-neighbouring squares', () => {
	render(<Board showShipMarker={true} onShipHasSunk={() => {}} onEnemyEndOfTurn={() => {}} onShipPlacement={() => {}}/>)
	const i3 = screen.getByTestId('I3')
	const e6 = screen.getByTestId('E6')
	const c2 = screen.getByTestId('C2')
	const a10 = screen.getByTestId('A10')

	userEvent.click(i3)
	userEvent.click(e6)
	userEvent.click(c2)
	userEvent.click(a10)

	expect(i3).toHaveClass(MARKER_TYPE_SHIP)
	expect(e6).toHaveClass(MARKER_TYPE_EMPTY)
	expect(c2).toHaveClass(MARKER_TYPE_EMPTY)
	expect(a10).toHaveClass(MARKER_TYPE_EMPTY)
})

test('changes the class of the first three distinct horizontal neighbouring squares to ship', () => {
	render(<Board showShipMarker={true} onShipHasSunk={() => {}} onEnemyEndOfTurn={() => {}} onShipPlacement={() => {}}/>)
	const f9 = screen.getByTestId('F9')
	const g9 = screen.getByTestId('G9')
	const g10 = screen.getByTestId('G10')
	const e9 = screen.getByTestId('E9')

	userEvent.click(f9)
	userEvent.click(g9)
	userEvent.click(g10)
	userEvent.click(e9)

	expect(f9).toHaveClass(MARKER_TYPE_SHIP)
	expect(g9).toHaveClass(MARKER_TYPE_SHIP)
	expect(g10).toHaveClass(MARKER_TYPE_EMPTY)
	expect(e9).toHaveClass(MARKER_TYPE_SHIP)
})

test('changes the class of the first three distinct vertical neighbouring squares to ship', () => {
	render(<Board showShipMarker={true} onShipHasSunk={() => {}} onEnemyEndOfTurn={() => {}} onShipPlacement={() => {}}/>)
	const b8 = screen.getByTestId('B8')
	const b9 = screen.getByTestId('B9')
	const c9 = screen.getByTestId('C9')
	const b7 = screen.getByTestId('B7')

	userEvent.click(b8)
	userEvent.click(b9)
	userEvent.click(c9)
	userEvent.click(b7)

	expect(b8).toHaveClass(MARKER_TYPE_SHIP)
	expect(b9).toHaveClass(MARKER_TYPE_SHIP)
	expect(c9).toHaveClass(MARKER_TYPE_EMPTY)
	expect(b7).toHaveClass(MARKER_TYPE_SHIP)
})

test('changes the class of the first three distinct horizontal neighbouring squares to ship and the rest to miss when clicking more than three squares', () => {
	render(<Board showShipMarker={true} onShipHasSunk={() => {}} onEnemyEndOfTurn={() => {}} onShipPlacement={() => {}}/>)
	const c1 = screen.getByTestId('C1')
	const d1 = screen.getByTestId('D1')
	const e1 = screen.getByTestId('E1')
	const f1 = screen.getByTestId('F1')

	userEvent.click(c1)
	userEvent.click(d1)
	userEvent.click(e1)
	userEvent.click(f1)

	expect(c1).toHaveClass(MARKER_TYPE_SHIP)
	expect(d1).toHaveClass(MARKER_TYPE_SHIP)
	expect(e1).toHaveClass(MARKER_TYPE_SHIP)
	expect(f1).toHaveClass(MARKER_TYPE_MISS)
})

test('changes the class of the first three distinct vertical neighbouring squares to ship when clicking more than three squares', () => {
	render(<Board showShipMarker={true} onShipHasSunk={() => {}} onEnemyEndOfTurn={() => {}} onShipPlacement={() => {}}/>)
	const f8 = screen.getByTestId('F8')
	const f9 = screen.getByTestId('F9')
	const e9 = screen.getByTestId('E9')
	const f7 = screen.getByTestId('F7')

	userEvent.click(f8)
	userEvent.click(f9)
	userEvent.click(e9)
	userEvent.click(f7)

	expect(f8).toHaveClass(MARKER_TYPE_SHIP)
	expect(f9).toHaveClass(MARKER_TYPE_SHIP)
	expect(e9).toHaveClass(MARKER_TYPE_EMPTY)
	expect(f7).toHaveClass(MARKER_TYPE_SHIP)
})

test('only changes the class of squares that has ship class to hit by re-clicking them and the rest as miss class', () => {
	const onShipHadSunkHandler = jest.fn()
	render(<Board showShipMarker={true} onShipHasSunk={onShipHadSunkHandler} onEnemyEndOfTurn={() => {}} onShipPlacement={() => {}}/>)
	const c1 = screen.getByTestId('C1')
	const d1 = screen.getByTestId('D1')
	const e1 = screen.getByTestId('E1')
	const f8 = screen.getByTestId('F8')
	const f9 = screen.getByTestId('F9')
	const f7 = screen.getByTestId('F7')
	userEvent.click(c1)
	userEvent.click(d1)
	userEvent.click(e1)

	userEvent.click(f7)
	userEvent.click(c1)
	userEvent.click(d1)
	userEvent.click(f8)
	userEvent.click(f9)
	userEvent.click(e1)

	expect(c1).toHaveClass(MARKER_TYPE_HIT)
	expect(d1).toHaveClass(MARKER_TYPE_HIT)
	expect(e1).toHaveClass(MARKER_TYPE_HIT)
	expect(f7).toHaveClass(MARKER_TYPE_MISS)
	expect(f8).toHaveClass(MARKER_TYPE_MISS)
	expect(f9).toHaveClass(MARKER_TYPE_MISS)
})

test('not allowed to click any squares after setting three squares\' class to hit', () => {
	render(<Board showShipMarker={true} onShipHasSunk={() => {}} onEnemyEndOfTurn={() => {}} onShipPlacement={() => {}}/>)
	const f8 = screen.getByTestId('F8')
	const f9 = screen.getByTestId('F9')
	const f10 = screen.getByTestId('F10')
	const a1 = screen.getByTestId('A1')
	const f1 = screen.getByTestId('F1')
	const a10 = screen.getByTestId('A10')
	userEvent.click(f8)
	userEvent.click(f9)
	userEvent.click(f10)
	userEvent.click(f8)
	userEvent.click(f9)
	userEvent.click(f10)

	userEvent.click(a1)
	userEvent.click(f1)
	userEvent.click(a10)

	expect(f8).toHaveClass(MARKER_TYPE_HIT)
	expect(f9).toHaveClass(MARKER_TYPE_HIT)
	expect(f10).toHaveClass(MARKER_TYPE_HIT)
	expect(a1).toHaveClass(MARKER_TYPE_EMPTY)
	expect(f1).toHaveClass(MARKER_TYPE_EMPTY)
	expect(a10).toHaveClass(MARKER_TYPE_EMPTY)
})

test('calls onShipHasSunk handler once after setting three squares\' class to hit', () => {
	const onShipHasSunkHandler = jest.fn()
	render(<Board showShipMarker={true} onShipHasSunk={onShipHasSunkHandler} onEnemyEndOfTurn={() => {}} onShipPlacement={() => {}}/>)
	const f8 = screen.getByTestId('F8')
	const f9 = screen.getByTestId('F9')
	const f10 = screen.getByTestId('F10')
	userEvent.click(f8)
	userEvent.click(f9)
	userEvent.click(f10)

	userEvent.click(f8)
	userEvent.click(f9)
	userEvent.click(f10)

	expect(f8).toHaveClass(MARKER_TYPE_HIT)
	expect(f9).toHaveClass(MARKER_TYPE_HIT)
	expect(f10).toHaveClass(MARKER_TYPE_HIT)
	expect(onShipHasSunkHandler).toHaveBeenCalledTimes(1)
})
