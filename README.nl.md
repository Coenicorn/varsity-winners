[![en](https://img.shields.io/badge/lang-en-green)](https://github.com/Coenicorn/varsity-winners/blob/master/README.md)


# Varsity Winnaars

De [Varsity](https://knsrb.nl/varsity/) is een historisch Nederlands roei-evenement waarbij de beste studentenploegen uit het hele land strijden om de 'Oude Vier' (de top heren [gestuurde vier](https://nl.wikipedia.org/wiki/Gestuurde_vier)).

De eerste editie van dit evenement werd gehouden in 1878 en het wordt sindsdien consequent geroeid. Het winnen van de Varsity is werkelijk iets buitengewoons, en een belangrijk doel voor elke studentroeier. Veel van de grote olympische roeiers van Nederland hebben deze race gewonnen en hebben verklaard dat het evenement hetzelfde gewicht heeft als zelfs grote internationale wedstrijden.

Daarom mogen roeiers die deze race hebben gewonnen niet worden vergeten. Dat is de filosofie achter deze verzameling.

:white_check_mark: Gegevens die teruggaan tot de eerste Varsity in 1878
<br>
:white_check_mark: Namen van roeiers en stuurlieden
<br>
:white_check_mark: Racetijden
<br>
:white_check_mark: Bronvermelding
<br>
:white_check_mark: Data en Locaties

## Dankbaarheid

Een groot deel van dit project zou niet mogelijk zijn geweest zonder enkele bronnen die uitgebreide gegevens hebben verzameld over oudere edities van de Varsity, gegevens die zelfs het bereik van deze dataset overstijgen. Bedankt aan hen!

Hier zijn die bronnen als je zelf een kijkje wilt nemen:
- [boot samenstelling](https://web.archive.org/web/20030918025009/http://www.mijnlieff.nl/sport/roeien/varsity/varsity%20matrix.pdf)
- ['Stand der overwinningen'](https://web.archive.org/web/20080412011202/http://www.knsrb.nl/index.php?id=189%2C0%2C0%2C1%2C0%2C0)

## Bijdragen

Zoals in elke historische dataset wordt extra data altijd zeer gewaardeerd. Als je iets weet over specifieke edities van de Varsity die van waarde kunnen zijn, open dan een issue en we kunnen samen deze dataset verbeteren! Als je direct wilt bijdragen, open dan een pull request!

Trivia en leuke feitjes worden ook altijd gewaardeerd!

Belangrijke punten ter verbetering:

* De meeste namen in dit document zijn afgekort, omdat de belangrijkste bron die ik heb gebruikt dit ook doet. Als je een van de volledige namen weet, wijzig ze dan in de niet-afgekorte versies en dien een pull request in!

## Bestanden

De dataset bestaat uit 2 bestanden: varsity_winners.json en varsity_winners_sources.json. Het eerste bestand slaat de gegevens op voor elke race en het tweede de bronnen die voor het eerste zijn gebruikt. Deze bronnen zijn links naar gegevensbronnen op het hele web. Een gedetailleerde beschrijving van het json-schema is hieronder te vinden.

## Schema

Hieronder volgt een gedetailleerde beschrijving van het JSON-schema voor het bestand `varsity_winners.json`.

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

`men` - Een array van objecten met gegevens over de herenraces
<br>
`women` - Een array van objecten met gegevens over de vrouwenraces
<br>
`version` - Een string om de huidige versie op te slaan
De gegevens voor elke race zijn zo geordend dat de meest recente Varsity altijd op `data.men[0]` en `data.women[0]` respectievelijk staat.

`date` - De datum van het evenement, geformatteerd als volgt: "DD-MM-JJ"
<br>
`location` - De locatie van het evenement.
<br>
`crew` - Een array van objecten met gegevens over de bemanning voor elk bemanningslid.
<br>
`club` - De naam van de winnende vereniging.
<br>
`time` - De totale tijd die de winnaar nodig had om de race te voltooien, geformatteerd als volgt: "00:00,00" (minuten, seconden, honderdsten)
<br>
`margin` - Het totale verschil in tijd waarmee de winnaar sneller was dan de nummer twee, geformatteerd als volgt: "00,00" (seconden, honderdsten).
Dit verschil is mogelijk niet geregistreerd / moeilijk te vinden voor oudere races, dus in dat geval is het verschil "00,00".
<br>
`alt_margin` - De alternatieve marge-string als de marge (historisch) niet numeriek is. Sommige oudere edities slaan de marges op in 'lengtes' en dergelijke termen. <b>Dit veld is standaard leeg (`""`), dus als het NIET leeg is, moet de alternatieve marge worden gebruikt.</b>
<br>
`notes` - Een array met notities voor elke race. Kan trivia of belangrijke informatie bevatten over hoe een race is verlopen.
<br>
`sources` - Lijst van indexen in de bronnenarray die te vinden is in `varsity_winners_sources.json`

`name` - De naam van het bemanningslid

De positie van de roeier in de boot is gekoppeld aan zijn index in de `crew` array, die als volgt wordt gevuld:
<br>
```javascript
[
    boeg,
    ...
    slag,
    stuur
]
```

Sommige eerdere races hadden 8 roeiers + stuurman in plaats van de moderne 4 + stuurman, dus elk programma dat deze dataset gebruikt zal met deze uitzondering moeten omgaan.

* De vrouwen Varsity wordt geroeid in een stuurloze vier, dus bij het openen van de gegevens voor de vrouwenraces is er geen stuurman in de bemanningslijst. Dit moet dynamisch worden afgehandeld.
