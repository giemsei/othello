//punto di partenza dell'applicativo p5.js

var o = {
    CW:0,
    CH:0,
}

function init(){
    o.CW = windowWidth;
    o.CH = windowHeight;
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
    //gioco.draw()
    var p= new Pezzo(0)
    var p1= new Pezzo(1)
    var p2= new Pezzo(-1)
    p.draw(0,0,50)
    p1.draw(100,0,50)
    p2.draw(100,50,50)
}
function preload(){
    o.sprite = loadImage("./img/pedine.png", (img) => {
        o.spritex = img.width / 8;
        o.spritey = img.height / 4;
    })
}
function mousePressed(){}
function mouseReleased(){}
function keyPressed(){}



