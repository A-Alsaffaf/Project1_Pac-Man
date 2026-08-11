

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

/*---------------------------- Variables (state) ----------------------------*/
let cellsArray = []
/*------------------------ Cached Element References ------------------------*/
const mazeContainer = document.getElementById('maze-container')
console.log(mazeContainer);


/*-------------------------------- Functions --------------------------------*/
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