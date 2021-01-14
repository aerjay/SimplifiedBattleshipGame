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
const COLUMN_RANGE = Array.from(Array(BOARD_SIZE).keys()).map((elem) =>
	String.fromCharCode(elem + BOARD_A_CHAR_CODE)
)

function Board ({ onClickSquare, onShipHasSunk, onPlaceShip, showShip }) {
	function formatGridSquareName (col, row) {
		return `${col}${row}`
	}

	function setGridSquare (g, col, row, value) {
		g.set(formatGridSquareName(col, row), value)
	}

	function getGridSquare (g, col, row) {
		return g.get(formatGridSquareName(col, row))
	}

	function initGrid () {
		const grid = new Map()

		ROW_RANGE.forEach((row) =>
			COLUMN_RANGE.forEach((col) =>
				setGridSquare(grid, col, row, MARKER_TYPE_EMPTY)
			)
		)

		return grid
	}

	const [grid, setGrid] = useState(initGrid())
	const [shipLocation, setShipLocation] = useState([])
	const [isShipPlaced, setIsShipPlaced] = useState(false)

	function placeShipSquareOnBoard (placedShipSquares, grid, col, row) {
		if (placedShipSquares.length === 0) {
			placedShipSquares.push({ col, row })
			setGridSquare(grid, col, row, MARKER_TYPE_SHIP)
			return
		}

		const canPlace =
			placedShipSquares.length < SHIP_SIZE &&
			!placedShipSquares.some((val) => val.row === row && val.col === col)

		const isPlacedHorizontally =
			placedShipSquares.every((val) => val.row === row) &&
			placedShipSquares.some(
				(val) =>
					val.col.charCodeAt() - col.charCodeAt() === 1 ||
					val.col.charCodeAt() - col.charCodeAt() === -1
			)

		const isPlacedVertically =
			placedShipSquares.every((val) => val.col === col) &&
			placedShipSquares.some(
				(val) => val.row - row === 1 || val.row - row === -1
			)

		if (canPlace && (isPlacedVertically || isPlacedHorizontally)) {
			placedShipSquares.push({ col, row })
			setGridSquare(grid, col, row, MARKER_TYPE_SHIP)
		}
	}

	function placeShip (ship, g, col, row) {
		placeShipSquareOnBoard(ship, g, col, row)

		if (ship.length === SHIP_SIZE) {
			setIsShipPlaced(true)
			onPlaceShip()
		}

		setShipLocation(ship)
	}

	function attackShip (ship, g, col, row) {
		let hasShipJustSunk = false
		let hasAttacked = false

		if (getGridSquare(g, col, row) === MARKER_TYPE_SHIP) {
			hasAttacked = true
			setGridSquare(g, col, row, MARKER_TYPE_HIT)
			hasShipJustSunk = ship.every(
				(val) => getGridSquare(g, val.col, val.row) === MARKER_TYPE_HIT
			)
		} else if (getGridSquare(g, col, row) === MARKER_TYPE_EMPTY) {
			hasAttacked = true
			setGridSquare(g, col, row, MARKER_TYPE_MISS)
		}

		if (hasAttacked && !hasShipJustSunk) {
			onClickSquare()
		}

		if (hasShipJustSunk) {
			onShipHasSunk()
		}
	}

	function handleClickSquare (col, row) {
		const shipLocationCopy = [...shipLocation]
		const gridCopy = new Map(grid)

		if (!isShipPlaced) {
			placeShip(shipLocationCopy, gridCopy, col, row)
		} else {
			attackShip(shipLocationCopy, gridCopy, col, row)
		}

		setGrid(gridCopy)
	}

	function renderSquare (col, row) {
		const marker = getGridSquare(grid, col, row)
		const squareClassName =
			!showShip && marker === MARKER_TYPE_SHIP ? '' : marker

		return (
			<Square
				key={formatGridSquareName(col, row)}
				testId={formatGridSquareName(col, row)}
				className={squareClassName}
				onClick={() => handleClickSquare(col, row)}
			/>
		)
	}

	function renderGrid () {
		const grid = []
		let aRow = []

		ROW_RANGE.forEach((row, rowIndex) => {
			aRow = []
			COLUMN_RANGE.forEach((col) => {
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
				{COLUMN_RANGE.map((elem) => (
					<div key={elem}>{elem}</div>
				))}
			</div>
			<div>
				<div className="grid">{renderGrid()}</div>
				<div className="row-label">
					{ROW_RANGE.map((elem) => (
						<div key={elem}>{elem}</div>
					))}
				</div>
			</div>
		</div>
	)
}

Board.propTypes = {
	showShip: PropTypes.bool.isRequired,
	onShipHasSunk: PropTypes.func.isRequired,
	onClickSquare: PropTypes.func.isRequired,
	onPlaceShip: PropTypes.func.isRequired
}

export default Board
