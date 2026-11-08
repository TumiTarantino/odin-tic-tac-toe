//Just ideating
/*
Gameboard:
Has three states:""(empty),"X","O"
I think js returns false for empty strings
[(indexes)
0,1,2,
3,4,5,
6,7,8
]
 */

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
        return gameboard[index];
    }
    function printGameboard(){
        console.log(gameboard)
    }
    function resetGameboard(){
        gameboard = ["","","","","","","","",""];
    }

    return{
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


/*Winning combos:
1. 012,
2. 036,
3. 048,
4. 147,
5. 258,
6. 345,
7. 246,
8. 678
*/
//We need to somehow check whether or not the winningCombos are active in the gameboard
//Can we filter out the indexs of all the "O" in the gameboard?



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
            console.log("The game is a draw!!!");
            return true;
        }

        if (checkWin("X")) {
            console.log("Player 1 wins!!!");
            return true;
        }

        if (checkWin("O")) {
            console.log("Player 2 wins!!!");
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

    return{
        playRound,
        checkWin,
        checkDraw,
        printGameControllerState
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
/*ad
Future Me, you got this!
the basic artictutre should be 
GameBoard, Player, GameController, displayController
*/