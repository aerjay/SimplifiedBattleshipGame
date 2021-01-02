import React from 'react'
import Player from './Player'
import { render, screen } from '@testing-library/react'

test('renders a square with passed properties', () => {
	const name = 'value'
	render(<Player name={name} />)

	const player = screen.getByText(name)

	expect(player).toBeInTheDocument()
})
