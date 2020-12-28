import React from 'react'
import Board from './Board'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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

test('changes square value on click', () => {
	render(<Board />)
	const a1 = screen.getByTestId('A1')

	userEvent.click(a1)

	expect(a1).toHaveTextContent('S')
})

test('changes square value on double click', () => {
	render(<Board />)
	const a1 = screen.getByTestId('A1')

	userEvent.click(a1)

	expect(a1).toHaveTextContent('S')
})

test('changes first selected square when clicking non-neighbouring squares', () => {
	render(<Board />)
	const i3 = screen.getByTestId('I3')
	const e6 = screen.getByTestId('E6')
	const c2 = screen.getByTestId('C2')
	const a10 = screen.getByTestId('A10')

	userEvent.click(i3)
	userEvent.click(e6)
	userEvent.click(c2)
	userEvent.click(a10)

	expect(i3).toHaveTextContent('S')
	expect(e6).not.toHaveTextContent('S')
	expect(c2).not.toHaveTextContent('S')
	expect(a10).not.toHaveTextContent('S')
})

test('changes first three distinct horizontal neighbouring squares', () => {
	render(<Board />)
	const f9 = screen.getByTestId('F9')
	const g9 = screen.getByTestId('G9')
	const g10 = screen.getByTestId('G10')
	const e9 = screen.getByTestId('E9')

	userEvent.click(f9)
	userEvent.click(g9)
	userEvent.click(g10)
	userEvent.click(e9)

	expect(f9).toHaveTextContent('S')
	expect(g9).toHaveTextContent('S')
	expect(g10).not.toHaveTextContent('S')
	expect(e9).toHaveTextContent('S')
})

test('changes first three distinct vertical neighbouring squares', () => {
	render(<Board />)
	const b8 = screen.getByTestId('B8')
	const b9 = screen.getByTestId('B9')
	const c9 = screen.getByTestId('C9')
	const b7 = screen.getByTestId('B7')

	userEvent.click(b8)
	userEvent.click(b9)
	userEvent.click(c9)
	userEvent.click(b7)

	expect(b8).toHaveTextContent('S')
	expect(b9).toHaveTextContent('S')
	expect(c9).not.toHaveTextContent('S')
	expect(b7).toHaveTextContent('S')
})

test('changes first three distinct horizontal neighbouring squares when clicking more than three squares', () => {
	render(<Board />)
	const c1 = screen.getByTestId('C1')
	const d1 = screen.getByTestId('D1')
	const e1 = screen.getByTestId('E1')
	const f1 = screen.getByTestId('F1')

	userEvent.click(c1)
	userEvent.click(d1)
	userEvent.click(e1)
	userEvent.click(f1)

	expect(c1).toHaveTextContent('S')
	expect(d1).toHaveTextContent('S')
	expect(e1).toHaveTextContent('S')
	expect(f1).not.toHaveTextContent('S')
})

test('changes first three distinct vertical neighbouring squares when clicking more than three squares', () => {
	render(<Board />)
	const j7 = screen.getByTestId('C1')
	const j8 = screen.getByTestId('D1')
	const j6 = screen.getByTestId('E1')
	const a1 = screen.getByTestId('A1')

	userEvent.click(j7)
	userEvent.click(j8)
	userEvent.click(j6)
	userEvent.click(a1)

	expect(j7).toHaveTextContent('S')
	expect(j8).toHaveTextContent('S')
	expect(j6).toHaveTextContent('S')
	expect(a1).not.toHaveTextContent('S')
})