import React from 'react'
import './Player.css'
import Board from './Board'

class Player extends React.Component {
	render () {
		return (
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
			</div>
		)
	}
}

export default Player
