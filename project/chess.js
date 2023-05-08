
displayBoard();

function displayBoard(){
    insertSquare();
    insertSquare();
}

function insertSquare(){
    const square = document.createElement("div");
    square.classList.add("chess-square", "black");
    document.getElementById("chessboard").insertAdjacentElement("beforeend", square);
}