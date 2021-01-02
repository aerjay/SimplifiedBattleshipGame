import React from 'react'
import './Game.css'
import Player from './Player'

class Game extends React.Component {
	render () {
		return (
			<div className="game">
				<Player name="Player 1"/>
			</div>
		)
	}
}

export default Game
