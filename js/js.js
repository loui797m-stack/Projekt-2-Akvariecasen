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


// 5. VIS FISKENS OPLYSNINGER OG PLACER BOKSEN
// ------------------------------------------------------------
function visFisk(klikHaendelse) {
  const trykketKnap = klikHaendelse.currentTarget;
  const fiskId = trykketKnap.dataset.fishId;

  const valgtFisk = fishData.find(function (enkeltFisk) {
    return enkeltFisk.id === fiskId;
  });

  if (!valgtFisk) return;

  // Stop den tidligere lyd
  if (lyd) {
    lyd.pause();
  }

  // Skriv fiskens oplysninger
  document.getElementById("fishName").textContent = valgtFisk.name;

  document.getElementById("fishHabitat").textContent =
    "Jeg bor i… " + valgtFisk.habitat;

  document.getElementById("fishFact").textContent =
    "Vidste du, at… " + valgtFisk.funFact;

  // Fjern markeringen fra den tidligere fisk
  const forrigeValgteFisk = document.querySelector(".valgt-fisk");

  if (forrigeValgteFisk) {
    forrigeValgteFisk.classList.remove("valgt-fisk");
  }

  // Fremhæv den valgte fisk og pausér svømningen
  trykketKnap.classList.add("valgt-fisk");
  document.body.classList.add("frys-fisk");

  // Vis boksen og beregn dens placering
  fishInfo.hidden = false;
  fishInfo.scrollTop = 0;
  placerFaktaboks(trykketKnap);

  // Afspil fiskens sang
  lyd = new Audio(valgtFisk.audioFile);
  lyd.play();
}

// Find plads til faktaboksen uden at dække den valgte fisk
function placerFaktaboks(fiskeKnap) {
  if (!fishInfo || fishInfo.hidden) return;

  const afstand = 16;
  const skaermBredde = document.documentElement.clientWidth;
  const skaermHoejde = window.innerHeight;

  // Nulstil en eventuel midlertidig flytning
  fiskeKnap.style.setProperty("--fisk-flyt-x", "0px");
  fiskeKnap.style.setProperty("--fisk-flyt-y", "0px");

  // Start med boksens størrelse fra CSS
  fishInfo.style.width = "";
  fishInfo.style.maxHeight = "";

  const fisk = fiskeKnap.getBoundingClientRect();
  const normalBredde = fishInfo.getBoundingClientRect().width;

  // Mål pladsen på begge sider af fisken
  const pladsVenstre = Math.max(0, fisk.left - afstand * 2);

  const pladsHoejre = Math.max(
    0,
    skaermBredde - fisk.right - afstand * 2
  );

  const bedstePlads = Math.max(pladsVenstre, pladsHoejre);
  const boksBredde = Math.min(normalBredde, bedstePlads);

  // Placér boksen på den side, der har mest plads
  if (boksBredde >= Math.min(240, normalBredde)) {
    fishInfo.style.width = boksBredde + "px";

    if (pladsVenstre >= pladsHoejre) {
      fishInfo.style.left = afstand + "px";
    } else {
      fishInfo.style.left =
        skaermBredde - boksBredde - afstand + "px";
    }

    return;
  }

  // Hvis der ikke er plads ved siden af:
  // Placér fisken over boksen i den nederste halvdel
  const pladsTilBoks =
    skaermHoejde / 2 - fisk.height - afstand * 3;

  fishInfo.style.width = normalBredde + "px";
  fishInfo.style.left =
    (skaermBredde - normalBredde) / 2 + "px";
  fishInfo.style.maxHeight = Math.max(0, pladsTilBoks) + "px";

  const boks = fishInfo.getBoundingClientRect();

  const flytX =
    skaermBredde / 2 - (fisk.left + fisk.width / 2);
  const flytY = boks.top - afstand - fisk.bottom;

  fiskeKnap.style.setProperty("--fisk-flyt-x", flytX + "px");
  fiskeKnap.style.setProperty("--fisk-flyt-y", flytY + "px");
}

// Opdatér placeringen, når vinduet eller fiskebilledet ændres
function opdaterFaktaboksPlacering() {
  const valgtFisk = document.querySelector(".valgt-fisk");

  if (valgtFisk && fishInfo && !fishInfo.hidden) {
    placerFaktaboks(valgtFisk);
  }
}

window.addEventListener("resize", opdaterFaktaboksPlacering);

// Håndterer også, at Nutte skifter billede
document.addEventListener("load", function (haendelse) {
  if (haendelse.target instanceof HTMLImageElement) {
    opdaterFaktaboksPlacering();
  }
}, true);

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