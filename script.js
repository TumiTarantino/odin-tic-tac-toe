let theDisplayControllerr;

const resetButton = document.querySelector(".reset-game-btn");

resetButton.addEventListener("click", () => {
    theDisplayControllerr?.resetGame();
});

const createPlayerBtn = document.querySelector(".modal-start-btn");
const formModal = document.querySelector("#formModal");
const startGameBtn = document.querySelector(".start-button");

createPlayerBtn.addEventListener("click", () => {
    formModal.showModal();
})

startGameBtn.addEventListener("click", () => {
    formModal.close();
})

//Seems to not work?
formModal.addEventListener("click", (e) => {
    if(e.target === formModal){
        formModal.close();
    }
})

const playerNameForm = document.querySelector(".player-input-form");

//SO game will be created reset in the global context i guess
playerNameForm.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    let player1Name = data["player-one"].trim() || "Player 1";
    let player2Name = data["player-two"].trim() || "Player 2";

    //After getting names from forms, instantiate the gameController
    const wemadeitbois = GameController(player1Name, player2Name);
    //We'll do the same here
    theDisplayControllerr = displayController(wemadeitbois);

    theDisplayControllerr.renderPlayerName();
    theDisplayControllerr.renderActivePlayer();
    theDisplayControllerr.createBoard(); // this should be called once,
    theDisplayControllerr.renderBoard();

})


function Gameboard() { 
    const gameboard = ["","","","","","","","",""];
    function isEmpty(index) {
        if(index === undefined){
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

function GameController (player1name, player2name) {

    const gameboard = Gameboard();
    const player1 = Player(player1name, "X");
    const player2 = Player(player2name, "O");
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
    let winner = null;
    function getActivePlayer(){
        return activePlayer;
    }
    function getWinner(){
        return winner;
    }
    function getPlayer1(){
        return player1;
    }
    function getPlayer2(){
        return player2;
    }
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
            return "draw";
        }

        if (checkWin("X")) {
            console.log("Player 1 wins!!!");
            winner = player1;
            return "won";
        }

        if (checkWin("O")) {
            console.log("Player 2 wins!!!");
            winner = player2;
            return "won";
        }

        return "playing";
    }

    function playRound(index){
        //So the active player should be, well active, at the end of the function the active player should be changed,
        //The active player should put there symbol on their selected index on the gameboard
        let status = checkGameStatus();
        if (status !== "playing"){
            return status;
        }

        gameboard.placeMarker(index, activePlayer.symbol);

        status = checkGameStatus();
        if (status !== "playing"){
            return status;
        }

        changeActivePlayer();
        return "playing"

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
        winner = null;
    }
    function getBoard(){
        return gameboard.getBoard();
    }
    return{
        getPlayer1,
        getPlayer2,
        getWinner,
        getActivePlayer,
        getBoard,
        playRound,
        checkWin,
        checkDraw,
        printGameControllerState,
        resetGame
    }
}

//Testing full game
/*isthisthegamecontrol.playRound(0); //Player 1 X
isthisthegamecontrol.playRound(1); //Player 2 O
isthisthegamecontrol.playRound(2); //Player 1 X
isthisthegamecontrol.playRound(3); //Player 2 O
isthisthegamecontrol.playRound(4); //Player 1 X
isthisthegamecontrol.playRound(5); //Player 2 O
isthisthegamecontrol.playRound(6); //Player 1 X
isthisthegamecontrol.playRound(7); //Player 2 O
isthisthegamecontrol.playRound(8); //Player 1 X

isthisthegamecontrol.printGameControllerState()
*/
//I think this should have an args, since isthisga... is a variable
function displayController(gameControllerObject){
    const gameContainer = document.querySelector(".game-container");
    
    //Creates divs, nothing more
    function createBoard(){
        gameContainer.replaceChildren(); // Lazy solution, works though
        for(let i = 0; i < 9; i++){
            const gameBlock = document.createElement("div");
            gameBlock.dataset.index = `${i}`;

            gameBlock.addEventListener("click", () => {
                const gameStatus = gameControllerObject.playRound(Number(gameBlock.dataset.index));
                renderBoard();
                renderGameStatus(gameStatus);
            })

            gameBlock.classList.add("game-block");
            gameContainer.append(gameBlock);
        }
    }

    //Renders what is inside those divs
    function renderBoard(){
        const gameBlocks = gameContainer.querySelectorAll(".game-block");
        const board = gameControllerObject.getBoard();

        //The created elements in createboard need to be created, but since they are blocked scoped, how to get them?
        for(let i = 0; i < 9; i++){
            gameBlocks[i].textContent = board[i];
        }
    }
    function renderPlayerName(){
        const player1 = gameControllerObject.getPlayer1();
        const player2 = gameControllerObject.getPlayer2();

        const player1name = document.querySelector(".player-1-name");
        const player2name = document.querySelector(".player-2-name");

        player1name.textContent = `Player 1: ${player1.name}`;
        player2name.textContent = `Player 2: ${player2.name}`;
    }
    function renderWinner(){
        const gameWinnerDiv = document.querySelector(".game-result");
        gameWinnerDiv.textContent = `The winner is: ${gameControllerObject.getWinner().name}`;
    }
    function renderDraw(){
        const gameWinnerDiv = document.querySelector(".game-result");
        gameWinnerDiv.textContent = "The game is a draw!!!";
    }
    function renderActivePlayer(){
        const gameActivePlayer = document.querySelector(".active-player");
        gameActivePlayer.textContent = `It is ${gameControllerObject.getActivePlayer().name}'s turn...`; //Doesn't account for s-ending possession

    }
    function renderGameStatus(gameStatus) {
        const gameResult = document.querySelector(".game-result");
        const activePlayer = document.querySelector(".active-player");

        // Clear previous messages
        gameResult.textContent = "";
        activePlayer.textContent = "";

        if (gameStatus === "won") {
            renderWinner();
        }
        else if (gameStatus === "draw") {
            renderDraw();
        }
        else if (gameStatus === "playing") {
            renderActivePlayer();
        }
    }

    function resetGame(){
        gameControllerObject.resetGame();
        renderBoard();
        renderGameStatus("playing");
    }
    function bindResetButton(){
        const gameResetBtn = document.querySelector(".reset-game-btn");
        gameResetBtn.addEventListener("click", resetGame);
    }
    return{
        bindResetButton,
        resetGame,
        renderGameStatus,
        renderActivePlayer,
        renderWinner,
        renderPlayerName,
        createBoard,
        renderBoard,
    }
}


