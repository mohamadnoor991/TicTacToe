const cells=document.querySelectorAll(".cell");
const statusText=document.querySelector("#statusText");
const restartBtn=document.querySelector("#restartBtn");
const winConditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options=["","","","","","","","",""];
let currentPlayer="X";
let running=false;

intializeGame();

function intializeGame() {
    cells.forEach(cell=>cell.addEventListener("click",cellClicked));
    restartBtn.addEventListener("click",restartGame);
    statusText.textContent=`${currentPlayer}'s turn`;
    running=true;
}

//where this function will apply on each cell for that we use this
function cellClicked(){
    const cellIndex=this.getAttribute("cellIndex");
    if(options[cellIndex] != "" || !running){
        return;
    }
    updateCell(this,cellIndex);
    // changePlayer();
    checkWinner();
}

function updateCell(cell,index){
    options[index]=currentPlayer;
    cell.textContent=currentPlayer;

}

function changePlayer(){
    currentPlayer=(currentPlayer=="X")? "O": "X";
    statusText.textContent=`${currentPlayer}'s turn`;

}

function checkWinner(){
let endgaame=false;
for(let i=0;i<winConditions.length;i++){
    let condition=winConditions[i];
    const cellA=options[condition[0]];
    const cellB=options[condition[1]];
    const cellC=options[condition[2]];
    if(cellA==""||cellB==""||cellC==""){
        continue;
    }
    if(cellA==cellB&& cellB==cellC){
        endgaame=true;
        break;
    }
}
if(endgaame){
    statusText.textContent=`${currentPlayer} is the winner`;
    running=false;
}else if(!options.includes("")){
    statusText.textContent=`No one win`;
    running=false;
}else{
    changePlayer();
}
}


function restartGame(){
     options=["","","","","","","","",""];
    currentPlayer="X";
     running=false;
     statusText.textContent=`${currentPlayer}'s turn`;
     cells.forEach(cell=>cell.textContent="");
     running=true;
   

}