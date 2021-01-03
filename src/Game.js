import React from 'react'
import './Game.css'
import Player from './Player'

const PLAYER_ONE_NAME = 'Player 1'
const PLAYER_TWO_NAME = 'Player 2'

class Game extends React.Component {
	handlePlayerHasLost (playerName) {
		const winner = (playerName === PLAYER_ONE_NAME) ? PLAYER_TWO_NAME : PLAYER_ONE_NAME
		console.log('You lost ' + playerName)
		console.log('Congratulations ' + winner)
	}

	render () {
		return (
			<div className="game">
				<Player name={PLAYER_ONE_NAME} onPlayerHasLost={this.handlePlayerHasLost}/>
				<Player name={PLAYER_TWO_NAME} onPlayerHasLost={this.handlePlayerHasLost}/>
			</div>
		)
	}
}

export default Game
