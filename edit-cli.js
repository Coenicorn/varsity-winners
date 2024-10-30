const dataset_file_name = "varsity-winners.json";

const fs = require("fs");

let varsity_data;

const first_varsity = 1878;

const existing_years = []; // stores if a year exists from first_varsity until the last year recorded in the dataset. stores -1 if a year does not exist, otherwise stores the index into varsity_data

/* "01-01-2001" -> { year: 2001, month: 1, day: 1 } */
function dateFromString(dateString) {
    let separated = dateString.split("-");

    return {
        year: separated[2],
        month: separated[1],
        day: separated[0]
    };
}

/* this function is horrendous */
function getYearData(num_year) {
    return varsity_data.men.find(elm => dateFromString(elm.date).year === num_year.toString());
}

/* this will overwrite ALL the content of dataset_file_name */
function updateVarsityFile() {
    fs.writeFileSync("test.json", JSON.stringify(varsity_data));
}

function loadVarsityFile() {
    varsity_data = JSON.parse(fs.readFileSync(dataset_file_name, 'utf-8'));
}

async function main() {

    // load data from file
    loadVarsityFile();

}

main();
