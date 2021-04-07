function btnReset($e){
    gioco.reset()
}
function btnUndo($e){
    gioco.undo()
}
function btn2player($e){
    gioco.is2Player=!gioco.is2Player
    document.getElementById("giocatori").innerText=gioco.is2Player?"2 Giocatori":"1 Giocatore"
    gioco.reset();//quando selezioniamo se 1 o 2 giocatori il gioco resetta
}