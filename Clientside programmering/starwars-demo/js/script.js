
const URL = "https://swapi.dev/api";

const menuBar = document.querySelector(".menuBar");
const dataBox = document.querySelector(".dataBox");
const FILTER = ["mglt", "passengers", "url", "created", "edited", "homeworld", "films", "vehicles", "starships", "species", "residents", "characters", "opening_crawl", "planets", "people", "pilots"];
const LFILTER = ["url", "created", "edited"]
fetch(URL)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        for(let key in json) {
            let menuItem = document.createElement("a");
            menuItem.className = "menuItem";
            menuItem.innerHTML = key;
            menuItem.href = json[key];
            menuItem.addEventListener("click", menuClick);
            menuBar.appendChild(menuItem);
        }
        
    })
    .then(function () {
        document.querySelector(".menuItem").click()
    });

async function menuClick(e) {
    e.preventDefault();
    document.querySelector(".menuItemActive")?.classList.remove("menuItemActive");
    e.target.classList.add("menuItemActive");
    let url = e.target.href;
    let data = await getData(url);
    console.log(data.results);
    showData(data, "card");
}

async function cardClick(cardurl) {
    let carddata = await getData(cardurl);
    showData(carddata, "cardlong");
}

async function getData(url){
    let response = await fetch(url);
    let json = await response.json();
    return json;
}

function cardData(elm, cardClass, filter){
    let title = document.createElement("p");
    title.className = "title";
    title.innerHTML += (elm.name == undefined)? elm.title + "<br>": elm.name + "<br>";
    title.innerHTML = title.innerHTML.toLowerCase();

    let card = document.createElement("div");

    card.appendChild(title);
    card.className = cardClass;

    let ul = document.createElement("ul");
    for(let key in elm){
        let p = document.createElement("p");
        if (key == "url" && cardClass === "card"){
            card.addEventListener("click", function(){cardClick(elm[key])});
        }

        if (filter.includes(key) || elm[key].length === 0) continue;

        p.innerHTML += key.replaceAll("_", " ") + ": ";
        if (Array.isArray(elm[key])){
            ul.appendChild(p);

            for(let items in elm[key]){
                let li = document.createElement("li");
                li.innerHTML = elm[key][items];
                ul.appendChild(li);
            }
            card.appendChild(ul);
        }
        else{
                p.innerHTML += elm[key] + "<br>";
            
            card.appendChild(p);
        }
    }
    card.innerHTML = card.innerHTML.toLowerCase();
    dataBox.appendChild(card);
}

function showData(data, cardClass) {
    dataBox.innerHTML = "";

    if (cardClass === "cardlong"){
        cardData(data, cardClass, LFILTER);
    }
    else{
        data.results.forEach(function(elm){
            cardData(elm, cardClass, FILTER)
        })
    }
}