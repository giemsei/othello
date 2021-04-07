/*
Questa classe si occupa di:
- 
*/
class Undo{
    constructor(){
        this.v=[];
    }
    push(gioco){
        var tm=[];
        for (var i of gioco.celle){
            tm.push(i.n);
        }
        this.v.push({
            celle: tm,
            nero: gioco.nero
        });
    }
    pop(gioco){
        var p = this.v.pop()
        if (p) {
            gioco.nero = p.nero
            for (var i=0;i<64;i++) {
                gioco.celle[i].n=p.celle[i]
            }
            gioco.setCandidati()
        }
    }
    reset(){
        this.v.length = 0;
    }
}