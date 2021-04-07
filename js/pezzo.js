/*
Questa classe si occupa di:
- pezzo viene definito con una variabile n che assume come
valori: 1 nel caso di pezzo bianco, 0 nessun pezzo, -1 pezzo nero 
- si posso usare altre funzioni che descrivono le caraterristiche dei 
nostri pezzi
*/
class Pezzo {
    constructor(n) {
        this.n = n
        this.candidata=false;
    }
    draw(x, y, s = 0) {
        if (!s) {
            s = o.size
        }
        rect(x, y, o.size, o.size)
        if (this.candidata) {
            fill(0, 255, 255, 30)
            rect(x, y, o.size, o.size)
        }
 
        if (this.n == 1) {
            //disegna pedina bianca
            image(o.sprite, x, y, s, s,
                o.spritex * 6, 0, o.spritex, o.spritey);
        } else if (this.n == -1) {
            //disegna pedina nera
            image(o.sprite, x, y, s, s,
                o.spritex * 6, o.spritey * 1, o.spritex, o.spritey);
        }
    }
}