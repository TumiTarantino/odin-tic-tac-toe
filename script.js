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
const Gameboard = {
    gameboard: ["O","O","O","","","","","",""], //remove \n when done with testing
    isEmpty: function(index) {
        return this.gameboard[index] === ""; //If empty true
    },
    placeMarker: function(index,symbol){
        if(symbol !== "X" && symbol !=="O"){
            throw new Error("Only X or O are allowed!");
        }
        if(!(index >= 0 && index <= 8)){
            throw new Error(`Index ${index} out of bounds`)
        }

        if(!this.isEmpty(index)){
            throw new Error(`Index ${index} is already occupied`)
        }
        this.gameboard[index] = symbol;
    }
}


function Player(name,symbol){
    return{
        name,
        symbol
    }
}

const player1 = Player("P1", "X");
const player2 = Player("P2", "O");


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


const GameController = {
    checkWin: function () {
        if(gameboard[0] === player1.symbol && gameboard[1] === player1.symbol && gameboard[2] === player1.symbol){
            console.log("This win check sucks")
        }
    }
}
