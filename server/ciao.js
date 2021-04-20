//server ciao.js

//RICORDATI: per verificare un servizio in lato server prima di scrivere il lato client si usa ciao.rest 

const fs = require("fs")
const path = require("path");
const { allowedNodeEnvironmentFlags } = require("process");
const router = require('express').Router();
module.exports = router;

function getHTML(dati) {
    return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
          <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>

                <script src="../altro/js/clientciao.js" > </script>
            </head>
            <body>
            <pre id="dati" contentEditable="true">${dati}</pre> 
            <button onclick="bottone()">salva</button> 
            <button onclick="bottoneGET()">salvo IN GET</button> 
            <button onclick="bottoneCANCELLA()">CANCELLA</button>
            </body>
            </html>
            `
}

router
    .get("/", (req, res) => {
        var risposta = {
            primo: 333,
            altrodato: "stringa"
        }
        res.send(risposta);
    })
    .get("/mondo", (req, res) => {

        //variabile direttamente dell'html,serve lo statistico 
        res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="js/main.js"></script>
</head>
<script></script>
<body>
    <h1>Inserisci Nome e Cognome</h1>
    <div>
        <label>Nome</label>
        <input type="text" id="nome" value="" placeholder="metti qui il nome"/>
        <label>Cognome</label>
        <input type="text" id="cognome" value="" />
        <button onclick="aggiungi()">Invia</button>
        <button onclick="cancella()">Cancella Tutto</button>

    </div>
    <h4>Elenco Valori inseriti:</h4>
    <ul id="lista">
        <li>Nome,Cognome</li>

    </ul>
    <h4>Variabile JSON</h4>
<pre id="codice"></pre>

</body>
</html>
    `);
    })
    .get("/mondo2", (req, res) => {
        var dati = fs.readFileSync(path.join(__dirname, "../package.json"))
        res.send(getHTML(dati))
    })
    .get("/mondo3", (req, res) => {
        //var nome=req.query.nome //nome: nome del file 
        var nome=req.query.nome || "../out.txt" //da inserire nel browser dopo il /mondopost2 si mette /mondopost2/?nome=../test.js
        var file=path.join(__dirname,nome) //path: del file

        //var dati = fs.readFileSync(file)
        var dati = fs.existsSync(file)? fs.readFileSync(file) : "file non esistente"

        res.send(getHTML(dati))
    })
    //sovrascrive il salvataggio su out.txt
    .post("/salva",(req,res)=>{
        console.log("req",req.body)//formato javascript del body
        console.log("req_json",JSON.stringify(req.body))//formato json del body

        /*
        il body è nel caso analizzato qua in javascript e':
        {
            dati: 'ciao\n',
            nome: 'giammi',
            eta: '24',
            abitazione: 'Trst',
            numeri: [ 1, 2, 3, 4 ]
        } 
        
        */
     var dati = req.body.dati //var {dati} = req.body //in caso dopo volessimo inserire altri parametri 
        var file=path.join(__dirname,"../out.txt") //se non esiste il file me lo crea sempre
        if (dati){
            fs.writeFileSync(file,dati)
        }

        res.send({
            result: "okay" //okay se c'è response.json su post.js bisogna ritornare un output un json 
        })
        
        //res.send("okay") //funziona solo se mettimo al return response.text dentro la funzione: async function postData(url = '', data = {})
    })
    .get("/salva",(req,res)=>{

     var dati = req.query.dati //si mette il query al posto di body 
        var file=path.join(__dirname,"../out1.txt")
        if (dati){
            fs.writeFileSync(file,dati)
        }
        res.send({
            result: "okay"  
        })
    })
    .post("/cancella",(req,res)=>{
        var file=path.join(__dirname,"../out.txt")
        var file1=path.join(__dirname,"../out1.txt")
        if (fs.existsSync(file)){
            fs.unlinkSync(file) //per cancellare il file
        }
        if (fs.existsSync(file1)){
            fs.unlinkSync(file1) //per cancellare il file1
        }
        res.send({
            result: "okay sauce"
        })
    })
    