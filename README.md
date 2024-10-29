# Varsity Winners

The Varsity is a dutch rowing event where the top
boats from dutch college rowing clubs compete on the
notorious Amsterdam-Rijnkanaal. I could not find a
list of *people* who have won this race, as usually
only the club who wins is recorded (because it's a
team sport yadayada posh crap) and I wanted to know
the rowers who won, so yeah, this is my attempt at that.

## Contributing

When this data is outdated or wrong, or you feel like there are improvements to be made, feel free to open an issue or a pull request!.

If you know something cool about a specific edition of the varsity, pop it into the "notes" section!

## Data format

The data is stored in a single JSON file.
The layout of the file and type of each field is as such:

```javascript

{
    "men": [
        {
            "date": string,
            "location": string,
            "crew": [
                {
                    "name": string
                },
                ...
            ],
            "club": string,
            "time": string,
            "margin_over_second": string,
            "notes": string,
            "draw": boolean
        },
        ...
    ],
    "women": [
        ...,
        {
            "date": string,
            "location": string,
            "crew": [
                {
                    "name": string
                },
                ...
            ],
            "club": string,
            "time": number,
            "margin_over_second": number,
            "notes": string,
            "draw": boolean
        },
        ...
    ]
}

```

Here is a detailed explanation of each field:

### root
<br>

`men` - An array of objects containing race data for the men's fours (<i><b>NL</b></i> Oude Vieren)
<br>
`women` - An array of objects containing race data for the women's fours (<i><b>NL</b></i> Dames Vieren)

### race 
<br>

`date` - The date of the event, formatted as such: "DD-MM-YY"
<br>
`location` - The location of the event, this has differed in the pas but has (as of 2024) settled on the Amsterdam-Rijnkanaal and is as such perhaps redundant for recent and future races
<br>
`crew` - An array of object containing crew data for each crew member.
<br>
`club` - The name of the winning club.
<br>
`time` - The total time that the winner has taken to finish the race, formatted as such: "00:00,00" (minutes, seconds, hundredths)
<br>
`margin_over_second` - The total time in milliseconds that the winner was faster than the runner-up, formatted as such: "00,00" (seconds, milliseconds).
<br>
This difference may not have been recorded / be difficult to find for older races so in that case the difference is 0
<br>
`notes` - Optional notes for each race. Can contain trivia facts or important information about how a race transpired.
<br>
`draw` - Flag for if the race was a draw. Not so relevant (and as such usually redundant) in modern times, mainly used for very old editions where timing was done by eye

### crew
<br>

`name` - The name of the crew member

The position of the rower in the boat is tied to his index in the `crew` array, and is numbered as such:
<br>
```
crew
[
    cox,
    stroke,
    3,
    2,
    bow
]
```