let varsity_data, varsity_sources;

function changeTextContent(elm, str) {
    elm.innerHTML = elm.innerHTML.replace("placeholder", str);
}

function putDataInElement(elm, data) {

    changeTextContent(elm.children[0], data.date);
    changeTextContent(elm.children[1], data.location);
    changeTextContent(elm.children[2], data.club);
    changeTextContent(elm.children[3], data.time);
    if (data.alt_margin != "") changeTextContent(elm.children[4], data.alt_margin);
    else changeTextContent(elm.children[4], data.margin + "s");

    for (let i = 0; i < data.crew.length; i++) {
        elm.children[5].innerHTML += `<p class="info-item info-crew"><span>👥</span>${data.crew[i].name}</p>`;
    }

    for (let i = 0; i < data.notes.length; i++) {
        elm.children[6].innerHTML += `<p class="info-item info-note"><span>📝</span>${data.notes[i]}</p>`;
    }

    for (let i = 0; i < data.sources.length; i++) {
        elm.children[6].innerHTML += `<p class="info-item info-source"><span>ℹ️</span><a href="${varsity_sources[data.sources[i]]}">[source]</a></p>`;
    }

}

let columns;

let dataSource;

async function sleep(ms) {
    await new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}

async function rerender() {
    document.getElementsByClassName("grand-container")[0].textContent = "";

    let copyElement = document.getElementById("copy-content");

    let containers = [];

    for (let i = 0; i < columns; i++) {
        let elm = document.createElement("div");
        elm.classList.add("column-container");
        document.getElementsByClassName("grand-container")[0].appendChild(elm);
        containers.push(elm);
    }

    let containerIndex = 0;

    for (let i = 0; i < dataSource.length; i++) {
        let clonedElement = copyElement.cloneNode(true);
        clonedElement.id = dataSource[i].date;
        clonedElement.classList.remove("invisible");

        putDataInElement(clonedElement, dataSource[i]);

        containers[containerIndex].appendChild(clonedElement);

        containerIndex++;
        if (containerIndex >= columns) containerIndex = 0;
    }
}

function applyMobileChanges() {
    let change = 0;
    if (document.body.clientWidth > document.body.clientHeight) {
        // is landscape
        if (columns == 2) change = 1;

        columns = 5;
    } else {
        if (columns == 5) change = 1;

        // is portrait
        columns = 2;
    }
    if (change) rerender();
}

async function getSources() {
    await fetch("https://raw.githubusercontent.com/Coenicorn/varsity-winners/refs/heads/master/varsity_winners.json")
        .then(data => data.json())
        .then(json => varsity_data = json);
    await fetch("https://raw.githubusercontent.com/Coenicorn/varsity-winners/refs/heads/master/varsity_winners_sources.json")
        .then(data => data.json())
        .then(json => varsity_sources = json);

    dataSource = varsity_data.men;
}

function switchGender() {
    if (dataSource == varsity_data.men) dataSource = varsity_data.women;
    else dataSource = varsity_data.men;

    rerender();
}

async function main() {

    await getSources();

    applyMobileChanges();

    rerender();

    setInterval(applyMobileChanges, 500);

    document.getElementById("gender-change-lmao").addEventListener("click", switchGender);
}

document.addEventListener("DOMContentLoaded", main);