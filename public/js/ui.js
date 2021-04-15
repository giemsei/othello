//user interface
//elenco oggetti da disegnare
class Ui{
    constructor(){
        this.oggetti=[]
        return this //come nel push e nel draw e serve per collegare più funzioni insieme (draw e reset)
    }
    draw(){
        for(var o of this.oggetti) o.draw();
    }
    push(o){
        this.oggetti.push(o);
        return this
    }
    mouseMoved(x,y){
        for(var o of this.oggetti){
            o.selected = o.isIn(x,y)
        }
    }
    mousePressed(x,y){
        for(var o of this.oggetti){
            if (o.isIn(x,y)) o.click();
        }
    }
    reset(){
        this.oggetti.length=0;
        return this
    }
}
class Button{
    constructor(x,y,sizex,sizey,testo,callback){
        this.setSize(x,y,sizex,sizey)
        this.testo=testo
        this.callback=callback
        this.selected=false
    }
    click(){
        if (this.callback) this.callback()
    }
    setSize(x,y,sizex,sizey){
        this.x=x
        this.y=y
        this.sizex=sizex
        this.sizey=sizey 
    }
    isIn(x,y){
        return x>=this.x 
        && x<=this.x +this.sizex
        && y>=this.y
        && y<=this.y +this.sizey
    }
    draw(){
        stroke(0)
        fill(255)
        if (this.selected){
            fill(255,255,0)
        }
        rect(this.x, this.y, this.sizex, this.sizey,2)
        textAlign(CENTER)
        noStroke()
        fill(0)
        text(this.testo,this.x +this.sizex/2,this.y+this.sizey*0.7)
    }
}