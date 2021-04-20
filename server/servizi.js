const router = require('express').Router();
const path=require("path");
const fs=require("fs");
console.log("router");
module.exports = router;

var nomi=[];
var file=path.join(__dirname,"../data/dati.json");
console.log("legge il 'database':",file);
if (fs.existsSync(file)) {
    var dati=fs.readFileSync(file)
    nomi=JSON.parse(dati);
    for (var n of nomi) {
        if (!n.indirizzo) n.indirizzo="indirizzo default";
    }


};

function saveData() {
    console.log("scrive: ",file);
    var data=JSON.stringify(nomi,null,2)
    fs.writeFileSync(file,data);
}

router
.post("/getnomi",(req,res)=>{
    res.send(nomi);

})
.post("/add",(req,res)=>{
    var {nome,cognome,eta,localita,indirizzo }=req.body;
    

    if (nome || cognome) {
        nomi.push({nome,cognome,eta:eta*0.7,localita,indirizzo});
        saveData();
    } 

    res.send(`aggiunto: ${nome},${cognome}`);
    
})
.post("/cancella",(req,res)=>{
    nomi=[];
    saveData();

    res.send("cancellato");
})