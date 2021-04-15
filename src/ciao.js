
const router = require('express').Router();
module.exports = router;

router.get("/",(req,res)=>{
    var risposta={
        primo:333,
        altrodato:"stringa"
    }


    res.send(risposta);

});