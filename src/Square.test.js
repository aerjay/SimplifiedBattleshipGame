import React from 'react'
import Square from './Square'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

test('renders a square with passed properties', () => {
	const testId = '0'
	const className = 'value'
	render(<Square testId={testId} className={className} onClick={() => {}} />)

	const square = screen.getByTestId(testId)

	expect(square).toHaveClass(className)
})

test('renders a square with default customStyle', () => {
	const testId = '0'
	render(<Square testId={testId} onClick={() => {}} />)

	const square = screen.getByTestId(testId)

	expect(square.className.length).toEqual(0)
})

test('calls onCLick handler on click', () => {
	const testId = '0'
	const handleClick = jest.fn()
	render(<Square testId={testId} onClick={handleClick} />)
	const square = screen.getByTestId(testId)

	userEvent.click(square)

	expect(handleClick).toHaveBeenCalledTimes(1)
})
