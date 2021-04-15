const express = require('express')
var fs = require("fs");
const app = express()
app.use('/', express.static("public"));      // indirizzo principale su public (othello)
app.use('/altro', express.static("altro"));  // indirizzo /altro su "altro"
app.use('/ancora', express.static("altro")); // indirizzo ancora su cartella "altro"
app.use('/ciao', express.static("public/css")); // indirizzo ancora su cartella "altro"


app.use("/serv1",require("./src/serv1.js"));
app.use("/ciao",require("./src/ciao.js"));

/*
app.get("/ciao",(req,res)=>{
    res.send("ciao anche a te: "+req.url);
});
*/

app.listen(3001, () => {
    console.log("Server avviato!");
})

