document.addEventListener('DOMContentLoaded', function() {

    var optionsButton = document.getElementById("options_submit");
    var widthLayout = 0;

    optionsButton.addEventListener("click", function(){

    optionsButton.innerHTML = "Reset";

    function isEven(value){
        if (value % 2 == 0) {
            return true;
        } else {
            return false;
        };
    };

    function isOdd(value){
        if (value % 1 == 0) {
            return true;
        } else {
            return false;
        };
    };

    function allSame(array) { 
    
        var first = array[0];

        if (array[0] == "") {
            return false;
        } else {
            return array.every(function(element) {
                return element == first;
            });
        };
    };

    
    var boardSize = parseInt(document.getElementById("boardsize_input").value);

    var gameBoard = [];

    var numCells = (boardSize * boardSize);

    for (var i = 0; i < numCells; i++) {
        gameBoard.push(i);
    };
    var cellClicks = [];

    for (var i = 0; i < numCells; i++) {
        cellClicks[i] = 0;
    };
    document.getElementById("game").innerHTML = '<div id="board"></div>';
    
    var checkDevice = window.matchMedia("(max-width: 620px)");
    
    widthLayout = checkDevice.matches == true ? "300": "600";

    var board = document.getElementById("board");

    board.style.margin = '0 auto';

    board.style.height = ((widthLayout/boardSize) * boardSize)+boardSize*2 + 'px';
    board.style.width = ((widthLayout/boardSize) * boardSize)+boardSize*2 +'px';


    for (var i = 0; i < numCells; i++) {
        board.innerHTML += '<div class="cell"></div>'; 
    };
    
    var Cells = document.getElementsByClassName("cell");

    for (var i = 0; i < numCells; i++) {
        Cells[i].style.height = widthLayout/boardSize +"px";
        Cells[i].style.width =  widthLayout/boardSize +"px";
        Cells[i].style.float = "left";
    
        Cells[i].setAttribute("id", i.toString());
    };

    function draw(){
        var checkDraw = 0;
        var cell = document.getElementsByClassName("cell");
        for(var i = 0; i < cell.length; i++){
            if (cell[i].innerText !=""){
                checkDraw++;
            }
        }
        if (checkDraw == numCells){
            return true;
        } else {
            return false;
        }
    }

    var statusDisplay = document.getElementById("statusDisplay")
    currentPlayer = "X"
    statusDisplay.style.color = "black";
    messsageDisplay = `<div class='${currentPlayer}'>${currentPlayer}'s Turn</div>`;
    statusDisplay.innerHTML = messsageDisplay;

    var boardClicks = 0;

    board.addEventListener("click", function() {
        if (determineWinner()) { 
            statusDisplay.style.color = winningPlayer[0] == "X" ? "red": "blue";
            statusDisplay.innerHTML = winningPlayer[0] + ' wins!';
        } else {
            if (draw()){
                statusDisplay.style.color="green";
                statusDisplay.innerHTML="This game ended draw";
                return false;
            } else {
                messsageDisplay = `<div class='${currentPlayer}'>${currentPlayer}'s Turn</div>`;
                statusDisplay.innerHTML = messsageDisplay;
            }
            
        }

        boardClicks++;
    }); 

    

    var winningPlayer;

    var determineWinner = function() {
        
        for (i = 0; i < numCells; i += 1) { 
            if ((i % boardSize) == 0) {
                var rowCheck = [];
                for (var cellNum = i; cellNum < (i + boardSize); cellNum += 1) { 
                    rowCheck.push(Cells[cellNum].innerText);
                };

                if (allSame(rowCheck)) {
                    winningPlayer = rowCheck; 
                    return true;
                };
            };
        };
        for (i = 0; i < numCells; i += 1) { 
            if (i < boardSize) { // 
                var colCheck = [];
                for (var cellNum = i; cellNum < numCells; cellNum += boardSize) { 
                    colCheck.push(Cells[cellNum].innerText);
                };
                
                if (allSame(colCheck)) {
                    winningPlayer = colCheck; 
                    return true;
                };	
            };
        };
        var diag1Check = []; 
        for (i = 0; i < numCells; i += 1) { 
            if ((i % (boardSize + 1)) == 0) { 
                diag1Check.push(Cells[i].innerText);
            };
        };
        if (allSame(diag1Check)) { 
            winningPlayer = diag1Check; 
            return true;
        };
        var diag2Check = []; 
        for (i = (boardSize - 1); i < (numCells - 1); i += 1) { 
            if ((i % (boardSize - 1)) == 0) { 
                diag2Check.push(Cells[i].innerText);
            };
        };
        if (allSame(diag2Check)) { 
            winningPlayer = diag2Check; 
            return true;
        } ;
    }; 

    var countClicks = function() {
        var divID = this.getAttribute("id");
        cellClicks[divID] += 1;
        if (isEven(boardClicks) && cellClicks[divID] == 1) {
            this.innerHTML = `<div class='${currentPlayer}'>${currentPlayer}</div>`;
            currentPlayer = currentPlayer === "X" ? "O" : "X";

        } else if (isOdd(boardClicks) && cellClicks[divID] == 1) {
            this.innerHTML = `<div class='${currentPlayer}'>${currentPlayer}</div>`;
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        } else if (!determineWinner()){
            boardClicks -= 1;
        } else {
        };
        if (determineWinner()) { 
            for (var i = 0; i < numCells; i++) {
                cellClicks[i] = 2;
            };
            document.getElementById("options_submit").innerHTML = "Play again?"
        };
    };

    for (var i = 0; i < numCells; i++) {
        Cells[i].addEventListener("click", countClicks);
    };

    }); 

}); 



