/*
Questa classe si occupa di:
- 
*/
class AI{
    constructor(gioco){
        this.gioco=gioco
    }
    nextMove(){
        var g=this.gioco;
        var iScelta=0;
        var pesoScelta=-1000;
        for(var i =0;i<64;i++){
            if (g.celle[i].candidata){
                var u = new Undo();
                u.push(g);
                g.move(i);
                var peso=g.peso
                if (peso>pesoScelta){
                    pesoScelta=peso;
                    iScelta=i;
                    console.log("iScelta",iScelta,pesoScelta)
                }
                u.pop(g)
            }
        }
        return iScelta;
    }
}