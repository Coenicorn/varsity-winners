<p align="center">
  <img src="https://raw.githubusercontent.com/Coenicorn/varsity-winners/master/varsity.png" />
</p>

# Varsity Winners

The [Varsity](https://knsrb.nl/varsity/) is a historic Dutch rowing event during which the top college crews from all over the country compete to win the 'Oude Vier' (the top men's [coxed four](https://en.wikipedia.org/wiki/Coxed_four)).

The first edition of this event was held in 1878, and it's consistently been rowed ever since. Winning the Varsity is truly something remarkable, and a major goal for every college rower. Many of the great olympic rowers of the Netherlands have won it, and have stated that the event carries the same weight as even major international races.

As such, rowers who have won this race may not be forgotten. That's the philosophy behind this repository.

:white_check_mark: Data dating back to the first Varsity in 1878
<br>
:white_check_mark: Names of rowers and coxes
<br>
:white_check_mark: Race times
<br>
:white_check_mark: Source documentation
<br>
:white_check_mark: Dates and Locations

## Gratitude

A major part of this project would not have been possible if not for some sources who have collected extensive data on older editions of the Varsity, data that even transcends the scope of this data set. Thanks to them!

Here are those sources if you want to have a look yourself:
- [boat composition](https://web.archive.org/web/20030918025009/http://www.mijnlieff.nl/sport/roeien/varsity/varsity%20matrix.pdf)
- ['Stand der overwinningen'](https://web.archive.org/web/20080412011202/http://www.knsrb.nl/index.php?id=189%2C0%2C0%2C1%2C0%2C0)

## Contributing

As in any historical dataset, additional data is always highly appreciated. If you know something about any specific editions of the Varsity that might be of value, open an issue and we can improve this data set together! If you want to contribute directly, open a pull request!

Trivia and fun facts are always appreciated aswell!

Important points of improvement:

* Most of the names in this document are abbreviated, because the main source I used for the majority of the names does so. If you know any of the names, please change them to the non-abbreviated versions and submit a pull request!

## Files

The dataset consists of 2 files: varsity_winners.json and varsity_winners_sources.json. The first file stores the data for each race and the second stores the sources used for the first. These sources are links to data sources all across the web. A detailed description of the json schema can be found below.

## Schema

Below is a detailed description of the JSON schema for the `varsity_winners.json` file.

```javascript
{
    men: [
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
    ],
    women: [
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
    ],
    version: String
}
```


`men` - An array of objects containing race data for the men's races
<br>
`women` - An array of objects containing race data for the women's races
<br>
`version` - A string to store the current version
The data stored for each race is ordered so that the latest varsity is always at `data.men[0]` and `data.women[0]` respectively

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
```
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
