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
            tm.push(i);
        }
        this.v.push({
            celle: tm,
            nero: gioco.nero
        });
    }
    pop(){
        return this.v.pop()
    }
    reset(){
        this.v.length = 0;
    }
}