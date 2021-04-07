function btnReset($e){
    if (isComputer) return;//per evitare di disturbare il computer quando sta lavorando
    gioco.reset()
}
function btnUndo($e){
    if (isComputer) return;//per evitare di disturbare il computer quando sta lavorando
    gioco.undo()
}
function btn2player($e){
    if (isComputer) return;//per evitare di disturbare il computer quando sta lavorando
    gioco.is2Player=!gioco.is2Player
    htmlSetGiocatori();
    gioco.reset();//quando selezioniamo se 1 o 2 giocatori il gioco resetta
}
function htmlSetGiocatori(){
    document.getElementById("giocatori").innerText=gioco.is2Player?"2 Giocatori":"1 Giocatore"

}
function htmlSetPeso(peso){
    var el =document.getElementById("pesi")
    el.innerText = peso? `peso: ${peso}`: " "
    if (peso>0){
        el.style.backgroundColor="red"
    }else{
        el.style.backgroundColor="green"
    }
}

//lato Client direttamente nell'archivio locale del browser 
function setStorage(key,o){
    //key=nome dell'oggetto
    //o= oggetto
    localStorage.setItem(key,JSON.stringify(o))
    console.log("storage",o)
}
function getStorage(key,def){
    //def=default è il valore di default comodo nei casi in cui un oggetto non venga trovato, per evitare profondi bug 
    var tm = localStorage.getItem(key)
    if (tm) {
        return JSON.parse(tm)
    }else{
        return def
    }
}