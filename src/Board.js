import React, { useState } from 'react'
import Square from './Square'
import PropTypes from 'prop-types'

const BOARD_SIZE = 10
const BOARD_A_CHAR_CODE = 'A'.charCodeAt()
const SHIP_SIZE = 3
const MARKER_TYPE_EMPTY_CSS = 'none'
const MARKER_TYPE_SHIP_CSS = 'ship'
const MARKER_TYPE_HIT_CSS = 'hit'
const MARKER_TYPE_MISS_CSS = 'miss'
const ROW_LABELS = Array.from(Array(BOARD_SIZE + 1).keys()).splice(1)
const COLUMN_LABELS = Array.from(Array(BOARD_SIZE).keys()).map((elem) =>
	String.fromCharCode(elem + BOARD_A_CHAR_CODE)
)

function Board (props) {
	const [grid, setGrid] = useState(initGrid())
	const [clickedAdjSquares, setClickedAdjSquares] = useState([])
	const [hasShipPlaced, setHasShipPlaced] = useState(false)
	const [hasShipSunk, setHasShipSunk] = useState(false)

	return (
		<div className='board'>
			<div className='column-label'>
				{COLUMN_LABELS.map((elem) => (
					<div key={elem}>{elem}</div>
				))}
			</div>
			<div>
				<div className='grid'>{renderGrid()}</div>
				<div className='row-label'>
					{ROW_LABELS.map((elem) => (
						<div key={elem}>{elem}</div>
					))}
				</div>
			</div>
		</div>
	)

	function initGrid () {
		const grid = new Map()

		ROW_LABELS.forEach((row) => {
			COLUMN_LABELS.forEach((col) => {
				grid.set(col + row, MARKER_TYPE_EMPTY_CSS)
			})
		})

		return grid
	}

	function handleClick (x, y) {
		const clickedAdjSquaresCopy = clickedAdjSquares.slice()
		const gridCopy = new Map(grid)
		let hasShipJustSunk = hasShipSunk
		let hasEnemyAttackEnded = false

		if (hasShipSunk) return

		if (!hasShipPlaced) {
			placeShipOnBoard(clickedAdjSquaresCopy, x, y, gridCopy)
		} else {
			if (gridCopy.get(x + y) === MARKER_TYPE_SHIP_CSS) {
				gridCopy.set(x + y, MARKER_TYPE_HIT_CSS)
				hasShipJustSunk = clickedAdjSquaresCopy.every(
					(val) => gridCopy.get(val.x + val.y) === MARKER_TYPE_HIT_CSS
				)
				hasEnemyAttackEnded = true
			} else if (gridCopy.get(x + y) === MARKER_TYPE_EMPTY_CSS) {
				gridCopy.set(x + y, MARKER_TYPE_MISS_CSS)
				hasEnemyAttackEnded = true
			}
		}

		if (!hasShipPlaced && clickedAdjSquaresCopy.length === SHIP_SIZE) {
			setHasShipPlaced(true)
			props.onShipPlacement()
		}

		if (hasShipJustSunk) {
			setHasShipSunk(hasShipJustSunk)
			props.onShipHasSunk()
		}

		if (hasEnemyAttackEnded) props.onEnemyEndOfTurn()

		setGrid(gridCopy)
		setClickedAdjSquares(clickedAdjSquaresCopy)
	}

	function placeShipOnBoard (clickedAdjSquares, x, y, grid) {
		if (clickedAdjSquares.length === 0) {
			clickedAdjSquares.push({ x, y })
			grid.set(x + y, MARKER_TYPE_SHIP_CSS)
		}

		if (
			clickedAdjSquares.length < SHIP_SIZE &&
			!clickedAdjSquares.some((val) => val.x === x && val.y === y)
		) {
			if (
				clickedAdjSquares.every((val) => val.y === y) &&
				clickedAdjSquares.some(
					(val) =>
						val.x.charCodeAt() - x.charCodeAt() === 1 ||
						val.x.charCodeAt() - x.charCodeAt() === -1
				)
			) {
				clickedAdjSquares.push({ x: x, y: y })
				grid.set(x + y, MARKER_TYPE_SHIP_CSS)
			} else if (
				clickedAdjSquares.every((val) => val.x === x) &&
				clickedAdjSquares.some((val) => val.y - y === 1 || val.y - y === -1)
			) {
				clickedAdjSquares.push({ x: x, y: y })
				grid.set(x + y, MARKER_TYPE_SHIP_CSS)
			}
		}
	}

	function renderSquare (x, y) {
		const marker = grid.get(x + y)

		if (!props.showShipMarker && marker === MARKER_TYPE_SHIP_CSS) {
			return (
				<Square
					key={x + y}
					testId={x + y}
					customStyle={''}
					onClick={() => handleClick(x, y)}
				/>
			)
		}

		return (
			<Square
				key={x + y}
				testId={x + y}
				customStyle={marker}
				onClick={() => handleClick(x, y)}
			/>
		)
	}

	function renderGrid () {
		const grid = []
		let aRow = []

		ROW_LABELS.forEach((row, rowIndex) => {
			aRow = []
			COLUMN_LABELS.forEach((col) => {
				aRow.push(renderSquare(col, row))
			})
			grid.push(
				<div key={rowIndex} className='grid-row'>
					{aRow}
				</div>
			)
		})

		return grid
	}
}

Board.propTypes = {
	showShipMarker: PropTypes.bool.isRequired,
	onShipHasSunk: PropTypes.func.isRequired,
	onEnemyEndOfTurn: PropTypes.func.isRequired,
	onShipPlacement: PropTypes.func.isRequired
}

export default Board
