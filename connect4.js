/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

 const WIDTH = 7;
 const HEIGHT = 6;
 
 let currPlayer = 1; // active player: 1 or 2
 let board = []; // array of rows, each row is array of cells  (board[y][x])
 
 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
 
 function makeBoard() {
   for (let y = 0; y < HEIGHT; y++) {
     board.push([])
     for (let x = 0; x < WIDTH ; x++) {
       board[y].push(null)
       }
     }
   }
 
 /** makeHtmlBoard: make HTML table and row of column tops. */
 
 function makeHtmlBoard() {
   // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board", DONE?
    const htmlBoard = document.getElementById('board');
 
   // TODO: add comment for this code, DONE?
   // this is where user will interact with game board, clicking a head cell will place a piece on board
   const top = document.createElement("tr");
   top.setAttribute("id", "column-top");
   top.addEventListener("click", handleClick);
 
   for (let x = 0; x < WIDTH; x++) {
     const headCell = document.createElement("td");
     headCell.setAttribute("id", x);
     top.append(headCell);
   }
   htmlBoard.append(top);
 
   // TODO: add comment for this code, DONE?
   // this is where game board is created
   for (let y = 0; y < HEIGHT; y++) {
     const row = document.createElement("tr");
     for (let x = 0; x < WIDTH; x++) {
       const cell = document.createElement("td");
       cell.setAttribute("id", `${y}-${x}`);
       row.append(cell);
     }
     htmlBoard.append(row);
   }
 }
 
 /** findSpotForCol: given column x, return top empty y (null if filled) */
 
 function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;

     }
     
   

 
 /** placeInTable: update DOM to place piece into HTML table of board */
 
 function placeInTable(y, x) {
   console.log('here is y ' + y + ' here is x ' + x)
   const selectedCell = document.getElementById(`${y}-${x}`);
   console.log(selectedCell)
   
   const piece = document.createElement('div');
   piece.classList.add('piece');
   
   if (currPlayer === 1) {
     piece.classList.add('p1');
   } else if (currPlayer === 2) {
     piece.classList.add('p2');
   }
   
   selectedCell.append(piece);
   
   
 }
 
 /** endGame: announce game end */
 
 function endGame(msg) {
   alert(msg);
 }
 
 /** handleClick: handle click of column top to play piece */
 
 function handleClick(evt) {
   // get x from ID of clicked cell
   let x = +evt.target.id;
  
 
   // get next spot in column (if none, ignore click)
   let y = findSpotForCol(x);
   console.log("THIS IS FOUND SPOT " + y)
   if (y === null) {
     return y;
   }
 
   // place piece in board and add to HTML table
   board[y][x] = currPlayer;
   placeInTable(y, x);
 
   // check for win
   if (checkForWin()) {
     return endGame(`Player ${currPlayer} won!`);
   }
 
   // check for tie
   if (board[y].every(function(cell){ return cell !== null; })) {
    endGame('Game ends in a tie!')
   }
   
   // switch players
   currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;

 }
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
   // TODO: read and understand this code. Add comments to help you.
 
   for (var y = 0; y < HEIGHT; y++) {
     for (var x = 0; x < WIDTH; x++) {
      // calculate each different way of winnning 
       var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
       var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
       var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
       var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      // finding winner by checking each possible way
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
         return true;
       }
     }
   }
 }
 
 makeBoard();
 makeHtmlBoard();