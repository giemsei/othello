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
        var offset = o.size * 0.10
        noStroke();
        fill("black");
        rect(o.ox - offset, o.oy - offset, o.size * 8 + offset * 2, o.size * 8 + offset * 2);

        for (var i = 0; i < 64; i++) {

            var { r, c } = toRC(i) //toRC non serve la parola chiave this, perchè definita globalmente
            var { x, y } = this.pos(r, c) //pos necessita this perchè è una funzione definita all'interno della classe

            if ((r + c) % 2 == 0) fill(225); else fill(240)
            rect(x, y, o.size, o.size)
            if (this.candidata[i]) {
                fill(0, 255, 255, 30)
                rect(x, y, o.size, o.size)
            }
            if (this.celle[i] != 0) {
                var p = new Pezzo(this.celle[i])
                p.draw(x, y)
            }
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
            this.celle = p.celle
        }
    }
    saveUndo() {
        this.u.push(this)//la classe vista dall'interno si chiama this
    }
    mangia(i) {
        var nero = this.nero ? -1 : 1
        var { r, c } = toRC(i)
        //spostamento diagonale 2 e 4 quadrante
        for (var r0 = r - 1, c0 = c - 1, trova = []; r0 >= 0 && c0 >= 0; r0--, c0--) {
            var i0 = fromRC(r0, c0)
            var t = this.celle[i0]
            if (t == 0) break;
            if (t == -nero) {
                trova.push(i0)
            };
            if (t == nero) {
                if (trova) {
                    for (var j of trova) {
                        this.celle[j] = nero
                    }
                }
            }
        }

        for (var r0 = r + 1, c0 = c + 1, trova = []; r0 < 8 && c0 < 8; r0++, c0++) {
            var i0 = fromRC(r0, c0)
            var t = this.celle[i0]
            if (t == 0) break;
            if (t == -nero) {
                trova.push(i0)
            };
            if (t == nero) {
                if (trova) {
                    for (var j of trova) {
                        this.celle[j] = nero
                    }
                }
            }
        }
        //spostamento diagonale 1 e 3 quadrante
        for (var r0 = r - 1, c0 = c + 1, trova = []; r0 >= 0 && c0 < 8; r0--, c0++) {
            var i0 = fromRC(r0, c0)
            var t = this.celle[i0]
            if (t == 0) break;
            if (t == -nero) {
                trova.push(i0)
            };
            if (t == nero) {
                if (trova) {
                    for (var j of trova) {
                        this.celle[j] = nero
                    }
                }
            }
        }
        for (var r0 = r + 1, c0 = c - 1, trova = []; r0 < 8 && c0 >= 0; r0++, c0--) {
            var i0 = fromRC(r0, c0)
            var t = this.celle[i0]
            if (t == 0) break;
            if (t == -nero) {
                trova.push(i0)
            };
            if (t == nero) {
                if (trova) {
                    for (var j of trova) {
                        this.celle[j] = nero
                    }
                }
            }
        }
        //spostamento della torre verso sopra
        for (var r0 = r - 1, trova = []; r0 >= 0; r0--) {
            var i0 = fromRC(r0, c)
            var t = this.celle[i0]
            if (t == 0) break;
            if (t == -nero) {
                trova.push(i0)
            };
            if (t == nero) {
                if (trova) {
                    for (var j of trova) {
                        this.celle[j] = nero
                    }
                }
            }
        }
        trova = false;
        //spostamento torre verso sotto
        for (var r0 = r + 1, trova = []; r0 < 8; r0++) {
            var i0 = fromRC(r0, c)
            var t = this.celle[i0]
            if (t == 0) break;
            if (t == -nero) {
                trova.push(i0)
            };
            if (t == nero) {
                if (trova) {
                    for (var j of trova) {
                        this.celle[j] = nero
                    }
                }
            }
        }
        //spostamento torre verso destra
        for (var c0 = c + 1, trova = []; c0 < 8; c0++) {
            var i0 = fromRC(r, c0)
            var t = this.celle[i0]
            if (t == 0) break;
            if (t == -nero) {
                trova.push(i0)
            };
            if (t == nero) {
                if (trova) {
                    for (var j of trova) {
                        this.celle[j] = nero
                    }
                }
            }
        }
        //spostamento torre verso sinistra
        for (var c0 = c - 1, trova = []; c0 >= 0; c0--) {
            var i0 = fromRC(r, c0)
            var t = this.celle[i0]
            if (t == 0) break;
            if (t == -nero) {
                trova.push(i0)
            };
            if (t == nero) {
                if (trova) {
                    for (var j of trova) {
                        this.celle[j] = nero
                    }
                }
            }
        }
    }

    setCandidati() {
        var nero = this.nero ? -1 : 1

        var self = this
        function candidata0(r0, c0) {
            var i0 = fromRC(r0, c0)
            return self.celle[i0]
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

        for (var i = 0; i < 64; i++) {
            if (this.celle[i] == 0) {
                var { r, c } = toRC(i);
                this.candidata[i] = checkCandidata(r, c)
            } else {
                this.candidata[i] = false;
            }
        }
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

        this.setCandidati();
    }
}





