
var nomi=[];

function mostraJson() {
    var codice=document.getElementById("codice")
    codice.innerText=JSON.stringify(nomi,null,2);

   // document.getElementById("codice").innerText=JSON.stringify(nomi,null,2);
}


function cancella() {
    var lista=document.getElementById("lista")
    lista.innerHTML=""
    nomi=[];
    mostraJson();
}


function aggiungi() {
    var enome=document.getElementById("nome")
    var nome=enome.value
    
    var ecognome=document.getElementById("cognome")
    var cognome=ecognome.value
    

    if (nome || cognome) {
        nomi.push({nome,cognome});
        
        var lista=document.getElementById("lista")
        var el=document.createElement("li")    
        el.textContent=`${nome} - ${cognome}`
        lista.appendChild(el);
        enome.value=""
        ecognome.value=""
        mostraJson();
    } else {
        alert("manca nome o cognome");
    }

}