import React from 'react'
import Board from './Board'
import PropTypes from 'prop-types'

const CONTAINER_NAME_CSS = 'player-container'

function Player (props) {
	const handleShipHasSunk = () => {
		props.onPlayerHasLost(props.name)
	}

	const handleEnemyEndOfTurn = () => {
		props.onEnemyEndOfTurn(props.name)
	}

	const handleShipPlacement = () => {
		props.onPlayerShipPlacement(props.name)
	}

	return (
		<div className={`${CONTAINER_NAME_CSS} ${props.customStyle}`}>
			<h3>{props.name}</h3>
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
