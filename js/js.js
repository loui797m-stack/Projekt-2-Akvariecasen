// js.js, Akvarie-projektet (Storcenter Nord)
// 1. VARIABLER DER BRUGES FLERE STEDER
// ------------------------------------------------------------
// Her gemmer vi den lyd, der spiller lige nu (så vi kan stoppe den igen)
let lyd;


// Infoboksen og luk-knappen findes i HTML. Vi henter dem én gang her
const fishInfo = document.getElementById("fishInfo");
const closeFishInfo = document.getElementById("closeFishInfo");


// 2. "DYK NED!"-KNAPPEN
//    Knappen vipper som gelé og scroller ned til havbunden
// ------------------------------------------------------------
// kilde: 
(() => {
  const button = document.getElementById("dive-btn");
  if (!button) return;

  let wobble;

  function playJelly() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    wobble?.cancel();

    wobble = button.animate(
      [
        { scale: "1 1", offset: 0 },
        { scale: "1.25 0.75", offset: 0.3 },
        { scale: "0.75 1.25", offset: 0.4 },
        { scale: "1.15 0.85", offset: 0.5 },
        { scale: "0.95 1.05", offset: 0.65 },
        { scale: "1.05 0.95", offset: 0.75 },
        { scale: "1 1", offset: 1 }
      ],
      { duration: 900, easing: "linear" }
    );
  }

  // Click or tap: wobble and scroll to the BOTTOM
  button.addEventListener("click", () => {
    playJelly();

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    });
  });

  // Mouse hover: wobble
  button.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse") playJelly();
  });
})();

// 3. FLASKEPOSTEN OG KORTET
//    Klik på flaskeposten åbner et kort. Klik på kortet lukker det
// ------------------------------------------------------------
const flaskepostKnap = document.querySelector("#message-bottle");
const mapOverlay = document.getElementById("map-overlay");

if (flaskepostKnap && mapOverlay) {
  // Åbn kortet semantisk korrekt
  flaskepostKnap.addEventListener("click", function() {
      mapOverlay.showModal();
  });

  // Luk kortet igen, uanset hvor man klikker på skærmen
  mapOverlay.addEventListener("click", function() {
      mapOverlay.close();
  });
}

// Vent til HTML-siden er helt indlæst
document.addEventListener('DOMContentLoaded', function() {

// 4. NUTTEN (pindsvinefisken)
//    Når man klikker, puster den sig op i 10 sekunder
// ------------------------------------------------------------
    const knap = document.getElementById('louises_nutte');
    const billede = document.getElementById('nutte_img');

    if (knap && billede) {
      // 2. Lyt efter klik på knappen
      knap.addEventListener('click', function(){

          // Skift straks til nutte 2 (animationen fortsætter uforstyrret)
          billede.src = 'svg/louises_nutte2.svg';

          // Vent 10 sekunder og skift tilbage til nutte 1
          setTimeout(function(){
              billede.src = 'svg/louises_nutte1.svg';
          }, 10000);

      });
    }

});

// 5. VIS FISKENS OPLYSNINGER
//    Når man trykker på en fisk, sker det her:
//    1) Gammel lyd stopper
//    2) Vi finder fiskens ID (fx "F008")
//    3) Vi slår fisken op i fiskData.js
//    4) Vi skriver oplysningerne i infoboksen og viser den
//    5) Fiskene holder pause, og fiskens lyd afspilles
// ------------------------------------------------------------
function visFisk(event) {
  // 1) Stop lyden fra den forrige fisk
   if (lyd) {
    lyd.pause();
  }
 // 2) Hvilken fisk blev trykket på? Det står i HTML som data-fish-id
  const fiskId = event?.currentTarget?.dataset?.fishId;
  if (!fiskId) {
    return;
  }

  // 3) Find fisken i listen fishData (ligger i fiskData.js)
  const fisk = fishData.find(fisk => fisk.id === fiskId);

  // Hvis fisken ikke findes i listen, gør vi ikke mere
  if (!fisk) {
    return;
  }

  // 4) Skriv fiskens oplysninger ind i infoboksen
  const fishName = document.getElementById("fishName");
  const fishHabitat = document.getElementById("fishHabitat");
  const fishFact = document.getElementById("fishFact");
  const fishInfo = document.getElementById("fishInfo");

  if (fishName) fishName.textContent = fisk.name;
  if (fishHabitat) fishHabitat.textContent = "Jeg bor i… " + fisk.habitat;
  if (fishFact) fishFact.textContent = "Vidste du, at… " + fisk.funFact;

  document.querySelector(".valgt-fisk")?.classList.remove("valgt-fisk");

  // Marker den valgte fisk (fjern først markeringen fra den forrige)

  if (event.currentTarget) {
    event.currentTarget.classList.add("valgt-fisk");
  }
  // Vis infoboksen

  if (fishInfo) fishInfo.hidden = false;

  // 5) Få alle fisk til at holde pause (CSS gør selve arbejdet)
  document.body.classList.add("frys-fisk");

  // Afspil fiskens lyd
  lyd = new Audio(fisk.audioFile);
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
}