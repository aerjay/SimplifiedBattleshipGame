import React, { useState } from 'react'
import Player from './Player'

const PLAYER_ONE_NAME = 'Player 1'
const PLAYER_TWO_NAME = 'Player 2'

function Game () {
	const [whoWon, setWhoWon] = useState('')
	const [whoseTurn, setWhoseTurn] = useState(PLAYER_ONE_NAME)
	const [shipsOnBoard, setShipsOnBoard] = useState(
		new Map([
			[PLAYER_ONE_NAME, false],
			[PLAYER_TWO_NAME, false]
		])
	)

	function handleEnemyEndOfTurn (playerName) {
		setWhoseTurn(playerName)
	}

	function handlePlayerHasLost (playerName) {
		const winner = playerName === PLAYER_ONE_NAME ? PLAYER_TWO_NAME : PLAYER_ONE_NAME

		setWhoWon(winner)
	}

	function handlePlayerShipPlacement (playerName) {
		const whoseTurn = playerName === PLAYER_ONE_NAME ? PLAYER_TWO_NAME : PLAYER_ONE_NAME
		const shipsOnBoardCopy = new Map(shipsOnBoard)

		shipsOnBoardCopy.set(playerName, true)
		setWhoseTurn(whoseTurn)
		setShipsOnBoard(shipsOnBoardCopy)
	}

	function renderAPlayer (name, hideBoard, showShipOnBoard, unclickableBoard = false) {
		let customStyle = hideBoard ? 'hide-board' : ''
		customStyle = unclickableBoard ? `${customStyle} unclickable-board` : customStyle

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

	function renderGameInfo (info, onWin = false) {
		if (!onWin) {
			return (
				<div key="info" className="split-child-container">
					<p className="text-center">{info}</p>
				</div>
			)
		}

		return (
			<div key="info" className="split-child-container">
				<p className="text-center">{info}</p>
				<button className="reset-button" onClick={() => window.location.reload()}>
					Play again!
				</button>
			</div>
		)
	}

	function renderGame () {
		const shipsOnBoardValues = [...shipsOnBoard.values()]
		const gameParts = new Array(3)

		if (!whoWon) {
			if (shipsOnBoardValues.every((val) => val === true)) {
				if (whoseTurn === PLAYER_ONE_NAME) {
					gameParts.push(renderAPlayer(PLAYER_ONE_NAME, true, false))
					gameParts.push(renderGameInfo(`${PLAYER_ONE_NAME} attack ${PLAYER_TWO_NAME} by clicking any square.`))
					gameParts.push(renderAPlayer(PLAYER_TWO_NAME, false, false))
				} else {
					gameParts.push(renderAPlayer(PLAYER_ONE_NAME, false, false))
					gameParts.push(renderGameInfo(`${PLAYER_TWO_NAME} attack ${PLAYER_ONE_NAME} by clicking any square.`))
					gameParts.push(renderAPlayer(PLAYER_TWO_NAME, true, false))
				}
			} else {
				if (whoseTurn === PLAYER_ONE_NAME) {
					gameParts.push(renderAPlayer(PLAYER_ONE_NAME, false, true))
					gameParts.push(renderGameInfo(`${PLAYER_ONE_NAME} place your ship on board by clicking 3 adjacent squares horizontally or vertically.`))
					gameParts.push(renderAPlayer(PLAYER_TWO_NAME, true, true))
				} else {
					gameParts.push(renderAPlayer(PLAYER_ONE_NAME, true, true))
					gameParts.push(renderGameInfo(`${PLAYER_TWO_NAME} place your ship on board by clicking 3 adjacent squares horizontally or vertically.`))
					gameParts.push(renderAPlayer(PLAYER_TWO_NAME, false, true))
				}
			}
		} else {
			gameParts.push(renderAPlayer(PLAYER_ONE_NAME, false, true, true))
			const opponent = whoWon === PLAYER_ONE_NAME ? PLAYER_TWO_NAME : PLAYER_ONE_NAME
			gameParts.push(renderGameInfo(`Congratulations ${whoWon}!! You sunk ${opponent}'s ship.`, true))
			gameParts.push(renderAPlayer(PLAYER_TWO_NAME, false, true, true))
		}

		return gameParts
	}

	return <div className="split">{renderGame()}</div>
}

export default Game
