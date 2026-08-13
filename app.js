console.log("Simple Pac-Man Game");

/*-------------------------------- Constants --------------------------------*/ 
const mazeArray = [
  ["w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w"],
  ["w","p","p","p","p","p","p","p","p","w","p","p","p","p","p","p","p","p","w"],
  ["w","p","w","p","w","w","p","w","p","p","p","w","p","w","w","p","w","p","w"],
  ["w","p","w","p","p","w","p","w","w","p","w","w","p","w","p","p","w","p","w"],
  ["w","p","w","w","p","w","p","w","w","p","w","w","p","w","p","w","w","p","w"],
  ["w","p","p","p","p","p","p","w","p","p","p","w","p","p","p","p","p","p","w"],
  ["w","p","p","w","w","p","p","p","p","w","p","p","p","p","w","w","p","p","w"],
  ["w","p","w","w","w","w","p","w","w","w","w","w","p","w","w","w","w","p","w"],
  ["w","p","p","w","w","p","n","n","n","n","n","n","n","p","w","w","p","p","w"],
  ["w","p","p","p","p","p","n","w","w","n","w","w","n","p","p","p","p","p","w"],
  ["w","w","p","w","w","w","n","w","n","g","n","w","n","w","w","w","p","w","w"],
  ["w","p","p","p","p","p","n","w","w","w","w","w","n","p","p","p","p","p","w"],
  ["w","p","p","w","w","p","n","n","n","n","n","n","n","p","w","w","p","p","w"],
  ["w","p","w","w","w","w","p","w","w","w","w","w","p","w","w","w","w","p","w"],
  ["w","p","p","w","w","p","p","p","p","w","p","p","p","p","w","w","p","p","w"],
  ["w","p","p","p","p","p","p","w","p","s","p","w","p","p","p","p","p","p","w"],
  ["w","p","w","w","p","w","p","w","w","p","w","w","p","w","p","w","w","p","w"],
  ["w","p","w","p","p","w","p","w","w","p","w","w","p","w","p","p","w","p","w"],
  ["w","p","w","p","w","w","p","w","p","p","p","w","p","w","w","p","w","p","w"],
  ["w","p","p","p","p","p","p","p","p","w","p","p","p","p","p","p","p","p","w"],
  ["w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w","w"]
];

const spawnPositions = {
    pacMan: { row: 15, col: 9 },
    ghost: { row: 10, col: 9 }
};

/*---------------------------- Variables (state) ----------------------------*/
let cellsArray = []
let ghost = {
    row: 10,
    col: 9,
    direction: 'up',
}
let pacMan = {
    row: 15,
    col: 9,
    direction: 'left',
}
let gameState = {
    lives: 3,
    score: 0,
    pelletsLeft: 0, // Todo: Count of pellets left in the maze dynamically instead of hardcoding it
    isGameOver: false,
}
/*------------------------ Cached Element References ------------------------*/
const mazeContainer = document.getElementById('maze-container')

/*-------------------------------- Functions --------------------------------*/

// this function builds the maze in HTML, iterating over the mazeArray and creating cell elements as divs with appropriate classes for walls, pellets, etc.
function createMaze () {
    mazeArray.forEach((row, rIndex) => {
        cellsArray.push([])
        row.forEach((tile, tIndex) => {
            const cell = document.createElement('div')
            cell.classList.add('cell', tile)
            cellsArray[rIndex].push(cell)
            mazeContainer.appendChild(cell)
        })
    })
}

function renderPacMan () {
    const pacManElement = document.createElement('img')
    pacManElement.src = './Images/pac-man.gif'
    pacManElement.classList.add('pac-man')
    cellsArray[pacMan.row][pacMan.col].appendChild(pacManElement)

}

function renderGhost () {
    const ghostElement = document.createElement('img')
    ghostElement.src = './Images/ghost.gif'
    ghostElement.classList.add('ghost')
    cellsArray[ghost.row][ghost.col].appendChild(ghostElement)
}

function catchPressedKeyValue (event) {
    let pKey = event.key //pressed key
    let nextMoveDirection
    
    if (pKey === 'a' || pKey === 'ArrowLeft') {
        nextMoveDirection = 'left'
    }else if (pKey === 'd' || pKey === 'ArrowRight') {
        nextMoveDirection = 'right'
    }else if (pKey === 'w' || pKey === 'ArrowUp') {
        nextMoveDirection = 'up'
    }else if (pKey === 's' || pKey === 'ArrowDown') {
        nextMoveDirection = 'down'
    }else {
        return 
    }
    console.log(nextMoveDirection);
    event.preventDefault()
    return nextMoveDirection
}

function calNextMove (nextMoveDirection) {
    let nextMovePos = {
        row: pacMan.row,
        col: pacMan.col
    }
    
    if (nextMoveDirection === 'left') {
        nextMovePos.col -= 1
    }else if (nextMoveDirection === 'right') {
        nextMovePos.col += 1
    }else if (nextMoveDirection === 'up') {
        nextMovePos.row -= 1
    }else if (nextMoveDirection === 'down') {
        nextMovePos.row += 1
    }else {
        return 
    }

    console.log(nextMovePos);
    return nextMovePos
}

function validateNextMove (nextPosition) {
    const nextPosAtCellsArray = cellsArray[nextPosition.row][nextPosition.col]
    if (nextPosAtCellsArray.classList.contains('w')) {
        return false;
    }
    return true;
}

function movePacMan (nextPosition) {
    if (validateNextMove(nextPosition)) {
        // Remove Pac-Man from the current position
        const currentCell = cellsArray[pacMan.row][pacMan.col];
        currentCell.innerHTML = ''; // Clear the cell
        //change pacMan position
        pacMan.row = nextPosition.row;
        pacMan.col = nextPosition.col;
        // Render Pac-Man in the new position
        renderPacMan();
    }else {
        return;
    }
}

function initGame () {
    createMaze()
    renderPacMan()
    renderGhost()
}

function handleKeyPress (event) {

const nextMoveDirection = catchPressedKeyValue(event)
const nextPosition = calNextMove(nextMoveDirection)
movePacMan(nextPosition)

}



/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener ('keydown', handleKeyPress)