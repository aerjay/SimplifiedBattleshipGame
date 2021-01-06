import React from 'react'
import './Game.css'
import Player from './Player'

const PLAYER_ONE_NAME = 'Player 1'
const PLAYER_TWO_NAME = 'Player 2'

class Game extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			gameOver: false,
			whoseTurn: PLAYER_ONE_NAME,
			shipsOnBoard: new Map([
				[PLAYER_ONE_NAME, false],
				[PLAYER_TWO_NAME, false]
			])
		}
	}

	handleEnemyEndOfTurn = (playerName) => {
		console.log('Your turn ' + playerName)
		this.setState({ whoseTurn: playerName })
	};

	handlePlayerHasLost = (playerName) => {
		const winner =
			playerName === PLAYER_ONE_NAME ? PLAYER_TWO_NAME : PLAYER_ONE_NAME
		console.log('You lost ' + playerName)
		console.log('Congratulations ' + winner)

		this.setState({ gameOver: true })
	};

	handlePlayerShipPlacement = (playerName) => {
		const whoseTurn =
			playerName === PLAYER_ONE_NAME ? PLAYER_TWO_NAME : PLAYER_ONE_NAME
		const shipsOnBoard = new Map(this.state.shipsOnBoard)
		shipsOnBoard.set(playerName, true)
		this.setState({ whoseTurn: whoseTurn, shipsOnBoard: shipsOnBoard })
	};

	renderPlayer (name, hideBoard, showShipOnBoard) {
		return (
			<Player
				key={name}
				name={name}
				customStyle={hideBoard ? 'hide-board' : ''}
				showShipOnBoard={showShipOnBoard}
				onPlayerHasLost={this.handlePlayerHasLost}
				onEnemyEndOfTurn={this.handleEnemyEndOfTurn}
				onPlayerShipPlacement={this.handlePlayerShipPlacement}
			/>
		)
	}

	render () {
		const shipsOnBoard = [...this.state.shipsOnBoard.values()]
		const players = new Array(2)

		if (shipsOnBoard.every((val) => val === true)) {
			if (this.state.whoseTurn === PLAYER_ONE_NAME) {
				players.push(this.renderPlayer(PLAYER_ONE_NAME, true, false))
				players.push(this.renderPlayer(PLAYER_TWO_NAME, false, false))
			} else {
				players.push(this.renderPlayer(PLAYER_ONE_NAME, false, false))
				players.push(this.renderPlayer(PLAYER_TWO_NAME, true, false))
			}
		} else {
			if (this.state.whoseTurn === PLAYER_ONE_NAME) {
				players.push(this.renderPlayer(PLAYER_ONE_NAME, false, true))
				players.push(this.renderPlayer(PLAYER_TWO_NAME, true, true))
			} else {
				players.push(this.renderPlayer(PLAYER_ONE_NAME, true, true))
				players.push(this.renderPlayer(PLAYER_TWO_NAME, false, true))
			}
		}

		return <div className="game">{players}</div>
	}
}

export default Game
