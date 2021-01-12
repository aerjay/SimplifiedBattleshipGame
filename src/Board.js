import React, { useState } from 'react'
import Square from './Square'
import PropTypes from 'prop-types'

const BOARD_SIZE = 10
const BOARD_A_CHAR_CODE = 'A'.charCodeAt()
const SHIP_SIZE = 3
const MARKER_TYPE_EMPTY = 'none'
const MARKER_TYPE_SHIP = 'ship'
const MARKER_TYPE_HIT = 'hit'
const MARKER_TYPE_MISS = 'miss'
const ROW_RANGE = Array.from(Array(BOARD_SIZE + 1).keys()).splice(1)
const COLUMN_RANGE = Array.from(Array(BOARD_SIZE).keys())
	.map(elem => String.fromCharCode(elem + BOARD_A_CHAR_CODE))

function Board (props) {
	const [grid, setGrid] = useState(initGrid())
	const [clickedAdjSquares, setClickedAdjSquares] = useState([])
	const [hasShipPlaced, setHasShipPlaced] = useState(false)
	const [hasShipSunk, setHasShipSunk] = useState(false)
	const [invalidClick, setInvalidClick] = useState(false)

	function initGrid () {
		const grid = new Map()

		ROW_RANGE.forEach(row => {
			COLUMN_RANGE.forEach(col => {
				grid.set(col + row, MARKER_TYPE_EMPTY)
			})
		})

		return grid
	}

	function handleClick (x, y) {
		const clickedAdjSqrsCp = clickedAdjSquares.slice()
		const gridCp = new Map(grid)
		let hasShipJustSunk = hasShipSunk
		let hasEnemyAttackEnded = false

		if (hasShipSunk) return

		if (!hasShipPlaced) {
			placeShipOnBoard(clickedAdjSqrsCp, x, y, gridCp)
		} else {
			if (gridCp.get(x + y) === MARKER_TYPE_SHIP) {
				gridCp.set(x + y, MARKER_TYPE_HIT)
				hasShipJustSunk = clickedAdjSqrsCp.every(val => gridCp.get(val.x + val.y) === MARKER_TYPE_HIT)
				hasEnemyAttackEnded = true
				setInvalidClick(false)
			} else if (gridCp.get(x + y) === MARKER_TYPE_EMPTY) {
				gridCp.set(x + y, MARKER_TYPE_MISS)
				hasEnemyAttackEnded = true
				setInvalidClick(false)
			} else {
				setInvalidClick(true)
			}
		}

		if (!hasShipPlaced && clickedAdjSqrsCp.length === SHIP_SIZE) {
			setHasShipPlaced(true)
			props.onShipPlacement()
		}

		if (hasShipJustSunk) {
			setHasShipSunk(hasShipJustSunk)
			props.onShipHasSunk()
		}

		if (hasEnemyAttackEnded) props.onEnemyEndOfTurn()

		setGrid(gridCp)
		setClickedAdjSquares(clickedAdjSqrsCp)
	}

	function placeShipOnBoard (clickedSqrs, x, y, grid) {
		if (clickedSqrs.length === 0) {
			clickedSqrs.push({ x, y })
			grid.set(x + y, MARKER_TYPE_SHIP)
			setInvalidClick(false)
			return
		}

		if (clickedSqrs.length < SHIP_SIZE && !clickedSqrs.some(val => val.x === x && val.y === y)) {
			if (clickedSqrs.every(val => val.y === y) &&
			clickedSqrs.some(val => val.x.charCodeAt() - x.charCodeAt() === 1 ||
			val.x.charCodeAt() - x.charCodeAt() === -1)) {
				clickedSqrs.push({ x: x, y: y })
				grid.set(x + y, MARKER_TYPE_SHIP)
				setInvalidClick(false)
			} else if (clickedSqrs.every(val => val.x === x) &&
				clickedSqrs.some(val => val.y - y === 1 || val.y - y === -1)) {
				clickedSqrs.push({ x: x, y: y })
				grid.set(x + y, MARKER_TYPE_SHIP)
				setInvalidClick(false)
			} else {
				setInvalidClick(true)
			}
		} else {
			setInvalidClick(true)
		}
	}

	function renderSquare (x, y) {
		const marker = grid.get(x + y)

		if (!props.showShipMarker && marker === MARKER_TYPE_SHIP) {
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

		ROW_RANGE.forEach((row, rowIndex) => {
			aRow = []
			COLUMN_RANGE.forEach(col => {
				aRow.push(renderSquare(col, row))
			})
			grid.push(
				<div key={rowIndex} className="grid-row">
					{aRow}
				</div>
			)
		})

		return grid
	}

	return (
		<div className="board">
			<div className="column-label">
				{COLUMN_RANGE.map(elem => (
					<div key={elem}>{elem}</div>
				))}
			</div>
			<div>
				<div className={invalidClick ? 'grid invalid-click' : 'grid'}>
					{renderGrid()}
				</div>
				<div className="row-label">
					{ROW_RANGE.map(elem => (
						<div key={elem}>{elem}</div>
					))}
				</div>
			</div>
		</div>
	)
}

Board.propTypes = {
	showShipMarker: PropTypes.bool.isRequired,
	onShipHasSunk: PropTypes.func.isRequired,
	onEnemyEndOfTurn: PropTypes.func.isRequired,
	onShipPlacement: PropTypes.func.isRequired
}

export default Board
