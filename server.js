const express = require('express')
var fs = require("fs");
const app = express()
app.use('/', express.static("public"));



app.listen(3001, () => {
    console.log("Server avviato!");
})

