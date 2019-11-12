var nbBombTot = 20;
var grid = document.getElementById("grid");

function generateGrid() {    
    //remove the previous grid
    var tbody = document.querySelector("#grid > tbody");
    if(tbody != null) {
        tbody.remove();    
    }
    //generate a new grid
    for(let i = 0; i < 10; i++){
        row = grid.insertRow(i);
        for(let j = 0; j < 10; j++){
            cell = row.insertCell(j);
            
            cell.onclick = function(){
                checkClickedCell(this);
            }
        }
    }
    //add bombs to the new generated grid
    addMines(nbBombTot);
}

function addMines(totBomb){
    
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            grid.rows[i].cells[j].setAttribute("bomb", "false");
        }
    }       
    //add the exact amount of bombs requested
    var cpt = 0;
    while(cpt < totBomb){
        var row = Math.floor(Math.random()*10);
        var col = Math.floor(Math.random()*10);
        var cell = grid.rows[row].cells[col];
        if(cell.getAttribute("bomb") != "true"){
            cell.setAttribute("bomb", "true");
            cpt++;
        }
    }
}


function revealBombs(){
    //color bomb cells in red
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            var cell = grid.rows[i].cells[j];
            if(cell.getAttribute("bomb") == "true"){   
                cell.style.background="red";
            }
        }
    }
}


function checkClickedCell(cell){
    //check if the cell is a bomb
    if (cell.getAttribute("bomb") == "true"){
        revealBombs(); 
        alert("Gameover");
    }else { cell.setAttribute("bomb", "false");}
    
    var nbBombs = 0;
    
    //get the row and col index of the cell
    var cellRow = cell.parentNode.rowIndex;
    var cellCol = cell.cellIndex;
    
    //check adjacent cells and count the number of adjacent bombs
    for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,9); i++) {
        for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,9); j++) {
            if (grid.rows[i].cells[j].getAttribute("bomb")=="true"){
                nbBombs = nbBombs + 1;
            }
        }
    }
    //display the number of adjacent bombs
    grid.rows[cellRow].cells[cellCol].innerHTML = nbBombs;
    
    //if a cell has no adjacent bomb
    if(cell.innerHTML == 0){ 
        
        //check adjacent cells
        for (let i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,9); i++) {
            for(let j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,9); j++) {
                
                //if adjacent cells have no bombs
                if(grid.rows[i].cells[j].innerHTML == ''){
                   
                    //recursive call of the fonction
                    checkClickedCell(grid.rows[i].cells[j])
                }
            }
        }
    }     
    checkWin(); 
}


function checkWin(){
    var levelCompleted = true;
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            if((grid.rows[i].cells[j].getAttribute("bomb") == "false") && (grid.rows[i].cells[j].innerHTML == "")){ 
                levelCompleted = false;    
            }
        }
    }
    if(levelCompleted){
        alert("you win !");
        revealBombs();
    }
    
}
              
        