let lyd;

// Find "DYK NED" knappen
const diveBtn = document.getElementById("dive-btn");

if (diveBtn) {
    diveBtn.addEventListener("click", function() {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
    });
}

// Find flaskeposten og dialog-overlayet
const flaskepostKnap = document.querySelector("#message-bottle");
const mapOverlay = document.getElementById("map-overlay");

// Åbn kortet semantisk korrekt
flaskepostKnap.addEventListener("click", function() {
    mapOverlay.showModal(); 
});

// Luk kortet igen, uanset hvor man klikker på skærmen
mapOverlay.addEventListener("click", function() {
    mapOverlay.close(); 
});

// Vent til HTML-siden er helt indlæst
document.addEventListener('DOMContentLoaded', function() {

    //Find knappen og billedet i HTML
    const knap = document.getElementById('louises_nutte');
    const billede = document.getElementById('nutte_img');

    // 2. Lyt efter klik på knappen
    knap.addEventListener('click', function(){

        // Skift straks til nutte 2 (animationen fortsætter uforstyrret)
        billede.src = 'svg/louises_nutte2.svg';

        // Vent 10 sekunder og skift tilbage til nutte 1
        setTimeout(function(){
            billede.src = 'svg/louises_nutte1.svg';
        }, 10000);

    });

});

//Når vi klikker på en fisk, finder JavaScript fiskens ID, slår den op i vores data og viser dens oplysninger i boksen.
function visFisk(event) {
  // Find fiskens ID
  const fiskId = event.currentTarget.dataset.fishId;
  //- event = det, der skete. I vores tilfælde et klik.
  //- currentTarget = knappen, som vi har sat klikfunktionen på.
  // dataset.fishId = henter fiskens ID fra HTML-attributten data-fish-id.

  // Find fisken i vores liste
  const fisk = fishData.find(fisk => fisk.id === fiskId);

  // Vis fiskens oplysninger
  document.getElementById("fishName").textContent = fisk.name;
  document.getElementById("fishHabitat").textContent =
    "Levested: " + fisk.habitat;
  document.getElementById("fishFact").textContent =
    "Sjov fakta: " + fisk.funFact;
    
  // Vis boksen
  document.getElementById("fishInfo").hidden = false;

// NY KODE: Frys fiskene
document.body.classList.add("frys-fisk");

  // Afspil fiskens lyd
lyd = new Audio(fisk.audioFile);
lyd.play();
}


// Gør hammerhajen klikbar
document.getElementById("hammerhaj").addEventListener("click", visFisk);

// Gør søhesten klikbar
document.getElementById("soehest").addEventListener("click", visFisk);

// Gør søhesten klikbar
document.getElementById("louises_nutte").addEventListener("click", visFisk);

// Luk boksen og stop musikken
document.getElementById("closeFishInfo").addEventListener("click", function() {
  document.getElementById("fishInfo").hidden = true;
document.body.classList.remove("frys-fisk");

 if (lyd) {
    lyd.pause();
    lyd.currentTime = 0;
  }
});