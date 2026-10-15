let lyd;

// Find "DYK NED" knappen
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

// Find flaskeposten og dialog-overlayet
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

    //Find knappen og billedet i HTML
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

//Når vi klikker på en fisk, finder JavaScript fiskens ID, slår den op i vores data og viser dens oplysninger i boksen.
function visFisk(event) {
   if (lyd) {
    lyd.pause();
  }

  const fiskId = event?.currentTarget?.dataset?.fishId;
  if (!fiskId) {
    return;
  }

  const fisk = fishData.find(fisk => fisk.id === fiskId);
  if (!fisk) {
    return;
  }

  const fishName = document.getElementById("fishName");
  const fishHabitat = document.getElementById("fishHabitat");
  const fishFact = document.getElementById("fishFact");
  const fishInfo = document.getElementById("fishInfo");

  if (fishName) fishName.textContent = fisk.name;
  if (fishHabitat) fishHabitat.textContent = "Jeg bor i… " + fisk.habitat;
  if (fishFact) fishFact.textContent = "Vidste du, at… " + fisk.funFact;

  document.querySelector(".valgt-fisk")?.classList.remove("valgt-fisk");

  if (event.currentTarget) {
    event.currentTarget.classList.add("valgt-fisk");
  }

  if (fishInfo) fishInfo.hidden = false;
  document.body.classList.add("frys-fisk");

  lyd = new Audio(fisk.audioFile);
  lyd.play();
}

const fishButtons = [
  "hornfisk",
  "konge-febars",
  "papegoejefisk",
  "soehest",
  "pincetfisk",
  "crab-1",
  "louises_nutte",
  "hammerhaj"
];

fishButtons.forEach((id) => {
  const button = document.getElementById(id);
  if (button) {
    button.addEventListener("click", visFisk);
  }
});

const closeFishInfo = document.getElementById("closeFishInfo");
const fishInfo = document.getElementById("fishInfo");

if (closeFishInfo) {
  closeFishInfo.addEventListener("click", function() {
    if (fishInfo) fishInfo.hidden = true;
    document.body.classList.remove("frys-fisk");
    document.querySelector(".valgt-fisk")?.classList.remove("valgt-fisk");

    if (lyd) {
      lyd.pause();
      lyd.currentTime = 0;
    }
  });
}