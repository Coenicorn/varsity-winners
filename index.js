let varsity_data, varsity_sources;
const varsity_data_url = "https://raw.githubusercontent.com/Coenicorn/varsity-winners/refs/heads/master/varsity_winners.json";
const varsity_sources_url = "https://raw.githubusercontent.com/Coenicorn/varsity-winners/refs/heads/master/varsity_winners_sources.json";

function changeTextContent(elm, str) {
    elm.innerHTML = elm.innerHTML.replace("placeholder", str);
}

const portraitColumns = 1;
const landscapeColumns = 1;

let columns = portraitColumns;

let collapseStatus = "expand all";

async function sleep(ms) {
    await new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
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

    return elm;
}

function newSourceItem(type, title, value) {
    let link = document.createElement("a");
    link.innerHTML = "source";
    link.href = value;
    link.target = "_blank";

    return newInfoItem(type, title, link.outerHTML);
}

async function fillContainerWithData(container, dataSource) {
    container.innerHTML = "";

    let copyElement = document.getElementById("copy-content");

    for (let i = 0; i < dataSource.length; i++) {
        // create and add new info box
        let clonedElement = copyElement.cloneNode(true);
        clonedElement.id = dataSource[i].date;
        clonedElement.classList.remove("invisible");
        clonedElement.classList.add("info-container");

        let titleElement = clonedElement.getElementsByClassName("info-dropdown-title")[0];
        let dropdownElement = clonedElement.getElementsByClassName("dropdown")[0];

        // put title element in title div
        let titleElm = newInfoItem("info-date", "", dataSource[i].date);
        titleElm.classList.add("bold");
        titleElement.appendChild(titleElm);
        // rest in dropdown div
        dropdownElement.appendChild(newInfoItem("info-location", "🌎", dataSource[i].location));
        dropdownElement.appendChild(newInfoItem("info-club", "🏷️", dataSource[i].club));
        dropdownElement.appendChild(newInfoItem("info-time", "⏱️", dataSource[i].time));
        dropdownElement.appendChild(newInfoItem("info-margin", "🥈", dataSource[i].alt_margin == "" ? (/^\d{2},\d{2}$/.test(dataSource[i].margin) ? dataSource[i].margin + "s" : dataSource[i].margin) : dataSource[i].alt_margin));
        for (let j = 0; j < dataSource[i].crew.length - 1; j++) {
            dropdownElement.appendChild(newInfoItem("info-crew", "👥", dataSource[i].crew[j].name));
        }
        // cox or stroke, depending on if it's the men's race (coxed four) or women's race (coxless four)
        dropdownElement.appendChild(newInfoItem("info-crew", dataSource == varsity_data.men ? "🗣️" : "👥", dataSource[i].crew[dataSource[i].crew.length-1].name));
        for (let j = 0; j < dataSource[i].notes.length; j++) {
            dropdownElement.appendChild(newInfoItem("info-note", "📝", dataSource[i].notes[j]));
        }
        for (let j = 0; j < dataSource[i].sources.length; j++) {
            dropdownElement.appendChild(newSourceItem("info-source", "ℹ️", varsity_sources[dataSource[i].sources[j]]));
        }
        
        container.appendChild(clonedElement);
    }
}

function rerender() {
    fillContainerWithData(document.getElementById("column-container-men"), varsity_data.men);
    fillContainerWithData(document.getElementById("column-container-women"), varsity_data.women);

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
    if (portraitColumns == landscapeColumns) return;
    if (document.body.clientWidth > document.body.clientHeight) {
        // is landscape
        if (columns == portraitColumns) change = 1;

        columns = landscapeColumns;
    } else {
        if (columns == landscapeColumns) change = 1;

        // is portrait
        columns = portraitColumns;
    }
    if (change) rerender();
}

async function getSources() {
    await fetch(varsity_data_url)
        .then(data => data.json())
        .then(json => varsity_data = json);
    await fetch(varsity_sources_url)
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

function expandCollapseAll(container) {
    let elms = container.getElementsByClassName("dropdown");
    
    if (!container.classList.contains("collapsed")) {
        for (let i = 0, l = elms.length; i < l; i++) {
            elms[i].classList.remove("invisible");
        }

        container.classList.add("collapsed");
    } else {
        for (let i = 0, l = elms.length; i < l; i++) {
            elms[i].classList.add("invisible");
        }

        container.classList.remove("collapsed");
    }

    container.getElementsByClassName("expand-button")[0].innerHTML = container.classList.contains("collapsed") ? "collapse all" : "expand all";
}

document.addEventListener("DOMContentLoaded", main);