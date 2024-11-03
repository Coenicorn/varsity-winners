let varsity_data, varsity_sources;
const varsity_data_url = "https://raw.githubusercontent.com/Coenicorn/varsity-winners/refs/tags/v1.0.0/varsity_winners.json";
const varsity_sources_url = "https://raw.githubusercontent.com/Coenicorn/varsity-winners/refs/tags/v1.0.0/varsity_winners_sources.json";

function elm(id) {
    return document.getElementById(id);
}

/* sets selection state and hides/reveals relevant elements*/
function setSelectionState(state) {

    const
        eventSelection = elm("event-selector"),
        raceSelection = elm("race-selector-wrapper"),
        raceInformation = elm("race-information-wrapper");

    eventSelection.classList.add("hidden");
    raceSelection.classList.add("hidden");
    raceInformation.classList.add("hidden");

    switch (state) {
        case "event": eventSelection.classList.remove("hidden"); break;
        case "race": raceSelection.classList.remove("hidden"); break;
        default: raceInformation.classList.remove("hidden"); break;
    }

}

function selectEvent(event_index) {
    setSelectionState("race");

    fillRaceSelectionElements(varsity_data.races[event_index]);
}

function selectRace(race_index) {
    selectedRace = selectedEvent.data[race_index];

    // hide selection screen
    setSelectionState("");
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

function elmFromStr(string) {
    let elm = document.createElement("div");
    elm.innerHTML = string.trim();
    return elm.firstChild;
}

function newRaceSelectionElement(year, number) {
    return elmFromStr(`<div class="item item-bg-${number % 2 == 0 ? "00" : "01"}"><p class="race-number">${number}</p><p class="race-year">${year}</p></div>`);
}

function fillRaceSelectionElements(event) {

    const wrapper = document.getElementById("race-selector");

    wrapper.innerHTML = "";

    try {
        const data = event.data;
            
        for (let i = 0, l = data.length; i < l; i++) {

            wrapper.appendChild(newRaceSelectionElement(
                data[i].date.split("-")[2],
                l - i
            ));

        }
    } catch (e) {
        wrapper.appendChild(elmFromStr(`<p class="error">event not found</p>`));
    }
}

function showRaceInformation() {

}

async function main() {
    await getSources();

    setSelectionState("event");
}

document.addEventListener("DOMContentLoaded", main);