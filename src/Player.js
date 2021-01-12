import React from 'react'
import Board from './Board'
import PropTypes from 'prop-types'

function Player (props) {
	function handleShipHasSunk () {
		props.onPlayerHasLost(props.name)
	}

	function handleEnemyEndOfTurn () {
		props.onEnemyEndOfTurn(props.name)
	}

	function handleShipPlacement () {
		props.onPlayerShipPlacement(props.name)
	}

	return (
		<div className={`split-child-container ${props.customStyle}`}>
			<h3 className="text-center">{props.name}</h3>
			<Board
				showShipMarker={props.showShipOnBoard}
				onShipHasSunk={handleShipHasSunk}
				onEnemyEndOfTurn={handleEnemyEndOfTurn}
				onShipPlacement={handleShipPlacement}
			/>
		</div>
	)
}

Player.propTypes = {
	name: PropTypes.string.isRequired,
	customStyle: PropTypes.string,
	showShipOnBoard: PropTypes.bool.isRequired,
	onPlayerHasLost: PropTypes.func.isRequired,
	onEnemyEndOfTurn: PropTypes.func.isRequired,
	onPlayerShipPlacement: PropTypes.func.isRequired
}

Player.defaultProps = {
	customStyle: ''
}

export default Player
