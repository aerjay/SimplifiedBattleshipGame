import React from 'react'
import './Game.css'
import Player from './Player'

class Game extends React.Component {
	render () {
		return (
			<div className="game">
				<Player name="Player 1"/>
				<Player name="Player 2"/>
			</div>
		)
	}
}

export default Game
