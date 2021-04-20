const express = require('express') //modulo
const serv1 =require("./src/serv1.js")

var fs = require("fs");
const app = express()

app.use(express.json()) // for parsing application/json
//app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use('/', express.static("public"));      // indirizzo principale su public (othello)
app.use('/altro', express.static("altro"));  // indirizzo /altro su "altro"
app.use('/ancora', express.static("altro")); // indirizzo ancora su cartella "altro"
//app.use('/ciao', express.static("public/css")); // indirizzo ancora su cartella "altro"

//due modi per fare il require e use
app.use("/serv1",serv1);
app.use("/ciao",require("./src/ciao.js"));

app.use("/servizi",require("./src/servizi.js"));


app.listen(3001, () => {
    console.log("Server avviato!");
})

