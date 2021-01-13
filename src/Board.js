import React, { useState } from "react";
import Square from "./Square";
import PropTypes from "prop-types";

const BOARD_SIZE = 10;
const BOARD_A_CHAR_CODE = "A".charCodeAt();
const SHIP_SIZE = 3;
const MARKER_TYPE_EMPTY = "none";
const MARKER_TYPE_SHIP = "ship";
const MARKER_TYPE_HIT = "hit";
const MARKER_TYPE_MISS = "miss";
const ROW_RANGE = Array.from(Array(BOARD_SIZE + 1).keys()).splice(1);
const COLUMN_RANGE = Array.from(Array(BOARD_SIZE).keys()).map((elem) =>
  String.fromCharCode(elem + BOARD_A_CHAR_CODE)
);

function Board({ onEndOfTurn, onShipHasSunk, onPlaceShip, showShipMarker }) {
  const [grid, setGrid] = useState(initGrid());
  const [shipLocation, setShipLocation] = useState([]);
  const [hasShipPlaced, setHasShipPlaced] = useState(false);
  const [invalidClick, setInvalidClick] = useState(false);

  function formatGridSquareName(col, row) {
    return `${col}${row}`;
  }

  function setGridSquare(g, col, row, value) {
    g.set(formatGridSquareName(col, row), value);
  }

  function getGridSquare(g, col, row) {
    return g.get(formatGridSquareName(col, row));
  }

  function initGrid() {
    const grid = new Map();

    ROW_RANGE.forEach((row) =>
      COLUMN_RANGE.forEach((col) =>
        setGridSquare(grid, col, row, MARKER_TYPE_EMPTY)
      )
    );

    return grid;
  }

  function placeShipSquareOnBoard(placedShipSquares, row, col, grid) {
    if (placedShipSquares.length === 0) {
      placedShipSquares.push({ row, col });
      setGridSquare(grid, col, row, MARKER_TYPE_SHIP);
      setInvalidClick(false);
      return;
    }

    const canPlace =
      placedShipSquares.length < SHIP_SIZE &&
      !placedShipSquares.some((val) => val.row === row && val.col === col);

    const isPlacedVertically =
      placedShipSquares.every((val) => val.col === col) &&
      placedShipSquares.some(
        (val) =>
          val.row.charCodeAt() - row.charCodeAt() === 1 ||
          val.row.charCodeAt() - row.charCodeAt() === -1
      );

    const isPlacedHorizontally =
      placedShipSquares.every((val) => val.row === row) &&
      placedShipSquares.some(
        (val) => val.col - col === 1 || val.col - col === -1
      );

    if (canPlace && (isPlacedVertically || isPlacedHorizontally)) {
      placedShipSquares.push({ row, col });
      setGridSquare(grid, col, row, MARKER_TYPE_SHIP);
      setInvalidClick(false);
    } else {
      setInvalidClick(true);
    }
  }

  function handleClick(row, col) {
    const shipLocationCopy = shipLocation.slice();
    const gridCopy = new Map(grid);
    let hasShipJustSunk = false;
    let hasEnemyAttackEnded = false;

    if (!hasShipPlaced) {
      placeShipSquareOnBoard(shipLocationCopy, row, col, gridCopy);
    } else {
      if (getGridSquare(gridCopy, col, row) === MARKER_TYPE_SHIP) {
        setGridSquare(gridCopy, col, row, MARKER_TYPE_HIT);
        hasShipJustSunk = shipLocationCopy.every(
          (val) => getGridSquare(gridCopy, val.y, val.x) === MARKER_TYPE_HIT
        );
        hasEnemyAttackEnded = true;
        setInvalidClick(false);
      } else if (getGridSquare(gridCopy, col, row) === MARKER_TYPE_EMPTY) {
        setGridSquare(gridCopy, col, row, MARKER_TYPE_MISS);
        hasEnemyAttackEnded = true;
        setInvalidClick(false);
      } else {
        setInvalidClick(true);
      }
    }

    if (!hasShipPlaced && shipLocationCopy.length === SHIP_SIZE) {
      setHasShipPlaced(true);
      onPlaceShip();
    }

    if (hasShipJustSunk) {
      onShipHasSunk();
    }

    if (hasEnemyAttackEnded) onEndOfTurn();

    setGrid(gridCopy);
    setShipLocation(shipLocationCopy);
  }

  function renderSquare(row, col) {
    const marker = getGridSquare(grid, col, row);
    return (
      <Square
        key={formatGridSquareName(col, row)}
        testId={formatGridSquareName(col, row)}
        className={!showShipMarker && marker === MARKER_TYPE_SHIP ? "" : marker}
        onClick={() => handleClick(row, col)}
      />
    );
  }

  function renderGrid() {
    const grid = [];
    let aRow = [];

    ROW_RANGE.forEach((row, rowIndex) => {
      aRow = [];
      COLUMN_RANGE.forEach((col) => {
        aRow.push(renderSquare(col, row));
      });
      grid.push(
        <div key={rowIndex} className="grid-row">
          {aRow}
        </div>
      );
    });

    return grid;
  }

  return (
    <div className="board">
      <div className="column-label">
        {COLUMN_RANGE.map((elem) => (
          <div key={elem}>{elem}</div>
        ))}
      </div>
      <div>
        <div className={`grid ${invalidClick ? "invalid-click" : ""}`}>
          {renderGrid()}
        </div>
        <div className="row-label">
          {ROW_RANGE.map((elem) => (
            <div key={elem}>{elem}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

Board.propTypes = {
  showShipMarker: PropTypes.bool.isRequired,
  onShipHasSunk: PropTypes.func.isRequired,
  onEnemyEndOfTurn: PropTypes.func.isRequired,
  onPlaceShip: PropTypes.func.isRequired,
};

export default Board;
