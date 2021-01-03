import React from 'react'
import Board from './Board'
import PropTypes from 'prop-types'

class Player extends React.Component {
	handleShipHasSunk = () => {
		this.props.onPlayerHasLost(this.props.name)
	}

	render () {
		return (
			<div className="game-board">
				<h3>{this.props.name}</h3>
				<Board onShipHasSunk={this.handleShipHasSunk}/>
			</div>
		)
	}
}

Player.propTypes = {
	name: PropTypes.string,
	onPlayerHasLost: PropTypes.func
}

export default Player
