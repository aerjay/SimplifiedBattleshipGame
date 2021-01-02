import React from 'react'
import Board from './Board'
import PropTypes from 'prop-types'

class Player extends React.Component {
	render () {
		return (
			<div className="game-board">
				<h3>{this.props.name}</h3>
				<Board />
			</div>
		)
	}
}

Player.propTypes = {
	name: PropTypes.string
}

export default Player
