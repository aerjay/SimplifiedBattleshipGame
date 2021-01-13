import React, { useState } from 'react'
import Board from './Board'

const PLAYER_ONE_NAME = 'Player 1'
const PLAYER_TWO_NAME = 'Player 2'

function Game () {
	const [winner, setWinner] = useState('')
	const [currentPlayer, setCurrentPlayer] = useState(PLAYER_ONE_NAME)
	const [currentBoardToShow, setCurrentBoardToShow] = useState(PLAYER_ONE_NAME)
	const [shipsOnBoard, setShipsOnBoard] = useState(
		new Map([
			[PLAYER_ONE_NAME, false],
			[PLAYER_TWO_NAME, false]
		])
	)

	const opponent =
		currentPlayer === PLAYER_ONE_NAME ? PLAYER_TWO_NAME : PLAYER_ONE_NAME
	const isBoardReady = [...shipsOnBoard.values()].every((val) => val === true)

	function handleEndOfTurn () {
		setCurrentBoardToShow(currentPlayer)
		setCurrentPlayer(opponent)
	}

	function handlePlayerHasLost () {
		setWinner(currentPlayer)
		setCurrentBoardToShow(`${currentPlayer} ${opponent}`)
	}

	function handlePlacePlayerShip () {
		const shipsOnBoardCopy = new Map(shipsOnBoard)
		shipsOnBoardCopy.set(currentPlayer, true)
		const isBoardReady = [...shipsOnBoardCopy.values()].every((val) => val === true)

		isBoardReady ? setCurrentBoardToShow(currentPlayer) : setCurrentBoardToShow(opponent)
		setCurrentPlayer(opponent)
		setShipsOnBoard(shipsOnBoardCopy)
	}

	function renderGameInfo () {
		let info = ''
		if (winner) {
			info = `Congratulations ${winner}!! You sunk ${opponent}'s ship.`
		} else if (isBoardReady) {
			info = `${currentPlayer} attack ${opponent} by clicking any square.`
		} else {
			info = `${currentPlayer} place your ship on board by clicking 3 adjacent squares horizontally or vertically.`
		}

		return (
			<div className="split-child-container">
				<p className="text-center">{info}</p>
				{winner && (
					<button
						className="reset-button"
						onClick={() => window.location.reload()}
					>
						Play again!
					</button>
				)}
			</div>
		)
	}

	function renderPlayerBoard (playerName) {
		let boardContainerClassName = currentBoardToShow.includes(playerName) ? '' : 'hidden'
		boardContainerClassName = winner ? `${boardContainerClassName} unclickable` : boardContainerClassName

		return (
			<div className={`split-child-container ${boardContainerClassName}`}>
				<h3 className="text-center">{playerName}</h3>
				<Board
					showShip={!!winner || !(isBoardReady)}
					onShipHasSunk={handlePlayerHasLost}
					onClickSquare={handleEndOfTurn}
					onPlaceShip={handlePlacePlayerShip}
				/>
			</div>
		)
	}

	return (
		<div className="split">
			{renderPlayerBoard(PLAYER_ONE_NAME)}
			{renderGameInfo()}
			{renderPlayerBoard(PLAYER_TWO_NAME)}
		</div>
	)
}

export default Game
