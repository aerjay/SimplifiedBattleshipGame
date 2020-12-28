import React from 'react'
import Board from './Board'
import { render } from '@testing-library/react'

const BOARD_SIZE = 10

test('renders all the squares', async () => {
  const { findAllByRole } = render(<Board />)

  const squares = await findAllByRole('button')

  expect(squares).toHaveLength(BOARD_SIZE * BOARD_SIZE)
  squares.forEach((square) => {
    expect(square).toHaveClass('square')
  })
})

// Valid:
// Click, horizontal and vertical
// Invalid:
// Click the same element again
// UP UP LEFT/RIGHT
// left left, up/down
// random places to click
