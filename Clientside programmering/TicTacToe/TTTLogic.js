var whichPlayer = "X";

var fields = document.getElementsByClassName("field");

var create_tic_or_toe = function() {
    var element = document.getElementById(this.id);
    if(element.innerHTML === ""){
        element.innerHTML += whichPlayer;

        if (whichPlayer === "X"){
            whichPlayer = "O";
        }
        else{
            whichPlayer = "X";
        }
    }
}

for (var i = 0; i < fields.length; i++) {
    console.log(fields[i].id);
    document.getElementById(fields[i].id).onclick = create_tic_or_toe;
}