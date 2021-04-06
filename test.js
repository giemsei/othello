var a =[1,2,3];
var b = a; //copia per riferimento, vale anche per gli oggetti
var c = JSON.parse(JSON.stringify(a)) //copia per valore di un array
b[2]=5;
console.log(a,c);

var a=100;
var b=a; //numeri e stringhe sono copiati per valore, e non per riferimento 
b=101;
console.log(a)