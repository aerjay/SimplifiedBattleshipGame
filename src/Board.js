import React from 'react'
import Square from './Square'
import PropTypes from 'prop-types'

const BOARD_SIZE = 10
const BOARD_A_CHAR_CODE = 'A'.charCodeAt()
const SHIP_SIZE = 3
const MARKER_TYPE_EMPTY = 'none'
const MARKER_TYPE_SHIP = 'ship'
const MARKER_TYPE_HIT = 'hit'
const MARKER_TYPE_MISS = 'miss'

class Board extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			grid: this.initGrid(),
			clickedSquares: [],
			hasShipPlaced: false,
			hasShipSunk: false
		}
	}

	initGrid () {
		const grid = new Map()

		for (let x = BOARD_A_CHAR_CODE; x < BOARD_A_CHAR_CODE + BOARD_SIZE; x++) {
			for (let y = 1; y <= BOARD_SIZE; y++) {
				grid.set(`${String.fromCharCode(x)}${y.toString()}`, MARKER_TYPE_EMPTY)
			}
		}
		return grid
	}

	handleClick (x, y) {
		const clickedSquares = this.state.clickedSquares.slice()
		const grid = new Map(this.state.grid)
		let hasShipSunk = this.state.hasShipSunk
		let hasShipPlaced = this.state.hasShipPlaced
		let hasEnemyAttackEnded = false

		if (hasShipSunk) {
			return
		}

		if (!hasShipPlaced) {
			this.placeShipOnBoard(clickedSquares, x, y, grid)
		} else {
			if (grid.get(x + y) === MARKER_TYPE_SHIP) {
				grid.set(x + y, MARKER_TYPE_HIT)
				hasShipSunk = clickedSquares.every(
					(val) => grid.get(val.x + val.y) === MARKER_TYPE_HIT
				)
				hasEnemyAttackEnded = true
			} else if (grid.get(x + y) === MARKER_TYPE_EMPTY) {
				grid.set(x + y, MARKER_TYPE_MISS)
				hasEnemyAttackEnded = true
			}
		}

		if (!hasShipPlaced && clickedSquares.length === SHIP_SIZE) {
			hasShipPlaced = true
			this.props.onShipPlacement()
		}

		if (hasShipSunk) {
			this.props.onShipHasSunk()
		}

		if (hasEnemyAttackEnded) {
			this.props.onEnemyEndOfTurn()
		}

		this.setState({
			grid: grid,
			clickedSquares: clickedSquares,
			hasShipPlaced: hasShipPlaced,
			hasShipSunk: hasShipSunk
		})
	}

	placeShipOnBoard (clickedSquares, x, y, grid) {
		if (clickedSquares.length === 0) {
			clickedSquares.push({ x, y })
			grid.set(x + y, MARKER_TYPE_SHIP)
		}

		if (
			clickedSquares.length < SHIP_SIZE &&
			!clickedSquares.some((val) => val.x === x && val.y === y)
		) {
			if (
				clickedSquares.every((val) => val.y === y) &&
				clickedSquares.some(
					(val) =>
						val.x.charCodeAt() - x.charCodeAt() === 1 ||
						val.x.charCodeAt() - x.charCodeAt() === -1
				)
			) {
				clickedSquares.push({ x: x, y: y })
				grid.set(x + y, MARKER_TYPE_SHIP)
			} else if (
				clickedSquares.every((val) => val.x === x) &&
				clickedSquares.some((val) => val.y - y === 1 || val.y - y === -1)
			) {
				clickedSquares.push({ x: x, y: y })
				grid.set(x + y, MARKER_TYPE_SHIP)
			}
		}
	}

	renderSquare (x, y) {
		const marker = this.state.grid.get(x + y)

		if (!this.props.showShipMarker && marker === MARKER_TYPE_SHIP) {
			return (
				<Square
					key={x + y}
					testId={x + y}
					customStyle={''}
					onClick={() => this.handleClick(x, y)}
				/>
			)
		}

		return (
			<Square
				key={x + y}
				testId={x + y}
				customStyle={marker}
				onClick={() => this.handleClick(x, y)}
			/>
		)
	}

	render () {
		const grid = []
		let rows = []

		for (let y = 1; y <= BOARD_SIZE; y++) {
			rows = []
			for (let x = BOARD_A_CHAR_CODE; x < BOARD_A_CHAR_CODE + BOARD_SIZE; x++) {
				rows.push(this.renderSquare(String.fromCharCode(x), y))
			}
			grid.push(
				<div key={y} className="board-row">
					{rows}
				</div>
			)
		}

		return (
			<div className="container">
				<div className="column-label">
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
				<div className="row-label">
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
				<div className="grid">{grid}</div>
			</div>
		)
	}
}

Board.propTypes = {
	showShipMarker: PropTypes.bool.isRequired,
	onShipHasSunk: PropTypes.func.isRequired,
	onEnemyEndOfTurn: PropTypes.func.isRequired,
	onShipPlacement: PropTypes.func.isRequired
}

export default Board
