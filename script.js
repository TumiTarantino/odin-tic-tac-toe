
function Gameboard() { 
    const gameboard = ["","","","","","","","",""];
    function isEmpty(index) {
        if(index == undefined){
            throw Error("Check the value of isEmpty. probably has no argument")
        }
        return gameboard[index] === ""; //If empty true
    }
    function placeMarker(index,symbol){
        if(symbol !== "X" && symbol !=="O"){
            throw new Error("Only X or O are allowed!");
        }
        if(!(index >= 0 && index <= 8)){
            throw new Error(`Index ${index} out of bounds`)
        }

        if(!isEmpty(index)){
            throw new Error(`Index ${index} is already occupied`)
        }
        gameboard[index] = symbol;
    }
    function isGameboardFull(){
        return gameboard.every(element => !!element)// returns true or false, Typescriptt!!!
    }
    function getMarker(index) {
        return gameboard[index]; // returns the marker at a specific index
    }
    function getBoard(){
        return [...gameboard]; // returns a shallow copy of the gameboard, i wonder if there is some mutablity concerns?
    }
    function printGameboard(){
        console.log(gameboard)
    }
    function resetGameboard(){
        gameboard.fill("");
    }

    return{
        getBoard,
        resetGameboard,
        isGameboardFull,
        isEmpty,
        placeMarker,
        getMarker,
        printGameboard
    }
}

function Player(name,symbol){
    return{
        name,
        symbol
    }
}

function GameController () {

    const gameboard = Gameboard();
    const player1 = Player("Uno", "X");
    const player2 = Player("Duos", "O");
    const winningCombos = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [3,4,5],
    [2,4,6],
    [6,7,8]
        ]
    let activePlayer = player1;
    let gameOver = false;
    let winner = null;

    function changeActivePlayer(){
        if(activePlayer === player1){
            activePlayer = player2;
        }
        else{
            activePlayer = player1;
        }
    }
    function checkWin(symbol) {
        if(symbol !== "X" && symbol !== "O"){
            throw Error(`CheckWin has an incorrect symbol ${symbol}`)
        }

        //Goes through the winning combos, on each loop assigns one of the winning combos to combo, then checks if the gameboard has the relevant symbol at its index
        for (let i = 0; i < winningCombos.length; i++) {
            
            let combo = winningCombos[i];
            let matches = 0;

            for (let j = 0; j < combo.length; j++) {

                // Check whether gameboard[combo[j]]
                // matches the symbol
                if(gameboard.getMarker(combo[j]) === symbol){
                    matches += 1;
                }
            }

        // If all three positions are the same, we have a winner
            if(matches === 3){
                return true;
            }
        }
        //Otherwise there is no winner yet
        return false;
    }
    function checkGameStatus() {
        if (checkDraw()) {
            console.log("The game is a draw!!!");// this might be more important to displayController?
            gameOver = true;
            return true;
        }

        if (checkWin("X")) {
            console.log("Player 1 wins!!!");
            gameOver = true;
            winner = player1;
            return true;
        }

        if (checkWin("O")) {
            console.log("Player 2 wins!!!");
            gameOver = true;
            winner = player2;
            return true;
        }

        return false;
    }

    function playRound(index){
        //So the active player should be, well active, at the end of the function the active player should be changed,
        //The active player should put there symbol on their selected index on the gameboard
        
        if (checkGameStatus()){
            return;
        }

        gameboard.placeMarker(index, activePlayer.symbol);

        if (checkGameStatus()){
            return;
        }

        changeActivePlayer();

    }

    function checkDraw(){
        return gameboard.isGameboardFull() && !checkWin("X") &&!checkWin("O")
    }
    function printGameControllerState(){
        console.log(`active player: ${activePlayer.name}`);
        console.log(`CheckWin X state: ${checkWin("X")}`);
        console.log(`ChecKWin O state: ${checkWin("O")}`);
        console.log(`Is gameboard full?: ${gameboard.isGameboardFull()}`)
        console.log(`${gameboard.printGameboard()}`);
    }
    function resetGame(){
        gameboard.resetGameboard()
        activePlayer = player1;
        gameOver = false;
        winner = null;
    }
    function getBoard(){
        return gameboard.getBoard();
    }
    return{
        getBoard,
        playRound,
        checkWin,
        checkDraw,
        printGameControllerState,
        resetGame
    }
}

const isthisthegamecontrol = GameController();

//Testing full game
isthisthegamecontrol.playRound(0); //Player 1 X
isthisthegamecontrol.playRound(1); //Player 2 O
isthisthegamecontrol.playRound(2); //Player 1 X
isthisthegamecontrol.playRound(3); //Player 2 O
isthisthegamecontrol.playRound(4); //Player 1 X
isthisthegamecontrol.playRound(5); //Player 2 O
isthisthegamecontrol.playRound(6); //Player 1 X
isthisthegamecontrol.playRound(7); //Player 2 O
isthisthegamecontrol.playRound(8); //Player 1 X

isthisthegamecontrol.printGameControllerState()

function displayController(){
    const gameContainer = document.querySelector(".game-container");
    const board = isthisthegamecontrol.getBoard()
    
    function createBoard(){
        for(let i = 0; i < 9; i++){
            const gameBlock = document.createElement("div");
            gameBlock.classList.add("game-block");
            gameBlock.textContent = board[i];


            gameContainer.append(gameBlock);
        }
    }
    function renderBoard(){
        const board = isthisthegamecontrol.getBoard()
        for(let i = 0; i < 9; i++){
            gameBlock.textContent = board[i];
        }
    }
}
displayController()
