import React from 'react'
import Square from './Square'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

test('renders a square with passed properties', () => {
	const testId = '0'
	const value = 'value'
	render(<Square testId={testId} value={value} />)

	const square = screen.getByTestId(testId)

	expect(square).toHaveClass('square')
	expect(square).toHaveClass(value)
})

test('calls onCLick handler on click', () => {
	const testId = '0'
	const onClickHandler = jest.fn()
	render(<Square testId={testId} onClick={onClickHandler} />)
	const square = screen.getByTestId(testId)

	userEvent.click(square)

	expect(onClickHandler).toHaveBeenCalledTimes(1)
})
