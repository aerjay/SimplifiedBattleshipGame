import React from 'react'
import { getByTestId, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Game from './Game'

const PLAYER_ONE_NAME = 'Player 1'
const PLAYER_TWO_NAME = 'Player 2'
const MARKER_TYPE_SHIP = 'ship'
const MARKER_TYPE_HIT = 'hit'
const MARKER_TYPE_MISS = 'miss'

test('renders the game with two players with default styles', () => {
	render(<Game />)

	const playerOne = screen.getByText(PLAYER_ONE_NAME).closest('div')
	const playerTwo = screen.getByText(PLAYER_TWO_NAME).closest('div')

	expect(playerOne).toBeInTheDocument()
	expect(playerTwo).toBeInTheDocument()
	expect(playerOne).not.toHaveClass('hidden')
	expect(playerTwo).toHaveClass('hidden')
})

test('player one wins', () => {
	render(<Game />)
	const playerOne = screen.getByText(PLAYER_ONE_NAME).closest('div')
	const playerTwo = screen.getByText(PLAYER_TWO_NAME).closest('div')
	const winnerAnnouncement = `Congratulations ${PLAYER_ONE_NAME}`
	const boardOneA1 = getByTestId(playerOne, 'A1')
	const boardOneA2 = getByTestId(playerOne, 'A2')
	const boardOneA3 = getByTestId(playerOne, 'A3')
	const boardOneC1 = getByTestId(playerOne, 'C1')
	const boardOneD2 = getByTestId(playerOne, 'D2')
	const boardTwoD10 = getByTestId(playerTwo, 'D10')
	const boardTwoE10 = getByTestId(playerTwo, 'E10')
	const boardTwoF10 = getByTestId(playerTwo, 'F10')
	userEvent.click(boardOneA1)
	userEvent.click(boardOneA2)
	userEvent.click(boardOneA3)
	userEvent.click(boardTwoD10)
	userEvent.click(boardTwoE10)
	userEvent.click(boardTwoF10)

	userEvent.click(boardTwoD10)
	userEvent.click(boardOneC1)
	userEvent.click(boardTwoF10)
	userEvent.click(boardOneD2)
	userEvent.click(boardTwoE10)

	expect(screen.getByText(winnerAnnouncement, { exact: false })).toBeInTheDocument()
	expect(playerOne).toHaveClass('unclickable')
	expect(boardOneA1).toHaveClass(MARKER_TYPE_SHIP)
	expect(boardOneA2).toHaveClass(MARKER_TYPE_SHIP)
	expect(boardOneA3).toHaveClass(MARKER_TYPE_SHIP)
	expect(boardOneC1).toHaveClass(MARKER_TYPE_MISS)
	expect(boardOneD2).toHaveClass(MARKER_TYPE_MISS)
	expect(playerTwo).toHaveClass('unclickable')
	expect(boardTwoD10).toHaveClass(MARKER_TYPE_HIT)
	expect(boardTwoE10).toHaveClass(MARKER_TYPE_HIT)
	expect(boardTwoF10).toHaveClass(MARKER_TYPE_HIT)
})

test('player two wins', () => {
	render(<Game />)
	const playerOne = screen.getByText(PLAYER_ONE_NAME).closest('div')
	const playerTwo = screen.getByText(PLAYER_TWO_NAME).closest('div')
	const winnerAnnouncement = `Congratulations ${PLAYER_TWO_NAME}`
	const boardOneH1 = getByTestId(playerOne, 'H1')
	const boardOneI1 = getByTestId(playerOne, 'I1')
	const boardOneJ1 = getByTestId(playerOne, 'J1')
	const boardTwoD5 = getByTestId(playerTwo, 'D5')
	const boardTwoF5 = getByTestId(playerTwo, 'F5')
	const boardTwoE5 = getByTestId(playerTwo, 'E5')
	const boardTwoD10 = getByTestId(playerTwo, 'D10')
	userEvent.click(boardOneH1)
	userEvent.click(boardOneI1)
	userEvent.click(boardOneJ1)
	userEvent.click(boardTwoD5)
	userEvent.click(boardTwoE5)
	userEvent.click(boardTwoF5)

	userEvent.click(boardTwoD10)
	userEvent.click(boardOneI1)
	userEvent.click(boardTwoD5)
	userEvent.click(boardOneJ1)
	userEvent.click(boardTwoE5)
	userEvent.click(boardOneH1)

	expect(screen.getByText(winnerAnnouncement, { exact: false })).toBeInTheDocument()
	expect(playerTwo).toHaveClass('unclickable')
	expect(boardTwoD5).toHaveClass(MARKER_TYPE_HIT)
	expect(boardTwoF5).toHaveClass(MARKER_TYPE_SHIP)
	expect(boardTwoE5).toHaveClass(MARKER_TYPE_HIT)
	expect(boardTwoD10).toHaveClass(MARKER_TYPE_MISS)
	expect(playerOne).toHaveClass('unclickable')
	expect(boardOneH1).toHaveClass(MARKER_TYPE_HIT)
	expect(boardOneI1).toHaveClass(MARKER_TYPE_HIT)
	expect(boardOneJ1).toHaveClass(MARKER_TYPE_HIT)
})
