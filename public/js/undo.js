/*
Questa classe si occupa di:
- 
*/
class Undo{
    constructor(){
        this.v=[];
    }
    getSchema(gioco){
        var tm=[];
        for (var i of gioco.celle){
            tm.push(i.n);
        }
        return {
            celle: tm,
            nero: gioco.nero
        }
    }
    setSchema(gioco,p) {
        gioco.nero = p.nero
        for (var i=0;i<64;i++) {
            gioco.celle[i].n=p.celle[i]
        }
        gioco.setCandidati()

    }
    push(gioco){
        this.v.push(this.getSchema(gioco))
    }
    pop(gioco){
        var p = this.v.pop()
        if (p) {
            this.setSchema(gioco,p)
        }
    }
    reset(){
        this.v.length = 0;
    }
}