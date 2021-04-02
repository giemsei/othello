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
    gioco.draw()
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



