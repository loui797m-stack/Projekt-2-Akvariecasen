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

    if (knap && billede) {
      // 2. Lyt efter klik på knappen
      knap.addEventListener('click', function(){

          // Skift straks til nutte 2 (animationen fortsætter uforstyrret)
          billede.src = 'svg/louises_nutte2.svg';

        // Hvis uret allerede kører, så nulstil det
        // (ellers skifter nutten tilbage for tidligt, hvis man klikker to gange)
        clearTimeout(nutteUr);

    // Efter 10 sekunder (10000 millisekunder) skifter vi tilbage til den normale nutte
    nutteUr = setTimeout(function () {
     billede.src = "svg/louises_nutte1.svg";
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
}