//punto di partenza dell'applicativo p5.js

var o = {
    CW:0,
    CH:0,
}

function init(){
    o.CW = windowWidth;
    o.CH = windowHeight;

    o.size = o.CW/10;
    if (o.CH/9<o.size){
        o.size=o.CH/9
    }
    o.ox = (o.CW - o.size * 9) / 2
    o.oy = (o.CH - o.size * 8) / 2
}
function windowResized() {
    init();
    resizeCanvas(o.CW, o.CH)
}
function setup(){
    init();
    createCanvas(o.CW, o.CH);
    gioco = new Gioco();
}
function draw(){
    background("whitesmoke");
    gioco.draw()
}
function preload(){
    o.sprite = loadImage("./img/pedine.png", (img) => {
        o.spritex = img.width / 8;
        o.spritey = img.height / 4;
    })
}
function mousePressed(){
    var i= gioco.getcella(mouseX,mouseY);
    if (i>=0 && gioco.candidata[i] ){
        gioco.saveUndo()
        gioco.mangia(i)
        if (gioco.nero){
            gioco.celle[i]=-1
        }else{
            gioco.celle[i]=1
        }
        gioco.nero=!gioco.nero
        gioco.setCandidati();
    }
}
function mouseReleased(){}
function keyPressed(){
    switch(key){
        case "r":
            gioco.reset();
            break;
        case "u":
            gioco.undo();
            break;
    }
}



