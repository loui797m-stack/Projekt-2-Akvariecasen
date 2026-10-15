<<<<<<< Updated upstream
// js.js, Akvarie-projektet (Storcenter Nord)
// 1. VARIABLER DER BRUGES FLERE STEDER
// ------------------------------------------------------------
// Her gemmer vi den lyd, der spiller lige nu (så vi kan stoppe den igen)
let lyd;

// Her gemmer vi et "ur", der skifter nutten tilbage til normal efter 10 sekunder
let nutteUr;


// Infoboksen og luk-knappen findes i HTML. Vi henter dem én gang her
const fishInfo = document.getElementById("fishInfo");
const closeFishInfo = document.getElementById("closeFishInfo");


// 2. "DYK NED!"-KNAPPEN
//    Knappen vipper som gelé og scroller ned til havbunden
// ------------------------------------------------------------
// kilde: https://l.facebook.com/l.php?u=https%3A%2F%2Fuiverse.io%2FFelip-r3y%2Fcowardly-dolphin-76%3Futm_source%3Dchatgpt.com%26fbclid%3DIwZXh0bgNhZW0CMTAAcGRvZgVicmlkETB0RlVQNG1MdHIySThLOGVXc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHlyKNHooFe9JAo7rvnQNqLyEa_KmDEZNCuQeWBEsYAhlttDUq4Ochmrqb4K9_aem_7SiJUyJ1qdgeeqnsZ44MaA&h=AUBg6vsdUg9sE2PABQH0fBEtz0FRdyDZTeNU5UUvsd5fIPRTHWwjLGumUMuhcRmSVEUYA_8Oi5-rZUl3kvTK0sST700xovcHtLozLsYDE-wyV2IenSOqjzL6in3WqVA
(() => {
  const button = document.getElementById("dive-btn");
  if (!button) return;
=======
/*
  AKVARIET — JAVASCRIPT

  OVERBLIK
  1. Lyd, som koden skal huske
  2. DYK NED-knappen: animation og scroll
  3. Flaskeposten: åbn og luk kortet
  4. Nutte: skift mellem de to billeder
  5. Valgt fisk: fakta, fremhævning og sang
  6. Forbind fiskeknapperne med klikfunktionen
  7. Luk faktaboksen, og fortsæt svømningen
>>>>>>> Stashed changes

  HTML-filen skal indlæse denne fil med defer, som den allerede gør:
  <script src="js/js.js" defer></script>

  Det sikrer, at HTML-elementerne findes, når koden køres.

  fishData kommer fra fiskData.js, der skal indlæses før denne fil.
  Linjer med // og denne indledning er forklaringer til os mennesker.
*/


// ============================================================
// 1. LYD, SOM KODEN SKAL HUSKE
// ============================================================

// let bruges her, fordi variablen får en ny lyd, når en fisk vælges.
let aktivFiskelyd;


<<<<<<< Updated upstream
// 3. FLASKEPOSTEN OG KORTET
//    Klik på flaskeposten åbner et kort. Klik på kortet lukker det
// ------------------------------------------------------------
const flaskepostKnap = document.querySelector("message-bottle");
const kortVindue = document.getElementById("map-overlay");

// Vi gør kun noget, hvis begge dele findes
if (flaskepostKnap && kortVindue) {
  // Åbn kortet semantisk korrekt
  flaskepostKnap.addEventListener("click", function() {
      kortVindue.showModal();
  });

  // Luk kortet igen, uanset hvor man klikker på skærmen
 kortVindue.addEventListener("click", function () {
    kortVindue.close();
  });
}


// 4. NUTTE (pindsvinefisken)
//    Når man klikker, puster den sig op i 10 sekunder
// ------------------------------------------------------------
    // Find nutte-knappen og nutte-billedet i HTML
    const knap = document.getElementById('louises_nutte');
    const billede = document.getElementById('nutte_img');
=======
// ============================================================
// 2. DYK NED-KNAPPEN: ANIMATION OG SCROLL
// ============================================================

// Find knappen i HTML via dens id. const holder fast i denne knap.
const dykNedKnap = document.getElementById("dive-btn");

// Gem animationen, så den kan afbrydes, før en ny begynder.
let dykKnapAnimation;

function afspilKnapAnimation() {
  // Spring animationen over, hvis knappen mangler.
  if (!dykNedKnap) return;

  // Respektér brugerens indstilling om reduceret bevægelse.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // ?. betyder, at cancel kun kaldes, hvis der findes en animation.
  dykKnapAnimation?.cancel();

  // scale ændrer bredden og højden under animationen.
  // offset angiver tidspunktet fra 0 (start) til 1 (slut).
  dykKnapAnimation = dykNedKnap.animate(
    [
      { scale: "1 1", offset: 0 },
      { scale: "1.25 0.75", offset: 0.3 },
      { scale: "0.75 1.25", offset: 0.4 },
      { scale: "1.15 0.85", offset: 0.5 },
      { scale: "0.95 1.05", offset: 0.65 },
      { scale: "1.05 0.95", offset: 0.75 },
      { scale: "1 1", offset: 1 }
    ],
    { duration: 900, easing: "linear" } // Varighed: 900 millisekunder.
  );
}

function dykTilBunden() {
  afspilKnapAnimation();

  // Scroll ned til sidens bund med en glidende bevægelse.
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth"
  });
}

function animerKnapVedMus(haendelse) {
  // Hover-animationen bruges kun, når markøren er en mus.
  if (haendelse.pointerType === "mouse") {
    afspilKnapAnimation();
  }
}

// addEventListener forbinder en hændelse med en funktion.
if (dykNedKnap) {
  dykNedKnap.addEventListener("click", dykTilBunden);
  dykNedKnap.addEventListener("pointerenter", animerKnapVedMus);
}
>>>>>>> Stashed changes


// ============================================================
// 3. FLASKEPOSTEN: ÅBN OG LUK KORTET
// ============================================================

<<<<<<< Updated upstream
        // Hvis uret allerede kører, så nulstil det
        // (ellers skifter nutten tilbage for tidligt, hvis man klikker to gange)
        clearTimeout(nutteUr);

    // Efter 10 sekunder (10000 millisekunder) skifter vi tilbage til den normale nutte
    nutteUr = setTimeout(function () {
      nutteBillede.src = "svg/louises_nutte1.svg";
    }, 10000);
  });
}

// 5. VIS FISKENS OPLYSNINGER
//    Når man trykker på en fisk, sker det her:
//    1) Gammel lyd stopper
//    2) Vi finder fiskens ID (fx "F008")
//    3) Vi slår fisken op i fiskData.js
//    4) Vi skriver oplysningerne i infoboksen og viser den
//    5) Fiskene holder pause, og fiskens lyd afspilles
// ------------------------------------------------------------
function visFisk(klikHaendelse) {

  // 1) Hvis en lyd spiller, så stop den
  if (lyd) {
    lyd.pause();
  }

  // 2) Hvilken knap blev der trykket på?
  const trykketKnap = klikHaendelse.currentTarget;

  // Hvilket nummer har fisken? Det står i HTML som data-fish-id (fx "F008")
  const fiskId = trykketKnap.dataset.fishId;

  // 3) Find fisken i listen "fishData" (den ligger i fiskData.js)
  //    find() kigger på én fisk ad gangen og stopper, når id'et passer
  const valgtFisk = fishData.find(function (enkeltFisk) {
    return enkeltFisk.id === fiskId;
  });

  // Hvis fisken ikke findes i listen, gør vi ikke mere
  if (!valgtFisk) {
    return;
  }

  // 4) Skriv fiskens oplysninger ind i infoboksen
  const fiskNavn = document.getElementById("fishName");
  const fiskLevested = document.getElementById("fishHabitat");
  const fiskSjovtFaktum = document.getElementById("fishFact");

  fiskNavn.textContent = valgtFisk.name;
  fiskLevested.textContent = "Jeg bor i… " + valgtFisk.habitat;
  fiskSjovtFaktum.textContent = "Vidste du, at… " + valgtFisk.funFact;

  // Fjern markeringen fra den fisk, der var valgt før
  const forrigeValgteFisk = document.querySelector(".valgt-fisk");

  if (forrigeValgteFisk) {
    forrigeValgteFisk.classList.remove("valgt-fisk");
  }

  // Marker den fisk, der lige er trykket på
  trykketKnap.classList.add("valgt-fisk");

  // Vis infoboksen (den er skjult fra start)
  fishInfo.hidden = false;

  // 5) Få alle fisk til at holde pause
  //    JavaScript sætter bare en klasse på body. CSS'en gør selve arbejdet
  document.body.classList.add("frys-fisk");

  // Afspil fiskens lyd
  lyd = new Audio(valgtFisk.audioFile);
  lyd.play();
}

// 6. GØR FISKENE KLIKBARE
//    Listen herunder er id'erne på fiskenes knapper i HTML.
//    Står der en ny fisk i HTML, så skriv dens id her også.
// ------------------------------------------------------------
const fishButtons = [
  "hornfisk",        // F001
  "konge-febars",    // F002
  "papegoejefisk",   // F003
  "soehest",         // F004
  "pincetfisk",      // F005
  "crab-1",          // F006 (krabben)
  "louises_nutte",   // F007
  "hammerhaj"        // F008
];

// Gå listen igennem og få hver knap til at køre visFisk ved klik
fishButtons.forEach((id) => {
  const button = document.getElementById(id);
  if (button) {
    button.addEventListener("click", visFisk);
  }
});

// 7. LUK INFOBOKSEN
//    Boksen skjules, fiskene svømmer videre, og lyden stopper
// ------------------------------------------------------------
if (closeFishInfo) {
  closeFishInfo.addEventListener("click", function () {

    // Skjul boksen
    fishInfo.hidden = true;

    // Lad fiskene svømme videre
    document.body.classList.remove("frys-fisk");

    // Fjern markeringen af den valgte fisk
    const valgtFisk = document.querySelector(".valgt-fisk");
    if (valgtFisk) {
      valgtFisk.classList.remove("valgt-fisk");
    }

 // Stop lyden og spol den tilbage til start
    if (lyd) {
      lyd.pause();
      lyd.currentTime = 0;
    }
  });
=======
const flaskepostKnap = document.getElementById("message-bottle");
const kortDialog = document.getElementById("map-overlay");

function aabnKort() {
  kortDialog.showModal();
}

function lukKort() {
  kortDialog.close();
}

// Forbind kun funktionerne, hvis både knappen og dialogen findes.
if (flaskepostKnap && kortDialog) {
  flaskepostKnap.addEventListener("click", aabnKort);
  kortDialog.addEventListener("click", lukKort);
}


// ============================================================
// 4. NUTTE: SKIFT MELLEM DE TO BILLEDER
// ============================================================

const nutteKnap = document.getElementById("louises_nutte");
const nutteBillede = document.getElementById("nutte_img");

function gendanNutteBillede() {
  nutteBillede.src = "svg/louises_nutte1.svg";
}

function pustNutteOp() {
  // src bestemmer, hvilken billedfil HTML-billedet viser.
  nutteBillede.src = "svg/louises_nutte2.svg";

  // Kald gendanNutteBillede efter 10.000 millisekunder = 10 sekunder.
  setTimeout(gendanNutteBillede, 10000);
}

if (nutteKnap && nutteBillede) {
  nutteKnap.addEventListener("click", pustNutteOp);
}


// ============================================================
// 5. VALGT FISK: FAKTA, FREMHÆVNING OG SANG
// ============================================================

// Alle fisk deler én faktaboks. Indholdet skiftes ved hvert klik.
const fiskeNavnFelt = document.getElementById("fishName");
const fiskeLevestedFelt = document.getElementById("fishHabitat");
const fiskeFaktaFelt = document.getElementById("fishFact");
const fiskeInfoBoks = document.getElementById("fishInfo");

function visFisk(haendelse) {
  // Stop en eventuel tidligere sang, så to sange ikke spiller samtidig.
  if (aktivFiskelyd) {
    aktivFiskelyd.pause();
  }

  // currentTarget er fiskeknappen, der håndterer klikket.
  const valgtFiskeKnap = haendelse?.currentTarget;
  if (!valgtFiskeKnap) return;

  // dataset.fishId læser knappens data-fish-id, fx "F004".
  const valgtFiskeId = valgtFiskeKnap.dataset.fishId;
  if (!valgtFiskeId) return;

  // find søger i fishData. === sammenligner de to ID'er.
  const valgtFisk = fishData.find(function harSammeFiskeId(fiskeData) {
    return fiskeData.id === valgtFiskeId;
  });

  // Afslut funktionen, hvis ID'et ikke findes i fiskedataene.
  if (!valgtFisk) return;

  // textContent ændrer teksten inde i et HTML-element.
  // name, habitat og funFact er de eksisterende felter i fiskData.js.
  if (fiskeNavnFelt) {
    fiskeNavnFelt.textContent = valgtFisk.name;
  }

  if (fiskeLevestedFelt) {
    fiskeLevestedFelt.textContent = "Jeg bor i… " + valgtFisk.habitat;
  }

  if (fiskeFaktaFelt) {
    fiskeFaktaFelt.textContent = "Vidste du, at… " + valgtFisk.funFact;
  }

  // Fjern klassen fra den tidligere valgte fisk, hvis der er en.
  const tidligereValgtFisk = document.querySelector(".valgt-fisk");

  if (tidligereValgtFisk) {
    tidligereValgtFisk.classList.remove("valgt-fisk");
  }

  // CSS bruger denne klasse til at løfte fisken frem og give den lys.
  valgtFiskeKnap.classList.add("valgt-fisk");

  // hidden = false viser boksen.
  if (fiskeInfoBoks) {
    fiskeInfoBoks.hidden = false;
  }

  // CSS bruger denne klasse til at pause fiskene og dæmpe baggrunden.
  document.body.classList.add("frys-fisk");

  // Opret og afspil lyden fra fiskens audioFile-felt.
  aktivFiskelyd = new Audio(valgtFisk.audioFile);
  aktivFiskelyd.play();
}


// ============================================================
// 6. FORBIND FISKEKNAPPERNE MED KLIKFUNKTIONEN
// ============================================================

// En liste (array) med fiskeknappernes eksisterende HTML-id'er.
const fiskeKnapIdListe = [
  "hornfisk",       // F001: Hornfisk
  "konge-febars",   // F002: Konge-febars
  "papegoejefisk",  // F003: Papegøjefisk
  "soehest",        // F004: Søhest
  "pincetfisk",     // F005: Pincetfisk
  "crab-1",         // F006: Krabbe
  "louises_nutte",  // F007: Nutte / pindsvinefisk
  "hammerhaj"       // F008: Hammerhaj
];

// forEach udfører funktionen én gang for hvert ID i listen.
fiskeKnapIdListe.forEach(function tilfoejKlikTilFisk(fiskeKnapId) {
  const fiskeKnap = document.getElementById(fiskeKnapId);

  if (fiskeKnap) {
    fiskeKnap.addEventListener("click", visFisk);
  }
});


// ============================================================
// 7. LUK FAKTABOKSEN, OG FORTSÆT SVØMNINGEN
// ============================================================

const lukFiskeInfoKnap = document.getElementById("closeFishInfo");

function lukFiskeInfo() {
  // hidden = true skjuler boksen.
  if (fiskeInfoBoks) {
    fiskeInfoBoks.hidden = true;
  }

  // Fjern klassen, så CSS lader fiskene svømme og fjerner dæmpningen.
  document.body.classList.remove("frys-fisk");

  // Fjern lyset fra den valgte fisk.
  const valgtFiskeKnap = document.querySelector(".valgt-fisk");

  if (valgtFiskeKnap) {
    valgtFiskeKnap.classList.remove("valgt-fisk");
  }

  // Stop sangen, og sæt afspilningen tilbage til begyndelsen.
  if (aktivFiskelyd) {
    aktivFiskelyd.pause();
    aktivFiskelyd.currentTime = 0;
  }
}

if (lukFiskeInfoKnap) {
  lukFiskeInfoKnap.addEventListener("click", lukFiskeInfo);
>>>>>>> Stashed changes
}