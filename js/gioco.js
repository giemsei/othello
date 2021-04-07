/*
Questa classe si occupa di:
- 
*/
const PESI = [ 
    100, -10, 10, 6, 6, 10, -10, 100, // quanto pesa ogni singola cella
    -10, -20, 1, 2, 2,   1, -20, -10,
    10,    1, 5, 4, 4,   5,   1,  10,
    6,     2, 4, 2, 2,   4,   2,   6,
    6,     2, 4, 2, 2,   4,   2,   6,
    10,    1, 5, 4, 4,   5,   1,  10,
    -10, -20, 1, 2, 2,   1, -20, -10,
    100, -10, 11, 6, 6, 11, -10, 100
];

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
        this.u = new Undo();
        this.ai= new AI(this);
        for (var i = 0; i < 64; i++) {
            this.celle.push(new Pezzo)
        }
        this.reset()//SEMPRE COME ULTIMA ISTRUZIONE 
    }
    pos(r, c) {
        var x = c * o.size + o.ox
        var y = r * o.size + o.oy
        return { x, y }
    }
    draw() {
        var offset = o.size * 0.10
        noStroke();
        fill("black");
        rect(o.ox - offset, o.oy - offset, o.size * 8 + offset * 2, o.size * 8 + offset * 2);
        for (var i = 0; i < 64; i++) {
            var { r, c } = toRC(i) //toRC non serve la parola chiave this, perchè definita globalmente
            var { x, y } = this.pos(r, c) //pos necessita this perchè è una funzione definita all'interno della classe
            if ((r + c) % 2 == 0) fill(225); else fill(240)
            this.celle[i].draw(x, y)
        }
        stroke(0)
        if (this.nero) {
            fill(0);
        } else {
            fill(255);
        }
        rect(o.ox + o.size * 8.2, o.oy + o.size * 3.8, o.size * 0.8, o.size * 0.4, o.size * 0.2)

    }
    getcella(x, y) {
        var c = Math.floor((x - o.ox) / o.size)
        var r = Math.floor((y - o.oy) / o.size)
        return fromRC(r, c)
    }
    undo() {
        var p = this.u.pop()
        if (p) {

            this.nero = p.nero
            for (var x of this.celle) {
                x.n=p.celle[i]
            }
        }
    }
    saveUndo() {
    
        this.u.push(this)//la classe vista dall'interno si chiama this
    }
    mangia(i) {
        var nero = this.nero ? -1 : 1
        var { r, c } = toRC(i)
        var self=this;
        //spostamento diagonale 2 e 4 quadrante
        
        function mangia0(r0,c0,trova) {
            var i0 = fromRC(r0, c0)
            var t = self.celle[i0].n
            if (t) {
                if (t == -nero) {
                    trova.push(i0)
                    return false;
                } else {
                    if (trova) {
                        for (var j of trova) {
                            self.celle[j].n = nero
                        }
                    }
                }
            }
            return true;
        }
        
        for (var r0 = r - 1, c0 = c - 1, trova = []; r0 >= 0 && c0 >= 0; r0--, c0--) {
           if (mangia0(r0,c0,trova)) break;
        }

        for (var r0 = r + 1, c0 = c + 1, trova = []; r0 < 8 && c0 < 8; r0++, c0++) {
            if (mangia0(r0,c0,trova)) break;
        }
        //spostamento diagonale 1 e 3 quadrante
        for (var r0 = r - 1, c0 = c + 1, trova = []; r0 >= 0 && c0 < 8; r0--, c0++) {
            if (mangia0(r0,c0,trova)) break;
        }
        for (var r0 = r + 1, c0 = c - 1, trova = []; r0 < 8 && c0 >= 0; r0++, c0--) {
            if (mangia0(r0,c0,trova)) break;
        }
        //spostamento della torre verso sopra
        for (var r0 = r - 1, trova = []; r0 >= 0; r0--) {
            if (mangia0(r0,c,trova)) break;
        }
        trova = false;
        //spostamento torre verso sotto
        for (var r0 = r + 1, trova = []; r0 < 8; r0++) {
            if (mangia0(r0,c,trova)) break;
    
        }
        //spostamento torre verso destra
        for (var c0 = c + 1, trova = []; c0 < 8; c0++) {
            if (mangia0(r,c0,trova)) break;
    
        }
        //spostamento torre verso sinistra
        for (var c0 = c - 1, trova = []; c0 >= 0; c0--) {
            if (mangia0(r,c0,trova)) break;
        }
    }
    setCandidati() {
        var nero = this.nero ? -1 : 1

        var self = this
        function candidata0(r0, c0) {
            var i0 = fromRC(r0, c0)
            return self.celle[i0].n
        }
        function checkCandidata(r, c) {
            var trova = false;

            //spostamento diagonale 2 e 4 quadrante
            for (var r0 = r - 1, c0 = c - 1; r0 >= 0 && c0 >= 0; r0--, c0--) {
                var t = candidata0(r0, c0)
                if (t == 0) break;
                if (t == -nero) trova = true;
                if (t == nero) {
                    if (trova) return true;
                    else break;
                }
            }
            trova = false;

            for (var r0 = r + 1, c0 = c + 1; r0 < 8 && c0 < 8; r0++, c0++) {
                var t = candidata0(r0, c0)
                if (t == 0) break;
                if (t == -nero) trova = true;
                if (t == nero) {
                    if (trova) return true;
                    else break;
                }
            }
            trova = false;
            //spostamento diagonale 1 e 3 quadrante
            for (var r0 = r - 1, c0 = c + 1; r0 >= 0 && c0 < 8; r0--, c0++) {
                var t = candidata0(r0, c0)
                if (t == 0) break;
                if (t == -nero) trova = true;
                if (t == nero) {
                    if (trova) return true;
                    else break;
                }
            }
            trova = false;
            for (var r0 = r + 1, c0 = c - 1; r0 < 8 && c0 >= 0; r0++, c0--) {
                var t = candidata0(r0, c0)
                if (t == 0) break;
                if (t == -nero) trova = true;
                if (t == nero) {
                    if (trova) return true;
                    else break;
                }
            }
            trova = false;
            //spostamento della torre verso sopra
            for (var r0 = r - 1; r0 >= 0; r0--) {
                var t = candidata0(r0, c)
                if (t == 0) break;
                if (t == -nero) trova = true;
                if (t == nero) {
                    if (trova) return true;
                    else break;
                }
            }
            trova = false;
            //spostamento torre verso sotto
            for (var r0 = r + 1; r0 < 8; r0++) {
                var t = candidata0(r0, c)
                if (t == 0) break;
                if (t == -nero) trova = true;
                if (t == nero) {
                    if (trova) return true;
                    else break;
                }
            }
            trova = false;
            //spostamento torre verso destra
            for (var c0 = c + 1; c0 < 8; c0++) {
                var t = candidata0(r, c0)
                if (t == 0) break;
                if (t == -nero) trova = true;
                if (t == nero) {
                    if (trova) return true;
                    else break;
                }
            }
            trova = false;
            //spostamento torre verso sinistra
            for (var c0 = c - 1; c0 >= 0; c0--) {
                var t = candidata0(r, c0)
                if (t == 0) break;
                if (t == -nero) trova = true;
                if (t == nero) {
                    if (trova) return true;
                    else break;
                }
            }
            return false;
        }

        var count=0;

        for (var i = 0; i < 64; i++) {
            if (this.celle[i].n == 0) {
                var { r, c } = toRC(i);
                var tm = checkCandidata(r,c)
                this.celle[i].candidata = tm
                if (tm) count++
            } else {
                this.celle[i].candidata = false;
            }
        }
        return count //se non ho nessun posto in cui muovere automaticamente tocca all'avversario altrimenti si bloccherebbe il gioco

    }
    get peso(){
        var tm=0;
        for(var i=0;i<64;i++){
            tm += this.celle[i].n*PESI[i]//valore maggiore di zero in vantaggio i bianchi altrimenti in neri 
        }
        return tm

    }

    reset() {
        this.nero = true;
        for (var i = 0; i < 64; i++) {
            this.celle[i].n = 0;
            this.celle[i].candidata = false;
        }
        this.u.reset();
        //inizializziamo
        this.celle[fromRC(3, 3)].n = 1;
        this.celle[fromRC(4, 4)].n = 1;
        this.celle[fromRC(3, 4)].n = -1;
        this.celle[fromRC(4, 3)].n = -1;

        this.setCandidati();
    }
}





