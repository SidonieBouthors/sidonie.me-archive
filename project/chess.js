
function displayBoard(){
    const chesssquare = document.createElement("div", {class:"chess-square"});
    document.getElementById("chessboard").insertAdjacentHTML("beforeend", chesssquare);
}