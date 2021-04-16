class Post {
    constructor() {
    }
    post(url, data) {
        return new Promise((resolve, reject) => {
            if (!data) data = {};
            fetch(url, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                redirect: "follow",
                referrer: "no-referrer",
                body: JSON.stringify(data),
            })
            .then(response => {
                return response.json()
            })
            .then(xx => {
                if (xx) {
                    if (xx.err) reject({ url, data, message: xx.err }); 
                    else resolve(xx.data); 
                } else {
                    reject({ url, data, message: 'not  valid response' })
                }
            })
            .catch(e => {
                    reject({ url, data, message: e.message })
            })
        });
    }
}
export var post = new Post();
