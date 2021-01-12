import React, { useState } from 'react'
import Player from './Player'

const PLAYER_ONE_NAME = 'Player 1'
const PLAYER_TWO_NAME = 'Player 2'

function Game () {
	const [gameOver, setGameOver] = useState(false)
	const [whoseTurn, setWhoseTurn] = useState(PLAYER_ONE_NAME)
	const [shipsOnBoard, setShipsOnBoard] = useState(
		new Map([
			[PLAYER_ONE_NAME, false],
			[PLAYER_TWO_NAME, false]
		])
	)

	const handleEnemyEndOfTurn = (playerName) => {
		console.log('Your turn ' + playerName) // TODO: Remove these

		setWhoseTurn(playerName)
	}

	const handlePlayerHasLost = (playerName) => {
		const winner =
			playerName === PLAYER_ONE_NAME ? PLAYER_TWO_NAME : PLAYER_ONE_NAME

		console.log('You lost ' + playerName)
		console.log('Congratulations ' + winner)
		setGameOver(true)
	}

	const handlePlayerShipPlacement = (playerName) => {
		const whoseTurn =
			playerName === PLAYER_ONE_NAME ? PLAYER_TWO_NAME : PLAYER_ONE_NAME
		const shipsOnBoardCopy = new Map(shipsOnBoard)

		shipsOnBoardCopy.set(playerName, true)
		setWhoseTurn(whoseTurn)
		setShipsOnBoard(shipsOnBoardCopy)
	}

	// Add another div for game-info in middle, use arr.splice(1, 0, 'item to add');
	return <div className='split'>{renderPlayers()}</div>

	function renderPlayers () {
		const shipsOnBoardValues = [...shipsOnBoard.values()]
		const players = new Array(2)

		if (!gameOver) {
			if (shipsOnBoardValues.every((val) => val === true)) {
				if (whoseTurn === PLAYER_ONE_NAME) {
					players.push(renderPlayer(PLAYER_ONE_NAME, true, false))
					players.push(renderPlayer(PLAYER_TWO_NAME, false, false))
				} else {
					players.push(renderPlayer(PLAYER_ONE_NAME, false, false))
					players.push(renderPlayer(PLAYER_TWO_NAME, true, false))
				}
			} else {
				if (whoseTurn === PLAYER_ONE_NAME) {
					players.push(renderPlayer(PLAYER_ONE_NAME, false, true))
					players.push(renderPlayer(PLAYER_TWO_NAME, true, true))
				} else {
					players.push(renderPlayer(PLAYER_ONE_NAME, true, true))
					players.push(renderPlayer(PLAYER_TWO_NAME, false, true))
				}
			}
		} else {
			// TODO: Add a win alert
			players.push(renderPlayer(PLAYER_ONE_NAME, false, true, true))
			players.push(renderPlayer(PLAYER_TWO_NAME, false, true, true))
		}

		return players
	}

	function renderPlayer (
		name,
		hideBoard,
		showShipOnBoard,
		unclickableBoard = false
	) {
		let customStyle = hideBoard ? 'hide-board' : ''
		customStyle = unclickableBoard
			? `${customStyle} unclickable-board`
			: customStyle

		return (
			<Player
				key={name}
				name={name}
				customStyle={customStyle}
				showShipOnBoard={showShipOnBoard}
				onPlayerHasLost={handlePlayerHasLost}
				onEnemyEndOfTurn={handleEnemyEndOfTurn}
				onPlayerShipPlacement={handlePlayerShipPlacement}
			/>
		)
	}
}

export default Game
