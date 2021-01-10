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
const CONTAINER_NAME_CSS = 'board'
const COLUMN_LABEL_CSS = 'column-label'
const ROW_LABEL_CSS = 'row-label'
const GRID_CSS = 'grid'
const GRID_ROW_CSS = 'grid-row'

function Board (props) {
	const [grid, setGrid] = useState(initGrid())
	const [clickedAdjSquares, setClickedAdjSquares] = useState([])
	const [hasShipPlaced, setHasShipPlaced] = useState(false)
	const [hasShipSunk, setHasShipSunk] = useState(false)

	return (
		<div className={CONTAINER_NAME_CSS}>
			<div className={COLUMN_LABEL_CSS}>
				<div>1</div>
				<div>2</div>
				<div>3</div>
				<div>4</div>
				<div>5</div>
				<div>6</div>
				<div>7</div>
				<div>8</div>
				<div>9</div>
				<div>10</div>
			</div>
			<div className={ROW_LABEL_CSS}>
				<div>A</div>
				<div>B</div>
				<div>C</div>
				<div>D</div>
				<div>E</div>
				<div>F</div>
				<div>G</div>
				<div>H</div>
				<div>I</div>
				<div>J</div>
			</div>
			<div className={GRID_CSS}>{renderGrid()}</div>
		</div>
	)

	function initGrid () {
		const grid = new Map()

		for (let x = BOARD_A_CHAR_CODE; x < BOARD_A_CHAR_CODE + BOARD_SIZE; x++) {
			for (let y = 1; y <= BOARD_SIZE; y++) {
				grid.set(
					`${String.fromCharCode(x)}${y.toString()}`,
					MARKER_TYPE_EMPTY_CSS
				)
			}
		}
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
		let rows = []

		for (let y = 1; y <= BOARD_SIZE; y++) {
			rows = []
			for (let x = BOARD_A_CHAR_CODE; x < BOARD_A_CHAR_CODE + BOARD_SIZE; x++) {
				rows.push(renderSquare(String.fromCharCode(x), y))
			}
			grid.push(
				<div key={y} className={GRID_ROW_CSS}>
					{rows}
				</div>
			)
		}
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
