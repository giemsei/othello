
//per qualsiasi funcione che usa il browser andare al sito https://developer.mozilla.org/it/docs/Web/API/Fetch_API


///ESEMPIO DA FETCH (sito: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

// Example POST method implementation:
async function postData(url = '', req = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Powered-by' : 'Giammi'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(req) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

// Example GET method implementation:
async function getData(url = '', req = {}) {

    //non possiamo paasare un body perhcè non esiste, ma possiamo cambiare l'indirizzo 
    function encodeURL(url = '', req = {}){
        var rr=[]

        for(var x in req){
            rr.push(`${x}=${encodeURIComponent(req[x])}`)
        }
        if(rr.length){
            return `${url}?${rr.join("&")}`
        }else{
            return url
        }
    }

    url=encodeURL(url,req)
    console.log(url)

    // Default options are marked with *
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Powered-by' : 'Giammi'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

function bottone() {

    var dati = document.getElementById("dati").innerText

    postData('/ciao/salva', { dati,nome:"giammi", eta:"24", abitazione:"Trst", numeri:[1,2,3,4] }) //indirizzo preso dal nostro ciao.rest
        .then(res => {
            console.log(res);
            alert("ho salvato") // JSON data parsed by `data.json()` call, risposta del servizio, then è per lavorare con le funzioni asincrone
        });

}

function bottoneGET(){

    var dati = document.getElementById("dati").innerText
    
    getData('/ciao/salva', { dati,nome:"giammi", eta:"24", abitazione:"Trst", numeri:[1,2,3,4] })
    .then(res => {
        console.log(res);
        alert("ho salvato") 
    })

}

function bottoneCANCELLA(){

    postData('/ciao/cancella') 
        .then(res => {
            console.log(res);
            alert("Cancello tutto sauce")
        });

}


