"use strict";

const BOARD_SIZE = 10;
const BOARD_SQUARE_SIZE = 50;
const BOARD_TOP_OFFSET = 50;
const BOARD_A_CHAR_CODE = 65;

const MARKER_TYPE_EMPTY = 0;
const MARKER_TYPE_SHIP = 1;
const MARKER_TYPE_HIT = 2;
const MARKER_TYPE_MISS = 3;

const PLAYER_ONE = "Player 1";
const PLAYER_TWO = "Player 2";
const PLAYER_ONE_CANVAS = "p1";
const PLAYER_TWO_CANVAS = "p2";

const SHIP_SIZE = 3;

const ON_P2_SHIP_IS_PLACED = new Event("onP2ShipIsPlaced", { bubbles: true, cancelable: false, composed: true });
const ON_WIN = "onWin";
const ON_P2_ATTACK_P1 = "onP2AttackP1";
const ON_P1_ATTACK_P2 = "onP1AttackP2";

const P1_ATTACK_BUTTON_ID = "p1AttackButton";
const P1_OK_BUTTON_ID = "p1OkButton";
const P1_USER_INPUT_ID = "p1UserInput";
const P1_FORM_ID = "p1Form";
const P1_QUESTION_LABEL_ID = "p1QuestionLabel";
const P2_ATTACK_BUTTON_ID = "p2AttackButton";
const P2_OK_BUTTON_ID = "p2OkButton";
const P2_USER_INPUT_ID = "p2UserInput";
const P2_FORM_ID = "p2Form";
const P2_QUESTION_LABEL_ID = "p2QuestionLabel";

// Board object
class Board {
  constructor(size) {
    this.size = size;
    this.grid = new Map();
    this.init();
  }

  init() {
    for (let x = BOARD_A_CHAR_CODE; x < BOARD_A_CHAR_CODE + this.size; x++) {
      for (let y = 1; y <= this.size; y++) {
        this.grid.set(`${String.fromCharCode(x)}${y.toString()}`, MARKER_TYPE_EMPTY);
      }
    }
  }

  isCoordinateInGrid(coordinate) {
    return this.grid.has(coordinate);
  }

  getCoordinateValue(coordinate) {
    return this.grid.get(coordinate);
  }

  setCoordinateValue(coordinate, value) {
    this.grid.set(coordinate, value);
  }

  populateCoordinates(start, end) {
    let coordinates = [];

    if (!this.isCoordinateInGrid(start) || !this.isCoordinateInGrid(end))
      return coordinates;

    // Vertical
    if (start.charAt(0) === end.charAt(0)) {
      let startY = parseInt(start.slice(1));
      let endY = parseInt(end.slice(1));

      if (endY > startY) {
        coordinates.push(start);
        for (let y = startY + 1; y < endY; y++)
          coordinates.push(start.charAt(0) + y);
        coordinates.push(end);
      }
    }
    // Horizontal
    else if (start.charAt(1) === end.charAt(1)) {
      if (end.charAt(0) > start.charAt(0)) {
        coordinates.push(start);
        for (let x = start.charCodeAt(0) + 1; x < end.charCodeAt(0); x++)
          coordinates.push(String.fromCharCode(x) + start.slice(1));
        coordinates.push(end);
      }
    }

    return coordinates;
  }

  printGrid(context, printShip) {
    // Printing the x-axis labels
    for (let i = BOARD_A_CHAR_CODE; i < BOARD_A_CHAR_CODE + this.size; i++) {
      let xOffset = BOARD_TOP_OFFSET + (i - BOARD_A_CHAR_CODE) * BOARD_SQUARE_SIZE + BOARD_TOP_OFFSET / 3;
      context.fillText(String.fromCharCode(i), xOffset, BOARD_SQUARE_SIZE - BOARD_SQUARE_SIZE / 2, BOARD_SQUARE_SIZE);
    }

    // Printing the y-axis labels
    for (let i = 1; i < this.size + 1; i++) {
      let yOffset = BOARD_TOP_OFFSET / 2 + i * BOARD_SQUARE_SIZE;
      context.fillText(i.toString(), BOARD_SQUARE_SIZE / 2, yOffset, BOARD_SQUARE_SIZE);
    }

    // Printing the grid
    for (let j = 0; j < this.size; j++) {
      for (let i = 0; i < this.size; i++) {
        let xOffset = BOARD_TOP_OFFSET + j * BOARD_SQUARE_SIZE;
        let yOffset = BOARD_TOP_OFFSET + i * BOARD_SQUARE_SIZE;
        let val = this.grid.get(`${String.fromCharCode(j + BOARD_A_CHAR_CODE)}${(i + 1).toString()}`);

        if (val === MARKER_TYPE_SHIP && printShip) {
          this._printBlueBox(context, xOffset, yOffset, BOARD_SQUARE_SIZE, BOARD_SQUARE_SIZE);
        } else if (val === MARKER_TYPE_MISS) {
          this._printX(context, xOffset, yOffset);
        } else if (val === MARKER_TYPE_HIT) {
          this._printBlueBox(context, xOffset, yOffset, BOARD_SQUARE_SIZE, BOARD_SQUARE_SIZE);
          this._printX(context, xOffset, yOffset);
        }

        context.strokeRect(xOffset, yOffset, BOARD_SQUARE_SIZE, BOARD_SQUARE_SIZE);
      }
    }
    // Printing the grid border
    context.strokeRect(BOARD_TOP_OFFSET, BOARD_TOP_OFFSET, BOARD_SQUARE_SIZE * this.size, BOARD_SQUARE_SIZE * this.size);
  }

  _printBlueBox(context, x, y, width, height) {
    context.fillStyle = "	#72D3fE";
    context.fillRect(x, y, width, height);
  }

  _printX(context, x, y) {
    context.strokeStyle = "#FF0D00";
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + BOARD_TOP_OFFSET, y + BOARD_TOP_OFFSET);

    context.moveTo(x + BOARD_TOP_OFFSET, y);
    context.lineTo(x, y + BOARD_TOP_OFFSET);
    context.stroke();

    // Reset properties to default
    context.strokeStyle = "#000000";
    context.lineWidth = 1;
  }
}

// Ship object
class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  getLength() {
    return this.length;
  }

  incrementHits() {
    this.hits++;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}

// Player object
class Player {
  constructor(ship, board, name) {
    this.ship = ship;
    this.board = board;
    this.name = name;
  }

  hasLost() {
    return this.ship.isSunk();
  }

  processUserInputShipLocation(input) {
    let valid = false;

    if (input.length === 2) {
      let coordinates = this.board.populateCoordinates(input[0], input[1]);
      if (coordinates.length >= this.ship.getLength()) {
        coordinates = coordinates.slice(0, this.ship.getLength());
        this.placeShipOnBoard(coordinates);
        valid = true;
      }
    }

    return valid;
  }

  placeShipOnBoard(coordinates) {
    coordinates.forEach((element) => {
      if (this.board.getCoordinateValue(element) === MARKER_TYPE_EMPTY)
        this.board.setCoordinateValue(element, MARKER_TYPE_SHIP);
    });
  }

  handleAttack(coordinate) {
    switch (this.board.getCoordinateValue(coordinate)) {
      case MARKER_TYPE_EMPTY:
        this.board.setCoordinateValue(coordinate, MARKER_TYPE_MISS);
        break;
      case MARKER_TYPE_SHIP:
        this.board.setCoordinateValue(coordinate, MARKER_TYPE_HIT);
        this.ship.incrementHits();
        break;
    }
  }

  printBoard(printShip = true) {
    let targetCanvas = "";
    if (this.name === PLAYER_ONE)
      targetCanvas = PLAYER_ONE_CANVAS;
    else
      targetCanvas = PLAYER_TWO_CANVAS;

    let canvas = document.getElementById(targetCanvas);
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    this.board.printGrid(canvas.getContext("2d"), printShip);
  }
}

//Events handlers
function preventRefreshOnEnter(e) {
  if (e.keyCode === 13) e.preventDefault();
}

function handleWin(event) {
  //setTimeout to make sure the board will be printed before setting the confirm dialog
  setTimeout(() => {
    let value = confirm(`Congratulations ${event.detail}!! You sunk your opponent's ship.\nPress Ok to play again.`)
    if (value)
      location.reload();
  }, 0);
}

function handleOpponentAttack(player, playerFormId, opponentName, attack) {
  player.handleAttack(attack.detail);
  player.printBoard(false);

  if (player.hasLost())
    attack.target.dispatchEvent(new CustomEvent(ON_WIN, { bubbles: true, cancelable: false, composed: true, detail: opponentName }));
  else
    view.updateElemDisplay(document.getElementById(playerFormId), "flex");
}

function handleAttackButton(player, playerInputId, playerFormId, eventToDispatch, event) {
  let input = processAttackInput(player, playerInputId);
  if (input != undefined) {
    event.toElement.dispatchEvent(new CustomEvent(eventToDispatch, { bubbles: true, cancelable: false, composed: true, detail: input }));

    view.updateElemDisplay(document.getElementById(playerFormId), "none");
  }
}

// Helper functions
function processShipLocationInput(player, userInputId) {
  let valid = false;
  let input = document.getElementById(userInputId).value;
  if (input.length > 0) {
    input = input.toLocaleUpperCase().split(/(\s+)/).filter((x) => x.trim().length > 0);
    if (player.processUserInputShipLocation(input)) {
      view.updateTextBoxMessage("", userInputId);
      valid = true;
    }
    else
      view.updateTextBoxMessage(`Invalid input.`, userInputId);
  }

  return valid;
}

function processAttackInput(player, userInputId) {
  let coordinate = undefined;

  let input = document.getElementById(userInputId).value;
  if (input.length > 0) {
    input = input.toUpperCase().replace(/\s/g, "");
    let x = input.charAt(0);
    let y = input.slice(1);

    if (player.board.isCoordinateInGrid(x + y)) {
      coordinate = x + y;
      view.updateTextBoxMessage("", userInputId);
    }
    else
      view.updateTextBoxMessage(`Invalid input.`, userInputId);
  }

  return coordinate;
}

let view = {
  updateLabelMessage: function (msg, id) {
    let messageArea = document.getElementById(id);
    messageArea.innerHTML = msg;
  },
  updateTextBoxMessage: function (msg, id) {
    let messageArea = document.getElementById(id);
    messageArea.value = msg;
  },
  updateElemDisplay(elem, value) {
    elem.style.display = value;
  }
};

function startGame() {
  let playerOne = new Player(new Ship(SHIP_SIZE), new Board(BOARD_SIZE), PLAYER_ONE);
  let playerTwo = new Player(new Ship(SHIP_SIZE), new Board(BOARD_SIZE), PLAYER_TWO);

  // Show the game board, player one's form, and hide start button
  view.updateElemDisplay(document.getElementsByClassName("gameContainer")[0], "initial");
  playerOne.printBoard();
  playerTwo.printBoard();

  view.updateElemDisplay(document.getElementById("startButton"), "none");
  for (const elem of document.forms) {
    if (elem.id !== P2_FORM_ID)
      view.updateElemDisplay(elem, "flex");
    elem.onkeypress = preventRefreshOnEnter;
  }

  // Ask to place ships
  let msg = `Enter a start and end ship locations in ascending order that has at least ${SHIP_SIZE} units in length.`;
  view.updateLabelMessage(msg, P1_QUESTION_LABEL_ID);
  view.updateLabelMessage(msg, P2_QUESTION_LABEL_ID);

  // Events
  document.getElementById(P1_OK_BUTTON_ID).addEventListener("click", function _listener(e) {
    if (processShipLocationInput(playerOne, P1_USER_INPUT_ID)) {
      playerOne.printBoard();
      // Only show the board  with ship for 1 second
      setTimeout(() => { playerOne.printBoard(false); }, 1000);
      view.updateElemDisplay(document.getElementById(P1_FORM_ID), "none");
      // Let the player 2 place his/her ship
      view.updateElemDisplay(document.getElementById(P2_FORM_ID), "flex");
    }
  });

  document.getElementById(P2_OK_BUTTON_ID).addEventListener("click", function _listener(e) {
    if (processShipLocationInput(playerTwo, P2_USER_INPUT_ID)) {
      playerTwo.printBoard();
      // Only show the board  with ship for 1 second
      setTimeout(() => { playerTwo.printBoard(false); }, 1000);
      view.updateElemDisplay(document.getElementById(P2_FORM_ID), "none");
      // Fire an event to prep for attack mode
      e.toElement.dispatchEvent(ON_P2_SHIP_IS_PLACED);
    }
  });


  document.addEventListener(ON_P2_SHIP_IS_PLACED.type, () => {
    // Hide ok buttons and show attack buttons  
    for (const elem of document.getElementsByClassName("okButton"))
      view.updateElemDisplay(elem, "none");

    for (const elem of document.getElementsByClassName("attackButton"))
      view.updateElemDisplay(elem, "flex");

    // Update the labels and textboxes
    let msg = `Enter a location to attack opponent's ship: `;
    view.updateLabelMessage(msg, P1_QUESTION_LABEL_ID);
    view.updateLabelMessage(msg, P2_QUESTION_LABEL_ID);

    view.updateTextBoxMessage("", P1_USER_INPUT_ID);
    view.updateTextBoxMessage("", P2_USER_INPUT_ID);

    // Let player one start attacking player two
    view.updateElemDisplay(document.getElementById(P1_FORM_ID), "flex");
  });

  document.getElementById(P1_ATTACK_BUTTON_ID).addEventListener("click", (event) => { handleAttackButton(playerOne, P1_USER_INPUT_ID, P1_FORM_ID, ON_P1_ATTACK_P2, event) });

  document.addEventListener(ON_P1_ATTACK_P2, (attack) => { handleOpponentAttack(playerTwo, P2_FORM_ID, playerOne.name, attack) });

  document.getElementById(P2_ATTACK_BUTTON_ID).addEventListener("click", (event) => { handleAttackButton(playerTwo, P2_USER_INPUT_ID, P2_FORM_ID, ON_P2_ATTACK_P1, event) });

  document.addEventListener(ON_P2_ATTACK_P1, (attack) => { handleOpponentAttack(playerOne, P1_FORM_ID, playerTwo.name, attack) });

  document.addEventListener(ON_WIN, handleWin);
}
