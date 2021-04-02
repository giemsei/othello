/*
Questa classe si occupa di:
- 
*/

function toRC(i) {
    r = Math.floor(i / 8);
    c = i % 8;//c=i-r*8
    // var t = {
    //     r:r,
    //     c:c} // versione estesa della struttura nel return
    return { r, c }
}
function fromRC(r, c) {
    if (r >= 0 && r < 8 && c >= 0 && c < 8) return r * 8 + c; else return -1 //è inteso come falso, che non va bene lol
}

class Gioco {
    constructor() {
        this.celle = [];
        this.candidata = [];
        this.u = new Undo();
        for (var i = 0; i < 64; i++) {
            this.celle.push(0); //abbiamo creato un vettore riga fatto di vettori colonna, una sorta di matrice
            this.candidata.push(false);
        }

        this.reset()//SEMPRE COME ULTIMA ISTRUZIONE 
    }
    pos(r, c) {
        var x = c * o.size + o.ox
        var y = r * o.size + o.oy
        return { x, y }
    }
    draw() {
        var offset = o.size * 0.1
        noStroke();
        fill("black");
        rect(o.ox - offset, o.oy - offset, o.size * 8 + offset * 2, o.size * 8 + offset * 2);

        fill("grey");
        rect(o.ox, o.oy, o.size * 8, o.size * 8);

        for (var i = 0; i < 64; i++) {

            var { r, c } = toRC(i) //toRC non serve la parola chiave this, perchè definita globalmente
            var { x, y } = this.pos(r, c) //pos necessita this perchè è una funzione definita all'interno della classe

            if ((r + c) % 2 == 0) fill(225); else fill(240)
            rect(x, y, o.size, o.size)
            if (this.candidata[i]){
                fill(0, 255, 255, 30)
                rect(x, y, o.size, o.size)
            }
            if (this.celle[i] != 0) {
                var p = new Pezzo(this.celle[i])
                p.draw(x, y)
            }
        }

        noStroke()
        if (this.nero) {
            fill(0);
        } else {
            fill(255);
        }
        rect(o.ox + o.size * 8.2, o.oy + o.size * 3.8, o.size * 0.8, o.size * 0.4) 

    }
    getcella(x, y) {
        var c = Math.floor((x - o.ox) / o.size)
        var r = Math.floor((y - o.oy) / o.size)
        return fromRC(r, c)
    }
    reset() {
        this.nero = true;
        for (var i = 0; i < 64; i++) {
            this.celle[i] = 0;
            this.candidata[i] = false;
        }
        this.u.reset();
        //inizializziamo
        this.celle[fromRC(3, 3)] = 1;
        this.celle[fromRC(4, 4)] = 1;
        this.celle[fromRC(3, 4)] = -1;
        this.celle[fromRC(4, 3)] = -1;
    }
}





