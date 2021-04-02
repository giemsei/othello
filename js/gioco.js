/*
Questa classe si occupa di:
- 
*/

function toRC(i){
    r=Math.floor(i/8);
    c=i%8;//c=i-r*8
    // var t = {
    //     r:r,
    //     c:c} // versione estesa della struttura nel return
    return {r,c}
}
function fromRC(r,c){
    return r*8+c
}

class Gioco{
    constructor(){
        this.celle=[];
        this.candidati=[];
        this.u=new Undo();
        for (var i = 0; i < 64; i++) {
            this.celle.push(0); //abbiamo creato un vettore riga fatto di vettori colonna, una sorta di matrice
            this.candidati.push(0);
        }

        this.reset()//SEMPRE COME ULTIMA ISTRUZIONE 
    }
    pos(r,c){
        var x= c*o.size+o.ox
        var y= r*o.size+o.oy
        return {x,y}
    }
    draw(){
        var offset=o.size*0.1
        noStroke();
        fill("black");
        rect(o.ox-offset, o.oy-offset, o.size*8+offset*2, o.size*8+offset*2);

        fill("grey");
        rect(o.ox, o.oy, o.size*8, o.size*8);

        for (var i=0;i<64;i++) {

            var {r,c}= toRC(i) //toRC non serve la parola chiave this, perchè definita globalmente
            var {x,y}= this.pos(r,c) //pos necessita this perchè è una funzione definita all'interno della classe

            if ((r+c)%2==0) fill(225); else fill(240)
            rect(x, y, o.size, o.size)
            if (this.celle[i]!=0) {
                var p= new Pezzo(this.celle[i])
                p.draw(x,y)
            }
        }
    }
    reset(){
        this.nero=true;
        for (var i = 0; i < 64; i++) {
            this.celle[i]=0;
            this.candidati[i]=0;
        }
        this.u.reset();
        //inizializziamo
        this.celle[fromRC(3,3)]=1;
        this.celle[fromRC(4,4)]=1;
        this.celle[fromRC(3,4)]=-1;
        this.celle[fromRC(4,3)]=-1;

    }
}





