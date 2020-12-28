import React from 'react'
import Board from './Board'
import { render, screen } from '@testing-library/react'

const BOARD_SIZE = 10
const BOARD_A_CHAR_CODE = 'A'.charCodeAt()

test('renders all the squares', async () => {
	render(<Board />)

	const squares = await screen.findAllByRole('button')

	expect(squares).toHaveLength(BOARD_SIZE * BOARD_SIZE)
	squares.forEach((square) => {
		expect(square).toHaveClass('square')
	})
})

test('renders column labels', () => {
	render(<Board />)

	for (let index = 1; index < BOARD_SIZE; index++) {
		expect(screen.getByText(index)).toBeInTheDocument()
	}
})

test('renders row labels', () => {
	render(<Board />)

	for (let index = BOARD_A_CHAR_CODE; index < BOARD_A_CHAR_CODE + BOARD_SIZE; index++) {
		expect(screen.getByText(String.fromCharCode(index))).toBeInTheDocument()
	}
})

// Valid:
// Click, horizontal and vertical
// Invalid:
// Click the same element again
// UP UP LEFT/RIGHT
// left left, up/down
// random places to click
