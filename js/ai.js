/*
Questa classe si occupa di:
- 
*/
class AI{
    constructor(gioco){
        this.gioco=gioco
    }
    nextMove(){
        for(var i =0;i<64;i++){
            if (this.gioco.celle[i].candidata){
                return i
            }
        }
        console.error("qualcosa non va")
    }
}