import React from 'react'
import Board from './Board'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const BOARD_SIZE = 10
const BOARD_A_CHAR_CODE = 'A'.charCodeAt()
const MARKER_TYPE_SHIP_CSS = 'ship'
const MARKER_TYPE_HIT_CSS = 'hit'
const MARKER_TYPE_MISS_CSS = 'miss'
const MARKER_TYPE_EMPTY_CSS = 'none'

test('renders all the squares', async () => {
	render(
		<Board
			showShipMarker={true}
			onShipHasSunk={() => {}}
			onEnemyEndOfTurn={() => {}}
			onShipPlacement={() => {}}
		/>
	)

	const squares = await screen.findAllByRole('button')

	expect(squares).toHaveLength(BOARD_SIZE * BOARD_SIZE)
	squares.forEach((square) => expect(square).toHaveClass(MARKER_TYPE_EMPTY_CSS))
})

test('renders column labels', () => {
	render(
		<Board
			showShipMarker={true}
			onShipHasSunk={() => {}}
			onEnemyEndOfTurn={() => {}}
			onShipPlacement={() => {}}
		/>
	)

	for (let index = 1; index < BOARD_SIZE; index++) {
		expect(screen.getByText(index)).toBeInTheDocument()
	}
})

test('renders row labels', () => {
	render(
		<Board
			showShipMarker={true}
			onShipHasSunk={() => {}}
			onEnemyEndOfTurn={() => {}}
			onShipPlacement={() => {}}
		/>
	)

	for (
		let index = BOARD_A_CHAR_CODE;
		index < BOARD_A_CHAR_CODE + BOARD_SIZE;
		index++
	) {
		expect(screen.getByText(String.fromCharCode(index))).toBeInTheDocument()
	}
})

test('does not change square\'s marker type to ship on click when showShipMarker is disabled', () => {
	render(
		<Board
			showShipMarker={false}
			onShipHasSunk={() => {}}
			onEnemyEndOfTurn={() => {}}
			onShipPlacement={() => {}}
		/>
	)
	const a1 = screen.getByTestId('A1')

	userEvent.click(a1)

	expect(a1).not.toHaveClass(MARKER_TYPE_SHIP_CSS)
})

test('changes square\'s marker type to ship on click when showShipMarker is enabled', () => {
	render(
		<Board
			showShipMarker={true}
			onShipHasSunk={() => {}}
			onEnemyEndOfTurn={() => {}}
			onShipPlacement={() => {}}
		/>
	)
	const a1 = screen.getByTestId('A1')

	userEvent.click(a1)

	expect(a1).toHaveClass(MARKER_TYPE_SHIP_CSS)
})

test('changes square\'s marker type to ship on double click', () => {
	render(
		<Board
			showShipMarker={true}
			onShipHasSunk={() => {}}
			onEnemyEndOfTurn={() => {}}
			onShipPlacement={() => {}}
		/>
	)
	const a1 = screen.getByTestId('A1')

	userEvent.click(a1)

	expect(a1).toHaveClass(MARKER_TYPE_SHIP_CSS)
})

test('changes the marker type of the first selected square to ship when clicking non-neighbouring squares', () => {
	render(
		<Board
			showShipMarker={true}
			onShipHasSunk={() => {}}
			onEnemyEndOfTurn={() => {}}
			onShipPlacement={() => {}}
		/>
	)
	const i3 = screen.getByTestId('I3')
	const e6 = screen.getByTestId('E6')
	const c2 = screen.getByTestId('C2')
	const a10 = screen.getByTestId('A10')

	userEvent.click(i3)
	userEvent.click(e6)
	userEvent.click(c2)
	userEvent.click(a10)

	expect(i3).toHaveClass(MARKER_TYPE_SHIP_CSS)
	expect(e6).toHaveClass(MARKER_TYPE_EMPTY_CSS)
	expect(c2).toHaveClass(MARKER_TYPE_EMPTY_CSS)
	expect(a10).toHaveClass(MARKER_TYPE_EMPTY_CSS)
})

test('changes the marker type of the first three distinct horizontal neighbouring squares to ship', () => {
	render(
		<Board
			showShipMarker={true}
			onShipHasSunk={() => {}}
			onEnemyEndOfTurn={() => {}}
			onShipPlacement={() => {}}
		/>
	)
	const f9 = screen.getByTestId('F9')
	const g9 = screen.getByTestId('G9')
	const g10 = screen.getByTestId('G10')
	const e9 = screen.getByTestId('E9')

	userEvent.click(f9)
	userEvent.click(g9)
	userEvent.click(g10)
	userEvent.click(e9)

	expect(f9).toHaveClass(MARKER_TYPE_SHIP_CSS)
	expect(g9).toHaveClass(MARKER_TYPE_SHIP_CSS)
	expect(g10).toHaveClass(MARKER_TYPE_EMPTY_CSS)
	expect(e9).toHaveClass(MARKER_TYPE_SHIP_CSS)
})

test('changes the marker type of the first three distinct vertical neighbouring squares to ship', () => {
	render(
		<Board
			showShipMarker={true}
			onShipHasSunk={() => {}}
			onEnemyEndOfTurn={() => {}}
			onShipPlacement={() => {}}
		/>
	)
	const b8 = screen.getByTestId('B8')
	const b9 = screen.getByTestId('B9')
	const c9 = screen.getByTestId('C9')
	const b7 = screen.getByTestId('B7')

	userEvent.click(b8)
	userEvent.click(b9)
	userEvent.click(c9)
	userEvent.click(b7)

	expect(b8).toHaveClass(MARKER_TYPE_SHIP_CSS)
	expect(b9).toHaveClass(MARKER_TYPE_SHIP_CSS)
	expect(c9).toHaveClass(MARKER_TYPE_EMPTY_CSS)
	expect(b7).toHaveClass(MARKER_TYPE_SHIP_CSS)
})

test('changes the marker type of the first three distinct horizontal neighbouring squares to ship and the rest to miss when clicking more than three squares', () => {
	render(
		<Board
			showShipMarker={true}
			onShipHasSunk={() => {}}
			onEnemyEndOfTurn={() => {}}
			onShipPlacement={() => {}}
		/>
	)
	const c1 = screen.getByTestId('C1')
	const d1 = screen.getByTestId('D1')
	const e1 = screen.getByTestId('E1')
	const f1 = screen.getByTestId('F1')

	userEvent.click(c1)
	userEvent.click(d1)
	userEvent.click(e1)
	userEvent.click(f1)

	expect(c1).toHaveClass(MARKER_TYPE_SHIP_CSS)
	expect(d1).toHaveClass(MARKER_TYPE_SHIP_CSS)
	expect(e1).toHaveClass(MARKER_TYPE_SHIP_CSS)
	expect(f1).toHaveClass(MARKER_TYPE_MISS_CSS)
})

test('changes the marker type of the first three distinct vertical neighbouring squares to ship when clicking more than three squares', () => {
	render(
		<Board
			showShipMarker={true}
			onShipHasSunk={() => {}}
			onEnemyEndOfTurn={() => {}}
			onShipPlacement={() => {}}
		/>
	)
	const f8 = screen.getByTestId('F8')
	const f9 = screen.getByTestId('F9')
	const e9 = screen.getByTestId('E9')
	const f7 = screen.getByTestId('F7')

	userEvent.click(f8)
	userEvent.click(f9)
	userEvent.click(e9)
	userEvent.click(f7)

	expect(f8).toHaveClass(MARKER_TYPE_SHIP_CSS)
	expect(f9).toHaveClass(MARKER_TYPE_SHIP_CSS)
	expect(e9).toHaveClass(MARKER_TYPE_EMPTY_CSS)
	expect(f7).toHaveClass(MARKER_TYPE_SHIP_CSS)
})

test('only changes the marker type of squares that has ship to hit by re-clicking them and the rest as miss', () => {
	render(
		<Board
			showShipMarker={true}
			onShipHasSunk={() => {}}
			onEnemyEndOfTurn={() => {}}
			onShipPlacement={() => {}}
		/>
	)
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

	expect(c1).toHaveClass(MARKER_TYPE_HIT_CSS)
	expect(d1).toHaveClass(MARKER_TYPE_HIT_CSS)
	expect(e1).toHaveClass(MARKER_TYPE_HIT_CSS)
	expect(f7).toHaveClass(MARKER_TYPE_MISS_CSS)
	expect(f8).toHaveClass(MARKER_TYPE_MISS_CSS)
	expect(f9).toHaveClass(MARKER_TYPE_MISS_CSS)
})

test("not allowed to click any squares after setting three squares' marker type to hit", () => {
	render(
		<Board
			showShipMarker={true}
			onShipHasSunk={() => {}}
			onEnemyEndOfTurn={() => {}}
			onShipPlacement={() => {}}
		/>
	)
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

	expect(f8).toHaveClass(MARKER_TYPE_HIT_CSS)
	expect(f9).toHaveClass(MARKER_TYPE_HIT_CSS)
	expect(f10).toHaveClass(MARKER_TYPE_HIT_CSS)
	expect(a1).toHaveClass(MARKER_TYPE_EMPTY_CSS)
	expect(f1).toHaveClass(MARKER_TYPE_EMPTY_CSS)
	expect(a10).toHaveClass(MARKER_TYPE_EMPTY_CSS)
})

test("calls onShipPlacement handler once after setting three neighbouring squares' marker type to ship", () => {
	const handleShipPlacement = jest.fn()
	render(
		<Board
			showShipMarker={true}
			onShipHasSunk={() => {}}
			onEnemyEndOfTurn={() => {}}
			onShipPlacement={handleShipPlacement}
		/>
	)
	const f8 = screen.getByTestId('F8')
	const f9 = screen.getByTestId('F9')
	const f10 = screen.getByTestId('F10')

	userEvent.click(f8)
	userEvent.click(f9)
	userEvent.click(f10)

	expect(f8).toHaveClass(MARKER_TYPE_SHIP_CSS)
	expect(f9).toHaveClass(MARKER_TYPE_SHIP_CSS)
	expect(f10).toHaveClass(MARKER_TYPE_SHIP_CSS)
	expect(handleShipPlacement).toHaveBeenCalledTimes(1)
})

test("calls onShipHasSunk handler once after setting three squares' marker type to hit", () => {
	const handleShipHasSunk = jest.fn()
	render(
		<Board
			showShipMarker={true}
			onShipHasSunk={handleShipHasSunk}
			onEnemyEndOfTurn={() => {}}
			onShipPlacement={() => {}}
		/>
	)
	const f8 = screen.getByTestId('F8')
	const f9 = screen.getByTestId('F9')
	const f10 = screen.getByTestId('F10')
	userEvent.click(f8)
	userEvent.click(f9)
	userEvent.click(f10)

	userEvent.click(f8)
	userEvent.click(f9)
	userEvent.click(f10)

	expect(f8).toHaveClass(MARKER_TYPE_HIT_CSS)
	expect(f9).toHaveClass(MARKER_TYPE_HIT_CSS)
	expect(f10).toHaveClass(MARKER_TYPE_HIT_CSS)
	expect(handleShipHasSunk).toHaveBeenCalledTimes(1)
})

test('calls onEnemyEndOfTurn handler once after setting a square\'s marker type to hit', () => {
	const handleEnemyEndOfTurn = jest.fn()
	render(
		<Board
			showShipMarker={true}
			onShipHasSunk={() => {}}
			onEnemyEndOfTurn={handleEnemyEndOfTurn}
			onShipPlacement={() => {}}
		/>
	)
	const f8 = screen.getByTestId('F8')
	const f9 = screen.getByTestId('F9')
	const f10 = screen.getByTestId('F10')
	userEvent.click(f8)
	userEvent.click(f9)
	userEvent.click(f10)

	userEvent.click(f8)

	expect(f8).toHaveClass(MARKER_TYPE_HIT_CSS)
	expect(f9).toHaveClass(MARKER_TYPE_SHIP_CSS)
	expect(f10).toHaveClass(MARKER_TYPE_SHIP_CSS)
	expect(handleEnemyEndOfTurn).toHaveBeenCalledTimes(1)
})

test('calls onEnemyEndOfTurn handler once after setting a square\'s marker type to miss', () => {
	const handleEnemyEndOfTurn = jest.fn()
	render(
		<Board
			showShipMarker={true}
			onShipHasSunk={() => {}}
			onEnemyEndOfTurn={handleEnemyEndOfTurn}
			onShipPlacement={() => {}}
		/>
	)
	const f8 = screen.getByTestId('F8')
	const f9 = screen.getByTestId('F9')
	const f10 = screen.getByTestId('F10')
	const a1 = screen.getByTestId('A1')
	userEvent.click(f8)
	userEvent.click(f9)
	userEvent.click(f10)

	userEvent.click(a1)

	expect(f8).toHaveClass(MARKER_TYPE_SHIP_CSS)
	expect(f9).toHaveClass(MARKER_TYPE_SHIP_CSS)
	expect(f10).toHaveClass(MARKER_TYPE_SHIP_CSS)
	expect(a1).toHaveClass(MARKER_TYPE_MISS_CSS)
	expect(handleEnemyEndOfTurn).toHaveBeenCalledTimes(1)
})
