import React, { useState } from "react";
import Player from "./Player";

const PLAYER_ONE_NAME = "Player 1";
const PLAYER_TWO_NAME = "Player 2";

function Game() {
  const [winner, setWinner] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_ONE_NAME);
  const [shipsOnBoard, setShipsOnBoard] = useState(
    new Map({
      [PLAYER_ONE_NAME]: false,
      [PLAYER_TWO_NAME]: false,
    })
  );

  const opponent =
    currentPlayer === PLAYER_ONE_NAME ? PLAYER_TWO_NAME : PLAYER_ONE_NAME;
  const isBoardReady = shipsOnBoard.values().every((val) => val === true);

  function handleEndOfTurn() {
    setCurrentPlayer(opponent);
  }

  function handlePlayerHasLost() {
    const winner =
      playerName === PLAYER_ONE_NAME ? PLAYER_TWO_NAME : PLAYER_ONE_NAME;

    setWinner(winner);
  }

  function handlePlacePlayerShip() {
    const currentPlayer =
      playerName === PLAYER_ONE_NAME ? PLAYER_TWO_NAME : PLAYER_ONE_NAME;
    const shipsOnBoardCopy = new Map(shipsOnBoard);

    shipsOnBoardCopy.set(playerName, true);
    setCurrentPlayer(currentPlayer);
    setShipsOnBoard(shipsOnBoardCopy);
  }

  function renderGameInfo() {
    let info = "";
    if (!!winner) {
      info = `Congratulations ${currentPlayer}!! You sunk ${opponent}'s ship.`;
    } else if (isBoardReady) {
      info = `${currentPlayer} attack ${opponent} by clicking any square.`;
    } else {
      info = `${currentPlayer} place your ship on board by clicking 3 adjacent squares horizontally or vertically.`;
    }

    return (
      <div key="info" className="split-child-container">
        <p className="text-center">{info}</p>
        {onWin && (
          <button
            className="reset-button"
            onClick={() => window.location.reload()}
          >
            Play again!
          </button>
        )}
      </div>
    );
  }

  let boardContainerClassName = hideBoard ? "hidden" : "";
  boardContainerClassName = unclickableBoard
    ? `${boardContainerClassName} unclickable`
    : boardContainerClassName;

  return (
    <div className="split">
      {renderGameInfo()}
      <div className={`split-child-container ${boardContainerClassName}`}>
        <h3 className="text-center">{currentPlayer}</h3>
        <Board
          currentPlayer={currentPlayer}
          showShipMarker={!!winner || !isBoardReady}
          onShipHasSunk={handlePlayerHasLost}
          onEndOfTurn={handleEndOfTurn}
          onPlaceShip={handlePlacePlayerShip}
        />
      </div>
    </div>
  );
}

export default Game;
