const fs = require("fs");
const readline = require("readline");

function question(str, sameline) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true,
        setMaxListeners: 40
    });
    return new Promise((resolve) => {
        if (sameline) process.stdout.write(str);
        else console.log(str);
        rl.on("line", (answer) => {
            resolve(answer);
            rl.close();
        });
    });
}

const dataset_file_name = "varsity_winners.json";

const help_text =
    "\
List of possible commands:\n\
    a - Add new empty entry to dataset\n\
    r - Remove entry from dataset\n\
    l - List all recorded years\n\
    ly [year] - List all data for a single year\n\
    e/c [year] [field] - Edit data for a single entry\n\
    possible fields:\n\
        d - Date\n\
        l - Location\n\
        cr [position] - Crew member at [position]\n\
        cl - Club\n\
        t - Time\n\
        a - Alt_margin\n\
        m - Margin_over_second\n\
        n - Notes\n\
        s [source] - Sources. Set new source to empty string to remove it. Specify higher number than currently exists to add new source.\n\
    lc - List current changes\n\
    w - Write updates to file\n\
    q - Quit\n\
    h/help - Show this menu\
";

const welcome_text =
    "\
Welcome to the editor!\n\
If you don't know what to do, type 'help'.\n\
It is important that the new value complies with the format given in the documentation, please make sure it does!\n\
";

const edit_text =
    "You are currently in edit mode. If you don't know what to do, type 'help'.\n";

let varsity_data;

const first_varsity = 1878;

const existing_years = []; // stores if a year exists from first_varsity until the last year recorded in the dataset. stores -1 if a year does not exist, otherwise stores the index into varsity_data

const writestat_uptodate = "no changes";
const writestat_unsavedchanges = "unsaved changes";
const writestat_saved = "saved to file";

let writeStatus = writestat_uptodate;

let current_changes = [];

/* "01-01-2001" -> { year: 2001, month: 1, day: 1 } */
function dateFromString(dateString) {
    let separated = dateString.split("-");

    return {
        year: separated[2],
        month: separated[1],
        day: separated[0],
    };
}

/* this function is horrendous */
function getYearData(num_year) {
    let t = varsity_data.men.filter(
        (elm) => dateFromString(elm.date).year === num_year.toString()
    );
    if (t.length > 1)
        console.log(
            "CATASTROPHIC ERROR: more than 1 race recorded per year. (year " +
            num_year +
            "). Please resolve this problem ASAP"
        );
    return t[0];
}

/* this will overwrite ALL the content of dataset_file_name */
function updateVarsityFile() {
    fs.writeFileSync(dataset_file_name, JSON.stringify(varsity_data));
}

function loadVarsityFile() {
    varsity_data = JSON.parse(fs.readFileSync(dataset_file_name, "utf-8"));
}

function hasProperArguments(arguments) {
    if (arguments.length == 1 || arguments[1].toString() == "") return 0;
    else return 1;
}

async function editor(command) {
    const arguments = command.split(" ");

    let stat = "\ninvalid arguments - correct syntax: e [year] [field]";

    let n_arg = 0;
    for (let arg of arguments)
        if (arg.toString() != "") n_arg++;

    if (n_arg < 3) {
        console.log("err: not enough arguments" + stat);
        return;
    }
    let data = getYearData(arguments[1]);
    if (data === undefined) {
        console.log("err: no data for " + data.year + stat);
        return;
    }

    console.log("changing data for " + data.date);

    switch (arguments[2]) {
        case "d": {
            console.log("Changing value 'date'");
            console.log("current value: " + data.date);

            let newValue = await question("new value: ", 1);

            writeStatus = writestat_unsavedchanges;
            current_changes.push(
                `(${data.date}) change date '${data.date}' -> '${newValue}'`
            );

            data.date = newValue;
        }
        break;
        case "l": {
            console.log("Changing value 'location'");
            console.log("current value: " + data.location);

            let newValue = await question("new value: ", 1);

            writeStatus = writestat_unsavedchanges;
            current_changes.push(
                `(${data.date}) change location '${data.location}' -> '${newValue}'`
            );

            data.location = newValue;
        }
        break;
        case "cr": {
            if (n_arg != 4) {
                console.log(
                    "invalid arguments - correct syntax: e [year] cr [position]"
                );
                return;
            }
            let n_crew = Number(arguments[3]);
            if (n_crew < 0 || n_crew > 4) {
                console.log(
                    "error: crew member " +
                    n_crew +
                    " does not exist (allowed values: 0, 1, 2, 3, 4)"
                );
                return;
            }
            let crewData = data.crew[n_crew];

            console.log("current value: " + crewData.name);

            let newValue = await question("new value: ", 1);

            writeStatus = writestat_unsavedchanges;
            current_changes.push(
                `(${data.date}) change crew name '${crewData.name}' -> '${newValue}'`
            );

            crewData.name = newValue;
        }
        break;
        case "cl": {
            console.log("Changing value 'club'");
            console.log("current value: " + data.club);

            let newValue = await question("new value: ", 1);

            writeStatus = writestat_unsavedchanges;
            current_changes.push(
                `(${data.date}) change club '${data.club}' -> '${newValue}'`
            );

            data.club = newValue;
        }
        break;
        case "t": {
            console.log("Changing value 'time'");
            console.log("current value: " + data.time);

            let newValue = await question("new value: ", 1);

            writeStatus = writestat_unsavedchanges;
            current_changes.push(
                `(${data.date}) change time '${data.time}' -> '${newValue}'`
            );

            data.time = newValue;
        }
        break;
        case "a": {
            console.log("Changing value 'alt_margin'");
            console.log("current value: " + data.alt_margin);

            let newValue = await question("new value: ", 1);

            writeStatus = writestat_unsavedchanges;
            current_changes.push(
                `(${data.date}) change alt_margin '${data.alt_margin}' -> '${newValue}'`
            );

            data.alt_margin = newValue;
        }
        break;
        case "m": {
            console.log("Changing value 'margin_over_second'");
            console.log("current value: " + data.margin_over_second);

            let newValue = await question("new value: ", 1);

            writeStatus = writestat_unsavedchanges;
            current_changes.push(
                `(${data.date}) change margin_over_second '${data.margin_over_second}' -> '${newValue}'`
            );

            data.margin_over_second = newValue;
        }
        break;
        case "n": {
            console.log("Changing value 'notes'");
            console.log("current value: " + data.notes);

            let newValue = await question("new value: ", 1);

            writeStatus = writestat_unsavedchanges;
            current_changes.push(
                `(${data.date}) change notes '${data.notes}' -> '${newValue}'`
            );

            data.notes = newValue;
        }
        break;
        case "s": {
            if (n_arg != 4) {
                console.log(
                    "invalid arguments - correct syntax: e [year] s [source]"
                );
                return;
            }
            let n_source = Number(arguments[3]);
            if (n_source < 0) {
                console.log(
                    "invalid arguments - correct syntax: e [year] s [source]"
                );
                return;
            }

            if (data.sources.at(n_source) >= 0)
                console.log("current value: " + data.sources.at(n_source));
            else console.log("adding new source");

            let newValue = await question("new value: ", 1);

            writeStatus = writestat_unsavedchanges;

            if (data.sources.at(n_source) < 0) {
                data.sources.push(newValue);
                current_changes.push(`(${data.date}) new source '${newValue}'`);
            } else {
                current_changes.push(
                    `(${data.date}) change source '${data.sources[n_source]}' -> '${newValue}'`
                );

                data.sources[n_source] = newValue;
                // remove empty sources
                data.sources = data.sources.filter((source) => source.length === 0);
            }
        }
        break;
    }
}

async function mainCommandExec(command) {
    const arguments = command.split(" ");

    switch (arguments[0]) {
        case "h": {
            console.log(help_text);
        }
        break;
        case "help": {
            console.log(help_text);
        }
        break;
        case "l": {
            for (let year of varsity_data.men) {
                console.log(dateFromString(year.date).year);
            }
        }
        break;
        case "ly": {
            if (!hasProperArguments(arguments)) {
                console.log("invalid arguments - correct syntax: ly [year]");
                return;
            }
            let data = getYearData(arguments[1].toString());
            if (data === undefined)
            {
                console.log("No data recorded for year " + arguments[1]);
                return;
            }
            else console.log(data);

            for (let i of data.sources) {
                let source = varsity_data.sources.at(i);
                if (source) console.log(`Source ${i} -> ${source}`);
            }
        }
        break;
        case "r": {
            if (!hasProperArguments(arguments)) {
                console.log("invalid arguments - correct syntax: r [year]");
                return;
            }

            let data = getYearData(arguments[1].toString());
            if (data === undefined) {
                console.log("No data recorded for year " + arguments[1]);
                return;
            }

            console.log("currently waiting to delete:");
            console.log(data);

            let confirm = (
                await question(
                    "Are you sure you want to delete year " +
                    dateFromString(data.date).year +
                    "? (y/n) ",
                    1
                )
            ).toLowerCase();
            if (confirm == "y") {
                varsity_data.men = varsity_data.men.filter(
                    (entry) => entry.date != data.date
                );
            }

            writeStatus = writestat_unsavedchanges;
            current_changes.push(`(${data.date}) remove`);
        }
        break;
        case "w": {
            console.log("WARNING! You are about to write these changes:");
            for (let change of current_changes) console.log(" - " + change);

            let confirm = (await question("Are you sure? (y/n) ", 1)).toLowerCase();
            if (confirm == "y") {
                updateVarsityFile();
                writeStatus = writestat_saved;
                current_changes = [];
            }
        }
        break;
        /* big one */
        case "lc": {
            console.log("Current changes:");
            for (let change of current_changes) {
                console.log(" - " + change);
            }
        }
        break;
        case "e": {
            await editor(command);
        } break;
        case "c": {
            await editor(command);
        } break;
        break;
        case "a": {
            let newEntry = {
                date: "01-01-100",
                location: "changeme",
                crew: [
                    {
                        name: "changeme"
                    },
                    {
                        name: "changeme"
                    },
                    {
                        name: "changeme"
                    },
                    {
                        name: "changeme"
                    },
                    {
                        name: "changeme"
                    }
                ],
                club: "changeme",
                time: "changeme",
                alt_margin: "changeme",
                margin_over_second: "changeme",
                notes: "changeme",
                sources: [
                    "changeme"
                ]
            };

            varsity_data.men.unshift(newEntry);

            current_changes.push("add new race");
            writeStatus = writestat_unsavedchanges;

            console.log("added new entry");
            await mainCommandExec("ly 100");

            console.log("Please fill in every field:");

            await editor("e 100 l");
            await editor("e 100 cl");
            await editor("e 100 t");
            await editor("e 100 a");
            await editor("e 100 m");
            await editor("e 100 n");
            await editor("e 100 s 0");
            console.log("You will now add the crew members in this order: bow, 2, 3, stroke, cox");
            await editor("e 100 cr 0");
            await editor("e 100 cr 1");
            await editor("e 100 cr 2");
            await editor("e 100 cr 3");
            await editor("e 100 cr 4");
            await editor("e 100 d");

            console.log("Finished!");

        }
        break;
    }
}

async function main() {
    // load data from file
    console.log("loading " + dataset_file_name + "...");
    loadVarsityFile();
    console.log("done!\n");

    console.log(welcome_text);

    while (true) {
        let command = await question(
            `(${
        current_changes.length == 0
          ? writeStatus
          : `${
              current_changes.length == 1
                ? "1 change"
                : current_changes.length + " changes"
            }`
      }) `,
            1
        );

        if (writeStatus === writestat_saved) writeStatus = writestat_uptodate;

        if (command.toLowerCase() == "q") {
            if (writeStatus == writestat_unsavedchanges) {
                let confirm = (
                    await question(
                        "You have unsaved changes, are you sure you want to quit now? (y/n) ",
                        1
                    )
                ).toLowerCase();
                if (confirm != "y") continue;
            }
            break;
        }

        await mainCommandExec(command);
    }

    console.log("bye!");
}

main();