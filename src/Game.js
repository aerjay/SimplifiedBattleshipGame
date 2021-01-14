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
		const isBoardReady = [...shipsOnBoardCopy.values()].every(
			(val) => val === true
		)

		isBoardReady
			? setCurrentBoardToShow(currentPlayer)
			: setCurrentBoardToShow(opponent)
		setCurrentPlayer(opponent)
		setShipsOnBoard(shipsOnBoardCopy)
	}

	function renderGameInfo () {
		const playerColorClassName =
			currentPlayer === PLAYER_ONE_NAME ? 'orange' : 'purple'
		let info = ''
		if (winner) {
			info = `Congratulations ${winner}!! You sunk ${opponent}'s ship.`
		} else if (isBoardReady) {
			info = `Attack ${opponent} by clicking any square.`
		} else {
			info =
				'Place your ship on board by clicking 3 adjacent squares horizontally or vertically.'
		}

		return (
			<div className="game-info">
				{!winner && (
					<h4
						className={`text-center ${playerColorClassName}`}
					>{`${currentPlayer}'s Turn`}</h4>
				)}
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
		let boardContainerClassName = currentBoardToShow.includes(playerName)
			? ''
			: 'hidden'
		boardContainerClassName = winner
			? `${boardContainerClassName} unclickable`
			: boardContainerClassName

		return (
			<div className={boardContainerClassName}>
				<h3 className="text-center">{`${playerName}'s Board`}</h3>
				<Board
					showShip={!!winner || !isBoardReady}
					onShipHasSunk={handlePlayerHasLost}
					onClickSquare={handleEndOfTurn}
					onPlaceShip={handlePlacePlayerShip}
				/>
			</div>
		)
	}

	return (
		<div className="split">
			<div className="split-child-container">
				{renderGameInfo()}
				{renderPlayerBoard(PLAYER_ONE_NAME)}
				{renderPlayerBoard(PLAYER_TWO_NAME)}
			</div>
		</div>
	)
}

export default Game
