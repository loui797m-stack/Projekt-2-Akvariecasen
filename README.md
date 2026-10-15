# Akvarium – Storcenter Nord

Et skoleprojekt, hvor vi har designet og udviklet en interaktiv løsning til akvariet i Storcenter Nords kælder. Storcenter Nord er en fiktiv kunde, og løsningen er ikke lavet på bestilling.

**Gruppe:** Oksana, Klaudia, Peter og Louise
**Periode:** 2. oktober – 19. oktober 2026 (kick-off til pitch)

## Om opgaven

Storcenter Nord har et stort akvarium, som primært henvender sig til børn og børnefamilier. Ved akvariet står en touchskærm, som i dag ikke bruges. Vores opgave var at designe og udvikle en interaktiv løsning, der formidler indholdet i akvariet og styrker læring, interaktion og oplevelse.

Løsningen skal:

- indeholde animation og interaktion
- bruge egne designede og animerede assets
- være udviklet i HTML, CSS og JavaScript
- tage afsæt i Storcenter Nords visuelle identitet og tone of voice
- have to niveauer: en oversigtsvisning og en detaljevisning
- bruge fisk som primært objekt, med mindst 8 attributter

## Vores løsning

Børn kan trykke på en fisk i akvariet. Så vises en kort tekst, og fisken "siger" noget med lyd og animation. Når oplevelsen er slut, forsvinder teksten igen, og barnet kan trykke på en ny fisk.

## Målgruppe

Vi har afgrænset målgruppen til **børn i alderen 3-4 år**, med forældrene som en vigtig del af konteksten. Vores persona er **Emma, 4 år**.

## Fisk og attributter

Objektet er **fisk**. Hver fisk har disse attributter i `js/fiskData.js`: navn, levested, kendetegn, sjovt faktum, mad, lydfil, animerede dele og farve.

| ID   | Dyr                   | Lavet af |
| ---- | --------------------- | -------- |
| F001 | Hornfisk              | Klaudia  |
| F002 | Konge-febars          | Klaudia  |
| F003 | Papegøjefisk          | Oksana   |
| F004 | Søhest                | Louise   |
| F005 | Pincetfisk            | Louise   |
| F006 | Krabbe                | Louise   |
| F007 | Nutte (pindsvinefisk) | Louise   |
| F008 | Hammerhaj             | Louise   |

## Visuel identitet

Løsningen tager udgangspunkt i Storcenter Nords style tile: logo, farver og typografi (Apex New). Dyrene er tegnet i en blød, farverig stil med store øjne, så de er venlige og nemme at genkende for børn. Animationerne er rolige, fordi forældrene fortalte, at hurtigt skiftende billeder og høje lyde kan overstimulere barnet.

## Teknologi

- **HTML5** med semantiske elementer (`main`, `section`, `header`, `dialog`)
- **CSS** i ekstern fil, med CSS-animationer til svømning og bevægelse
- **JavaScript** i eksterne filer, med event-baseret interaktion (klik på fisk, luk infoboks, åbn kort)
- **Assets:** egne vektortegninger lavet i Figma og animeret med Figma Motion (SVG)
- **Data:** fiskene ligger som objekter i `fiskData.js`, og JavaScript henter oplysningerne ud fra fiskens `data-fish-id`

## Mappestruktur

```
/
├── index.html
├── elastic-mesh.js
├── css/
│   ├── css.css
│   └── Baggrund.svg
├── js/
│   ├── js.js
│   └── fiskData.js
├── svg/        (dyr, baggrund, bobler, kort, ikoner)
├── mp3/        (lydfiler)
└── README.md
```

## Kilder

- Storcenter Nords hjemmeside og udleverede style tile
- Interviews med tre forældre og egne observationer ved akvariet
- Wierød Borčak, L. (2023). _Forskning i sammenhængen mellem sang og børns sproglige udvikling._ Videncenter for Sang. https://videncenterforsang.dk/forskning-i-sproglige-udvikling/

**Links**

- [Se den færdige løsning (GitHub Pages)](https://loui797m-stack.github.io/Projekt-2-Akvariecasen/)
- [Se github reposetory (GitHub Pages)](https://github.com/loui797m-stack/Projekt-2-Akvariecasen.git)
- [Se Figma-filen](https://www.figma.com/design/NuM6LB1B0xLlm6kVyUTPF6/Projekt-2--Akvariecasen---design?node-id=0-1&t=2TFTbqRiTh0XJ4OC-1)
- [Se vores pitch-slides](https://www.figma.com/deck/bBrUbancnNgPeA6CuWrLi2)

## Kendte begrænsninger og videre arbejde

Løsningen er ikke testet på børn i målgruppen. Det her er ikke med i den nuværende version, men kunne være næste skridt:

- **"Afspil sang"-knap:** Lyden starter i dag automatisk, når barnet trykker på en fisk. En egen knap ville give barnet og forælderen mere kontrol.
- **Stop-knap til lyd:** Lyden stopper, når infoboksen lukkes, men der er ingen separat knap til at stoppe sangen, mens boksen er åben.
- **Klovnefisk:** To af forældrene fortalte, at deres barn leder efter Nemo i akvariet. Klovnefisken findes i akvariet, men er ikke lavet endnu.
- **Brugertest:** Løsningen er ikke afprøvet på børn i alderen 3-4 år og deres forældre.
