import React from 'react'
import Player from './Player'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('renders a player with passed properties', () => {
	const name = 'value'
	const customStyle = 'style'
	render(
		<Player
			name={name}
			customStyle={customStyle}
			showShipOnBoard={false}
			onPlayerHasLost={() => {}}
			onEnemyEndOfTurn={() => {}}
			onPlayerShipPlacement={() => {}}
		/>
	)

	const player = screen.getByText(name).closest('div')

	expect(player).toBeInTheDocument()
	expect(player).toHaveClass('player-container ' + customStyle)
})

test('renders a player with default customStyle', () => {
	const name = 'value'
	const customStyle = ''
	render(
		<Player
			name={name}
			showShipOnBoard={false}
			onPlayerHasLost={() => {}}
			onEnemyEndOfTurn={() => {}}
			onPlayerShipPlacement={() => {}}
		/>
	)
	const player = screen.getByText(name).closest('div')

	expect(player).toHaveClass('player-container ' + customStyle)
})

test('calls onPlayerShipPlacement handler once after ship has been placed on board', () => {
	const name = 'value'
	const handlePlayerShipPlacement = jest.fn()
	render(
		<Player
			name={name}
			showShipOnBoard={true}
			onPlayerHasLost={() => {}}
			onEnemyEndOfTurn={() => {}}
			onPlayerShipPlacement={handlePlayerShipPlacement}
		/>
	)
	const f1 = screen.getByTestId('F1')
	const f2 = screen.getByTestId('F2')
	const f3 = screen.getByTestId('F3')

	userEvent.click(f1)
	userEvent.click(f2)
	userEvent.click(f3)

	expect(handlePlayerShipPlacement).toHaveBeenCalledTimes(1)
})

test('calls onPlayerHasLost handler once after all the parts of the ship has been hit', () => {
	const name = 'value'
	const handlePlayerHasLost = jest.fn()
	render(
		<Player
			name={name}
			showShipOnBoard={true}
			onPlayerHasLost={handlePlayerHasLost}
			onEnemyEndOfTurn={() => {}}
			onPlayerShipPlacement={() => {}}
		/>
	)
	const f1 = screen.getByTestId('F1')
	const f2 = screen.getByTestId('F2')
	const f3 = screen.getByTestId('F3')
	userEvent.click(f1)
	userEvent.click(f2)
	userEvent.click(f3)

	userEvent.click(f1)
	userEvent.click(f2)
	userEvent.click(f3)

	expect(handlePlayerHasLost).toHaveBeenCalledTimes(1)
})

test('calls onEnemyEndOfTurn handler once after clicking a square', () => {
	const name = 'value'
	const handleEnemyEndOfTurn = jest.fn()
	render(
		<Player
			name={name}
			showShipOnBoard={true}
			onPlayerHasLost={() => {}}
			onEnemyEndOfTurn={handleEnemyEndOfTurn}
			onPlayerShipPlacement={() => {}}
		/>
	)
	const f1 = screen.getByTestId('F1')
	const f2 = screen.getByTestId('F2')
	const f3 = screen.getByTestId('F3')
	const a1 = screen.getByTestId('A1')
	userEvent.click(f1)
	userEvent.click(f2)
	userEvent.click(f3)

	userEvent.click(a1)

	expect(handleEnemyEndOfTurn).toHaveBeenCalledTimes(1)
})
