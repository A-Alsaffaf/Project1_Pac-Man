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
  ["w","p","p","p","p","p","n","w","w","p","w","w","n","p","p","p","p","p","w"],
  ["w","w","p","w","w","w","n","w","p","g","p","w","n","w","w","w","p","w","w"],
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
let pacMan = {
    row: 15,
    col: 9,
    direction: 'left',
}
let gameState = {
    lives: 3,
    score: 0,
    pelletsLeft: 0, // Todo: Count of pellets left in the maze dynamically instead of hardcoding it
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
createMaze()
/*----------------------------- Event Listeners -----------------------------*/