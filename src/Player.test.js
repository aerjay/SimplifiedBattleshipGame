import React from 'react'
import Player from './Player'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('renders a square with passed properties', () => {
	const name = 'value'
	render(<Player name={name} onPlayerHasLost={() => {}}/>)

	const player = screen.getByText(name)

	expect(player).toBeInTheDocument()
})

test('calls onPlayerHasLost handler once when all the parts of the ship has been hit', () => {
	const name = 'value'
	const onPlayerHasLostHandler = jest.fn()
	render(<Player name={name} onPlayerHasLost={onPlayerHasLostHandler}/>)
	const f1 = screen.getByTestId('F1')
	const f2 = screen.getByTestId('F2')
	const f3 = screen.getByTestId('F3')
	userEvent.click(f1)
	userEvent.click(f2)
	userEvent.click(f3)

	userEvent.click(f1)
	userEvent.click(f2)
	userEvent.click(f3)

	expect(onPlayerHasLostHandler).toHaveBeenCalledTimes(1)
})
