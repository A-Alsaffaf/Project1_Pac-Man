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
  ["w","w","p","w","w","w","n","w","w","g","w","w","n","w","w","w","p","w","w"],
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
console.log(cellsArray);

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
    pelletsLeft: null, 
    isGameOver: false,
}
let interval 
/*------------------------ Cached Element References ------------------------*/
const mazeContainer = document.getElementById('maze-container')
const liveElements = document.getElementsByClassName('lives')
const displayScoreElement = document.getElementById('score')
const overlayElement = document.getElementById('overlay')
const endMessageElement = document.getElementById('end-msg')
const endButtonElement = document.getElementById('end-btn')

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
    cellsArray[ghost.row][ghost.col].prepend(ghostElement)
}

function renderPellets() {
    cellsArray.forEach((row, rIndex) => {
        row.forEach((cell, cIndex) => {
            if (cell.classList.contains('p')) { 
            const pelletElement = document.createElement('img')
            pelletElement.src = './Images/Pellet.png'
            pelletElement.classList.add ('pellets')
            cell.appendChild(pelletElement)
            }
        })
    });
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
    }else {
        return true
    }
}

function movePacMan (nextPosition) {
    if (validateNextMove(nextPosition)) {
        // Remove Pac-Man from the current position
        const currentCell = cellsArray[pacMan.row][pacMan.col];
        currentCell.innerHTML = ''; // Clear the cell
        //change pacMan position
        pacMan.row = nextPosition.row;
        pacMan.col = nextPosition.col;
        // check if PacMan has collided after changing the position and before rendering, it updates the position to te respawn if collided before rendering
        if (checkCollision()) {
            respawnPacMan()
        }
        // Render Pac-Man in the new position
        renderPacMan();
    }else {
        return;
    }
}

function collectPellet (nextPos) {
    const cellAtNextPacPos = cellsArray[nextPos.row][nextPos.col]

    if (cellAtNextPacPos.querySelector('.pellets')) {
        gameState.score += 10
        gameState.pelletsLeft -= 1
        console.log('SCORE: ' + gameState.score);
        cellAtNextPacPos.innerHTML = ''
        displayScoreElement.textContent = gameState.score
    }
}

function calPelletsLeft() {
    let totalPelletsLeft = 0
    cellsArray.forEach((row,rIndex) => {
        row.forEach((col, cIndex) => {
            if (cellsArray[rIndex][cIndex].querySelector('.pellets')) {totalPelletsLeft += 1}
        })
    })
    gameState.pelletsLeft = totalPelletsLeft
    console.log('Pellets Left: ' + gameState.pelletsLeft);
}

function checkCollision () {
    let isCollided = false 
    if (pacMan.row === ghost.row && pacMan.col === ghost.col) {
        console.log('you have lost a live');
        isCollided = true
    }
    return isCollided
}

function respawnPacMan () {
        if (gameState.lives >= 1) {
            pacMan.row = spawnPositions.pacMan.row
            pacMan.col = spawnPositions.pacMan.col
            gameState.lives -= 1
            console.log(gameState.lives + ' Lives Left');
            
        }
}

function livesDisplay () {
    if (gameState.lives === 2) {
        liveElements[2].querySelector('img').style.visibility = 'hidden'
    }else if (gameState.lives === 1) {
        liveElements[1].querySelector('img').style.visibility = 'hidden'
    }else if (gameState.lives === 0) {
        liveElements[0].querySelector('img').style.visibility = 'hidden'
    }
}

function checkIsGameOver () {
    if (gameState.isGameOver === true && gameState.pelletsLeft < 1 && gameState.lives >= 1) {
        overlayElement.style.display = 'flex'
        endMessageElement.textContent = 'CONGRATS YOU WON'
    }else if (gameState.isGameOver === true && gameState.pelletsLeft > 0 && gameState.lives < 1) {
        overlayElement.style.display = 'flex'
        endMessageElement.textContent = 'GAME OVER'
    }
}

function generateDirections () {
    let randomNum = Math.floor(Math.random() * 4)
    let nextRandomDirection
    if (randomNum === 0) {
        nextRandomDirection = 'up'
    }else if (randomNum === 1) {
        nextRandomDirection = 'right'
    }else if (randomNum === 2) {
        nextRandomDirection = 'down'
    }else if (randomNum === 3) {
        nextRandomDirection = 'left'
    }
    console.log(`rNum: ${randomNum}, rDirection: ${nextRandomDirection}`);
    return nextRandomDirection
}

function calNextGhostMove (nextGhostMoveDirection) {
    let nextGhostMovePos = {
        row: ghost.row,
        col: ghost.col
    }
    
    if (nextGhostMoveDirection === 'left') {
        nextGhostMovePos.col -= 1
    }else if (nextGhostMoveDirection === 'right') {
        nextGhostMovePos.col += 1
    }else if (nextGhostMoveDirection === 'up') {
        nextGhostMovePos.row -= 1
    }else if (nextGhostMoveDirection === 'down') {
        nextGhostMovePos.row += 1
    }else {
        return 
    }

    console.log('Current Ghost Position: ' + `row: ${ghost.row}, col: ${ghost.col}`);
    console.log('Next Ghost Move: ' + `row: ${nextGhostMovePos.row}, col: ${nextGhostMovePos.col}`);
    return nextGhostMovePos
}

function validateGhostNextMove (nextPosition) {
    const nextPosAtCellsArray = cellsArray[nextPosition.row][nextPosition.col]
    if (nextPosAtCellsArray.classList.contains('w')) {
        return false;
    }else {
        return true
    }
}

function moveGhost (nextGhostPos) {
    if (validateGhostNextMove(nextGhostPos)) {
    // Remove Ghost from the current position
    const currentGhostCell = cellsArray[ghost.row][ghost.col];
    currentGhostCell.querySelector('.ghost').remove(); // Clear the cell

    //change pacMan position
    ghost.row = nextGhostPos.row;
    ghost.col = nextGhostPos.col;
    // check if PacMan has collided after changing the position and before rendering, it updates the position to te respawn if collided before rendering
    if (checkCollision()) {
        respawnPacMan()
        renderPacMan()
    }
    // Render Pac-Man in the new position
    // renderPacMan();
    renderGhost()

    }else {
        return;
    }
    setTimeout(() => {
        currentGhostCell.innerHTML = '<img src="./Images/Pellet.png" class="pellets">'
        
    }, 500);
}

function getValidGhostMove () {
    let nextGhostPos = calNextGhostMove(generateDirections())

    while (validateGhostNextMove(nextGhostPos) === false) {
        nextGhostPos = calNextGhostMove(generateDirections())
    }

    return nextGhostPos
}

function handleInterval () {
    const nextGhostPos = getValidGhostMove()
    moveGhost(nextGhostPos)
}

function initGame () {
    createMaze()
    renderPacMan()
    renderGhost()
    renderPellets()
    calPelletsLeft()

    interval = setInterval(handleInterval, 500)
}

function handleKeyPress (event) {
    const nextMoveDirection = catchPressedKeyValue(event)
    const nextPosition = calNextMove(nextMoveDirection)

    if (gameState.lives >= 1 || gameState.pelletsLeft > 0) {
        if (!gameState.isGameOver) {
            collectPellet(nextPosition)
            movePacMan(nextPosition)
            calPelletsLeft()
            livesDisplay()
        }
    }

    if (gameState.lives < 1 || gameState.pelletsLeft === 0) {
        gameState.isGameOver = true
        console.log(gameState.isGameOver);
    }

    checkIsGameOver()
}

/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener ('keydown', handleKeyPress)
endButtonElement.addEventListener('click', function () {
    location.reload()
})