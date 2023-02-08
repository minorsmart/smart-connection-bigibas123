let openWeatherAPIKey = "470a2bc170aff5f6a12564dd51ca296b"; //PLS don't steal my key
let city = "Posterenk";
let APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherAPIKey}`;

let dgId = (a) => { return document.getElementById(a); };

function doLine(text, parent) {
    let s = document.createElement("span");
    s.innerHTML = text;
    parent.appendChild(s);
    parent.appendChild(document.createElement("br"));
    return s;
}

function doChapter(title, number, parent) {
    let d = document.createElement("div");
    let h = document.createElement(`h${number}`);
    h.innerHTML = title;
    d.appendChild(h)
    parent.appendChild(d);
    return d;
}

function handleData(k, value, number, p) {
    console.log(k);
    console.log(value);
    console.log(`t: ${typeof value} arr: ${Array.isArray(value)}`);
    if (Array.isArray(value)) {
        let d = doChapter(k, number + 1, p);
        value.forEach((element, nk) => {
            processElement(nk, element, number + 2, p);
        });
    } else if (typeof value === "object") {
        processElement(k, value, number + 1, p);
    } else {
        doLine(`${k}: ${value}`, p);
    }
}

function processElement(name, data, number, parent) {
    let p = doChapter(name, number, parent);
    for (const k in data) {
        if (data.hasOwnProperty(k)) {
            let value = data[k];
            handleData(k, value, number, parent);
        }

    }
}

async function setPage() {
    fetch(APIUrl).then(
        (response) => { return response.json(); }
    ).then(
        (data) => {
            let weather = data;
            let cont = document.getElementById("container");
            let title = document.createElement("h1");
            title.innerText = APIUrl;
            cont.appendChild(title);
            for (const k in weather) {
                if (weather.hasOwnProperty(k)) {
                    handleData(k, weather[k], 1, cont);
                }
            }
        }
    )
}

setPage();