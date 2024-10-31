let varsity_data, varsity_sources;

function changeTextContent(elm, str) {
    elm.innerHTML = elm.innerHTML.replace("placeholder", str);
}

let columns;

let dataSource;

let collapseStatus = "expand all";

async function sleep(ms) {
    await new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}

function newSourceItem(type, title, value) {
    let elm = document.createElement("p");

    elm.classList.add(type);
    elm.classList.add("info-item");

    let titleElm = document.createElement("span");
    titleElm.innerHTML += title;
    titleElm.classList.add("emoji");

    elm.appendChild(titleElm);

    let link = document.createElement("a");
    link.innerHTML = "source";
    link.href = value;

    elm.appendChild(link);

    return elm;
}

function newInfoItem(type, title, value) {
    let elm = document.createElement("p");

    elm.classList.add(type);
    elm.classList.add("info-item");

    let titleElm = document.createElement("span");
    titleElm.innerHTML += title;
    titleElm.classList.add("emoji");

    elm.appendChild(titleElm);

    elm.innerHTML += value;

    // let copy = document.createElement("span");
    // copy.classList.add("copy-button");
    // copy.title = "copy value";
    // copy.innerHTML += "📋";

    // copy.onclick = () => navigator.clipboard.writeText(value);

    // elm.appendChild(copy);

    return elm;
}

async function rerender() {
    // clear all elements from grand container
    document.getElementsByClassName("grand-container")[0].textContent = "";

    let copyElement = document.getElementById("copy-content");

    // generate all column containers
    let containers = [];

    for (let i = 0; i < columns; i++) {
        // create and add new element
        let elm = document.createElement("div");
        elm.classList.add("column-container");
        document.getElementsByClassName("grand-container")[0].appendChild(elm);
        containers.push(elm);
    }

    let containerIndex = 0;

    for (let i = 0; i < dataSource.length; i++) {
        // create and add new info box
        let clonedElement = copyElement.cloneNode(true);
        clonedElement.id = dataSource[i].date;
        clonedElement.classList.remove("invisible");
        clonedElement.classList.add("info-container");

        let titleElement = clonedElement.getElementsByClassName("info-dropdown-title")[0];
        let dropdownElement = clonedElement.getElementsByClassName("dropdown")[0];

        // put title element in title div
        titleElement.appendChild(newInfoItem("info-date", "📅", dataSource[i].date));
        // rest in dropdown div
        dropdownElement.appendChild(newInfoItem("info-location", "🌎", dataSource[i].location));
        dropdownElement.appendChild(newInfoItem("info-club", "🏷️", dataSource[i].club));
        dropdownElement.appendChild(newInfoItem("info-time", "⏱️", dataSource[i].time));
        dropdownElement.appendChild(newInfoItem("info-margin", "🥈", dataSource[i].alt_margin == "" ? (/^\d{2},\d{2}$/.test(dataSource[i].margin) ? dataSource[i].margin + "s" : dataSource[i].margin) : dataSource[i].alt_margin));
        for (let j = 0; j < dataSource[i].crew.length - 1; j++) {
            dropdownElement.appendChild(newInfoItem("info-crew", "👥", dataSource[i].crew[j].name));
        }
        // cox
        dropdownElement.appendChild(newInfoItem("info-crew", "🗣️", dataSource[i].crew[dataSource[i].crew.length-1].name));
        for (let j = 0; j < dataSource[i].notes.length; j++) {
            dropdownElement.appendChild(newInfoItem("info-note", "📝", dataSource[i].notes[j]));
        }
        for (let j = 0; j < dataSource[i].sources.length; j++) {
            dropdownElement.appendChild(newSourceItem("info-source", "ℹ️", varsity_sources[dataSource[i].sources[j]]));
        }
        
        containers[containerIndex].appendChild(clonedElement);

        containerIndex++;
        if (containerIndex >= columns) containerIndex = 0;
    }

    for (let containers = document.getElementsByClassName("info-container"), l = containers.length, i = 0; i < l; i++) {
        
        let container = containers[i];

        let dropdownTrigger = container.getElementsByClassName("info-date")[0];
        let dropdownContent = container.getElementsByClassName("dropdown")[0];

        dropdownTrigger.addEventListener("click", () => {
            if (dropdownContent.classList.contains("invisible"))
                dropdownContent.classList.remove("invisible");
            else
                dropdownContent.classList.add("invisible");
        });

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

async function main() {

    await getSources();

    applyMobileChanges();

    rerender();

    setInterval(applyMobileChanges, 500);
}

function expandCollapseAll() {
    let elms = document.getElementsByClassName("dropdown");
    
    if (collapseStatus == "expand all") {
        for (let i = 0, l = elms.length; i < l; i++) {
            elms[i].classList.remove("invisible");
        }

        collapseStatus = "collapse all";
    } else {
        for (let i = 0, l = elms.length; i < l; i++) {
            elms[i].classList.add("invisible");
        }

        collapseStatus = "expand all";
    }

    document.getElementById("expand-button").innerHTML = collapseStatus;
}

function switchGender() {
    let elm = document.getElementById("current-gender");
    if (dataSource == varsity_data.men) {
        dataSource = varsity_data.women;
        elm.innerHTML = "now: damesch";
    }
    else {
        dataSource = varsity_data.men;
        elm.innerHTML = "now: mannen";
    }

    rerender();
}

document.addEventListener("DOMContentLoaded", main);