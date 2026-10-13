const flaskepostKnap = document .querySelector("#message-bottle");
flaskepostKnap.addEventListener("click", function() {
alert("Flaskeposten åbnes! Her kommer en hemmelig besked.");
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