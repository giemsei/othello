//punto di partenza dell'applicativo p5.js
var gioco; 
var ui; 
var isComputer=false;


var o = {
    CW: 0,
    CH: 0,
}

function init() {
    o.CW = windowWidth;
    o.CH = windowHeight;

    o.size = o.CW / 10;
    if (o.CH / 9 < o.size) {
        o.size = o.CH / 9
    }
    o.ox = (o.CW - o.size * 9) / 2
    o.oy = (o.CH - o.size * 8) / 2
}
function windowResized() {
    init();
    resizeCanvas(o.CW, o.CH)
}
function setup() {
    init();
    createCanvas(o.CW, o.CH).parent("canvas");
    gioco = new Gioco();
    var tm =getStorage("partita");
    if (tm) {
        gioco.u.setSchema(gioco,tm)
    }
    var px = o.ox + o.size * 8.3
    ui = new Ui();
    ui.push(new Button(px, o.oy, o.size, 20, "bottone",
        function () {
            alert("premuto il bottone")
        }
    ))
    htmlSetGiocatori();
    frameRate(10)//per limitare p5.js nell'utilizzo massimo della cpu
}
function draw() {
    background("whitesmoke");
    gioco.draw()
    ui.draw()
}
function preload() {
    o.sprite = loadImage("./img/pedine.png", (img) => {
        o.spritex = img.width / 8;
        o.spritey = img.height / 4;
    })
}
function mousePressed() {
    if (isComputer) return;//per evitare di disturbare il computer quando sta lavorando
    ui.mousePressed(mouseX, mouseY)
    var i = gioco.getcella(mouseX, mouseY);
    if (i >= 0 && gioco.celle[i].candidata) {
        gioco.saveUndo()
        gioco.move(i)
        gioco.nero = !gioco.nero
        var candidati = gioco.setCandidati();
        if (!candidati) {
            gioco.nero = !gioco.nero;
            gioco.setCandidati();
        }

        if (!gioco.is2Player && !gioco.nero && candidati>=0) {
            isComputer=true;
            setTimeout(()=>{
                for (; ;) {
                    var i = gioco.nextMove();
                    console.log("nextMove",toRC(i));
                    gioco.move(i)
                    gioco.nero = !gioco.nero
                    var candidati = gioco.setCandidati();
                    if (!candidati) {
                        gioco.nero = !gioco.nero;
                        if (!gioco.setCandidati()) {
                            break
                        }
                    } else {
                        break
                    }
                }
                isComputer=false
            },2000)
            
        }
        htmlSetPeso(gioco.peso);
    }
}
function mouseReleased() { }
function keyPressed() {
    if (isComputer) return;//per evitare di disturbare il computer quando sta lavorando
    switch (key) {
        case "r":
            gioco.reset();
            break;
        case "u":
            gioco.undo();
            break;
    }
}
function mouseMoved() {
    ui.mouseMoved(mouseX, mouseY)
}



