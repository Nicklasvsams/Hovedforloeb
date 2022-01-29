var whichPlayer = "X";
var p1score = 0;
var p2score = 0;
var game = false;
var turn = 0;
var fields = document.getElementsByClassName("field");
var scores = document.getElementsByClassName("playerscore");
var gameinfotext = document.getElementById("gameinfo");

gameinfotext.innerHTML = "Press New Game to start a game!"

function create_game_board() {
    var gameboardElement = document.getElementById("gameboard");
    gameboardElement.innerHTML = gameboard_html();
    update_player_score();
    for (var i = 0; i < fields.length; i++) {
        document.getElementById(fields[i].id).onclick = create_tic_or_toe;
    };
    game = true;
    turn = 0;
    gameinfotext.innerHTML = "Player 1's turn!";
};

function reset_player_score() {
    p1score = 0;
    p2score = 0;
    update_player_score();
    whichPlayer = "X";
};

var create_tic_or_toe = function(){
    if (game === true){
        var element = document.getElementById(this.id);
        if(element.innerHTML === ""){
            element.innerHTML += whichPlayer;
    
            if (whichPlayer === "X"){
                whichPlayer = "O";
                gameinfotext.innerHTML = "Player 2's turn!";
            }
            else{
                whichPlayer = "X";
                gameinfotext.innerHTML = "Player 1's turn!";
            };
        };
        check_win();
    }
};

document.getElementById("reset").onclick = function(){
    if (p1score > 0 || p2score > 0 || game === true){
        reset_player_score();
        create_game_board();
    }
}
document.getElementById("newgame").onclick = function(){
    create_game_board();
}

function update_player_score() {
    scores[0] = p1score;
    scores[1] = p2score;
    var p1ScoreElement = document.getElementById("p1score");
    var p2ScoreElement = document.getElementById("p2score");
    p1ScoreElement.innerHTML = "Player 1 score: " + p1score;
    p2ScoreElement.innerHTML = "Player 2 score: " + p2score;
};

function gameboard_html (){
    return "<div class='row'><div class='col no-padding border rounded'><button class='tic btn btn-secondary field' id='field1'></button></div><div class='col no-padding border rounded'><button class='tic btn btn-secondary field' id='field2'></button></div><div class='col no-padding border rounded'>  <button class='tic btn btn-secondary field' id='field3'></button></div></div><div class='row'>  <div class='col no-padding border rounded'>    <button class='tic btn btn-secondary field' id='field4'></button>  </div>  <div class='col no-padding border rounded'>    <button class='tic btn btn-secondary field' id='field5'></button>  </div>  <div class='col no-padding border rounded'>    <button class='tic btn btn-secondary field' id='field6'></button>  </div></div><div class='row'>  <div class='col no-padding border rounded'>    <button class='tic btn btn-secondary field' id='field7'></button>  </div>  <div class='col no-padding border rounded'>    <button class='tic btn btn-secondary field' id='field8'></button>  </div>  <div class='col no-padding border rounded'>    <button class='tic btn btn-secondary field' id='field9'></button>  </div></div>"
}

function check_win(){
    turn++;
    var checkFields = document.getElementsByClassName("field");
    console.log(checkFields);
    if (checkFields[0].innerHTML === "X" && checkFields[1].innerHTML === "X" && checkFields[2].innerHTML === "X"
        || checkFields[3].innerHTML === "X" && checkFields[4].innerHTML === "X" && checkFields[5].innerHTML === "X"
        || checkFields[6].innerHTML === "X" && checkFields[7].innerHTML === "X" && checkFields[8].innerHTML === "X"
        || checkFields[0].innerHTML === "X" && checkFields[3].innerHTML === "X" && checkFields[6].innerHTML === "X"
        || checkFields[1].innerHTML === "X" && checkFields[4].innerHTML === "X" && checkFields[7].innerHTML === "X"
        || checkFields[2].innerHTML === "X" && checkFields[5].innerHTML === "X" && checkFields[8].innerHTML === "X"
        || checkFields[0].innerHTML === "X" && checkFields[4].innerHTML === "X" && checkFields[8].innerHTML === "X"
        || checkFields[2].innerHTML === "X" && checkFields[4].innerHTML === "X" && checkFields[6].innerHTML === "X"){
        p1score++;
        update_player_score();
        gameinfotext.innerHTML = "Player 1 wins!";
        whichPlayer = "X";
        game = false;
    }
    else if (checkFields[0].innerHTML === "O" && checkFields[1].innerHTML === "O" && checkFields[2].innerHTML === "O"
        || checkFields[3].innerHTML === "O" && checkFields[4].innerHTML === "O" && checkFields[5].innerHTML === "O"
        || checkFields[6].innerHTML === "O" && checkFields[7].innerHTML === "O" && checkFields[8].innerHTML === "O"
        || checkFields[0].innerHTML === "O" && checkFields[3].innerHTML === "O" && checkFields[6].innerHTML === "O"
        || checkFields[1].innerHTML === "O" && checkFields[4].innerHTML === "O" && checkFields[7].innerHTML === "O"
        || checkFields[2].innerHTML === "O" && checkFields[5].innerHTML === "O" && checkFields[8].innerHTML === "O"
        || checkFields[0].innerHTML === "O" && checkFields[4].innerHTML === "O" && checkFields[8].innerHTML === "O"
        || checkFields[2].innerHTML === "O" && checkFields[4].innerHTML === "O" && checkFields[6].innerHTML === "O"){
        p2score++;
        update_player_score();
        gameinfotext.innerHTML = "Player 2 wins!"
        whichPlayer = "X";
        game = false;
    }
    else if(turn === 9){
        gameinfotext.innerHTML = "Draw!";
        whichPlayer = "X";
        game = false;
    }
}