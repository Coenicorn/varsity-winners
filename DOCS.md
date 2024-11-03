## Files

The dataset consists of 2 files: varsity_winners.json and varsity_winners_sources.json. The first file stores the data for each race and the second stores the sources used for the first. These sources are links to data sources all across the web. A detailed description of the json schema can be found below.

## `varsity_winners_sources.json`

The sources file has a very simple layout, storing only 1 array with each index being a different source:

```javascript
[
    String,
    ...
]
```

The `sources` attribute (see below) of the data is equal to an index into this array. I.e. when `(race).sources[0] = 0`, then `source = varsity_winners_sources[0]`

## `varsity_winners.json`

Below is a detailed description of the JSON schema for the `varsity_winners.json` file.

```javascript
{
    races: [
        {
            event_name: String,
            event_id: String,
            data: [
                {
                    date: String,
                    location: String,
                    club: String,
                    time: String,
                    margin: String,
                    alt_margin: String,
                    notes: String,
                    sources: [Number]
                    crew: [
                        {
                            name: String
                        },
                        ...
                    ]
                },
                ...
            ]
        },
        ...
    ],
    version: String
}
```


`races` - An array storing data for each event
<br>
`version` - A string storing the current version

`event_name` - The name of the event
<br>
`event_id` - Guaranteed-to-be unique identifier for each race
<br>
`data` - An array storing data for each race

The data array is ordered as such that the first element (`data[0]`) is always the latest. As of version `1.0.0`, there are only 2 events registered; the men's coxed fours and the women's fours. These events are ordered in the array as such:

```javascript
races
[
    men,
    women
]
```

`date` - The date of the event, formatted as such: "DD-MM-YY"
<br>
`location` - The location of the event. 
<br>
`crew` - An array of object containing crew data for each crew member.
<br>
`club` - The name of the winning club.
<br>
`time` - The total time that the winner has taken to finish the race, formatted as such: "00:00,00" (minutes, seconds, hundredths)
<br>
`margin` - The total time that the winner was faster than the runner-up, formatted as such: "00,00" (seconds, hundredths).
This difference may not have been recorded / be difficult to find for older races so in that case the difference is "00,00"
<br>
`alt_margin` - The alternative margin string if the margin (historically) is not numerical. Some older editions store the margins in 'lengths' and such terms. <b>This field is empty (`""`) by default, so if it is NOT, then the alternative margin MUST be used.</b>
<br>
`notes` - An array with notes for each race. Can contain trivia facts or important information about how a race transpired.
<br>
`sources` - List of indeces into sources array found in `varsity_winners_sources.json`

`name` - The name of the crew member

The position of the rower in the boat is tied to his index in the `crew` array, which is populated as such:
<br>
```javascript
crew
[
    bow,
    ...,
    stroke,
    cox*
]
```

Some earlier races had 8 rowers +cox instead of the modern 4 +cox, so any program using this dataset will have to handle this exception

*The women's Varsity is raced in coxless fours, so when accessing the data for the women's races, there is no cox in the crew array. This has to be handled dynamically