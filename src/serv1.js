const router = require('express').Router();
console.log("router");
module.exports = router;

router
.get('/',(req,res)=>{
    res.send("servizio incluso");
})
.get('/altro',(req,res)=>{
    res.send("servizio incluso. altro");
})
.get('/prime',(req,res)=>{
    res.send("servizio incluso. 1");
})
.get('/secondo',(req,res)=>{
    res.send("servizio incluso. 2");
})
.get('/terzo',(req,res)=>{
    res.send("terzo");
})

