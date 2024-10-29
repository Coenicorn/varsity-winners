# Varsity Winners

The Varsity is a dutch rowing event where the top
boats from dutch college rowing clubs compete on the
notorious Amsterdam-Rijnkanaal. I could not find a
list of *people* who have won this race, as usually
only the club who wins is recorded (because it's a
team sport yadayada posh crap) and I wanted to know
the rowers who won, so yeah, this is my attempt at that.

## Contributing

When this data is outdated or wrong, or you feel like there are improvements to be made, feel free to open an issue or a pull request!

If you know something cool about a specific edition of the Varsity, pop it into the "notes" section! I'm a pretty young guy and generally don't know much
about the sport and/or the history of it, so help is greatly appreciated!

Most of the names in this document are abbreviated, because the main source I used for the majority of the names does so. If you know any of the names, please change them to the non-abbreviated versions and submit a pull request!

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
            "alt_margin": string,
            "margin_over_second": string,
            "notes": string,
            "sources": [
                number, number
            ]
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
            "alt_margin": string,
            "margin_over_second": number,
            "notes": string,
            "sources": [
                number, number
            ]
        },
        ...
    ],
    "sources": [
        string,
        string,
        ...,
        string
    ]
}

```

Here is a detailed explanation of each field:

### root
<br>

`men` - An array of objects containing race data for the men's fours (<i><b>NL</b></i> Oude Vieren)
<br>
`women` - An array of objects containing race data for the women's fours (<i><b>NL</b></i> Dames Vieren)
<br>
`sources` - An array of strings containing links to sources used

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
This difference may not have been recorded / be difficult to find for older races so in that case the difference is "00,00"
<br>
`alt_margin` - The alternative margin string if the margin (historically) is not numerical. Some older editions store the margins in 'lengths' and such terms. <b>This field is empty (`""`) by default, so if it is NOT, then the alternative margin MUST be used.</b>
<br>
`notes` - Optional notes for each race. Can contain trivia facts or important information about how a race transpired.
<br>
`sources` - List of indeces into `sources` array

### crew
<br>

`name` - The name of the crew member

The position of the rower in the boat is tied to his index in the `crew` array, and is numbered as such (copying the way [time-team](https://time-team.nl) does it):
<br>
```
crew
[
    stroke,
    3,
    2,
    bow,
    cox
]
```


# LEGAL NOTICE

I am not a lawyer, and never will be (never say never, but in this case I will say: never). I do need to say that the document in this repo 'varsity_matrix.pdf' is NOT my property. It is out there on the internet though, so I hope I'm not infringing on some crazy copyright law. Again, it aint mine
<br>
<br>
You can find the original here: https://web.archive.org/web/20030918025009/http://www.mijnlieff.nl/sport/roeien/varsity/varsity%20matrix.pdf (if internet archive doesn't get deleted, in which case: Hey alien civilization! Hope you're enjoying your stroll through the ashes of our once mediocre society)