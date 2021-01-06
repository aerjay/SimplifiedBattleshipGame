import React from 'react'
import Board from './Board'
import PropTypes from 'prop-types'

class Player extends React.Component {
	handleShipHasSunk = () => {
		this.props.onPlayerHasLost(this.props.name)
	};

	handleEnemyEndOfTurn = () => {
		this.props.onEnemyEndOfTurn(this.props.name)
	};

	handleShipPlacement = () => {
		this.props.onPlayerShipPlacement(this.props.name)
	};

	render () {
		return (
			<div className={'game-board ' + this.props.customStyle}>
				<h3>{this.props.name}</h3>
				<Board
					onShipHasSunk={this.handleShipHasSunk}
					onEnemyEndOfTurn={this.handleEnemyEndOfTurn}
					onShipPlacement={this.handleShipPlacement}
				/>
			</div>
		)
	}
}

Player.propTypes = {
	name: PropTypes.string.isRequired,
	customStyle: PropTypes.string,
	onPlayerHasLost: PropTypes.func.isRequired,
	onEnemyEndOfTurn: PropTypes.func.isRequired,
	onPlayerShipPlacement: PropTypes.func.isRequired
}

Player.defaultProps = {
	customStyle: ''
}

export default Player
