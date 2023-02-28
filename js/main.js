"use strict";

// Fix height of app in mobile browsers

// const mainCont = document.querySelector(".main-container");

// mainCont.style.height = `${window.innerHeight}px`;
// document.body.style.height = `${window.innerHeight}px`;

const results = document.querySelector(".results");
const izracunajBtn = document.querySelector(".izracunaj-btn");

const resultFond = document.querySelector(".result-fond");
const resultPorez = document.querySelector(".result-porez");
const resultTO = document.querySelector(".result-to");
const resultPrekovremeni = document.querySelector(".result-prekovremeni");
const resultUkupno = document.querySelector(".result-ukupno");

izracunajBtn.addEventListener("click", function () {
  const satnica = document.querySelector("#satnica").value;
  const fond = document.querySelector("#fond").value;
  const satiOdradjeno = document.querySelector("#ukupno-sati").value;
  const trecaSmjena = document.querySelector("#treca-smjena").value;
  const godisnjiOdmor = document.querySelector("#godisnji-odmor").value;
  const bolovanje = document.querySelector("#bolovanje").value;
  const praznik = document.querySelector("#praznik").value;
  //   results.style.bottom = "0";
  //   results.style.transform = `translateY(-${
  //     izracunajBtn.getBoundingClientRect().height
  //   }px)`;

  if (window.innerWidth > 912) {
    results.style.transform = "translateY(0%)";
  } else {
    results.style.transform = "translateY(0%)";
    results.style.bottom = `${izracunajBtn.getBoundingClientRect().height}px`;
  }

  // Pretvaranje dana u sate

  const godisnjiOdmorSati = godisnjiOdmor * 8;
  const bolovanjeSati = bolovanje * 8;
  const praznikSati = praznik * 8;

  // Računanje fonda sati bez godisnjeg odmora, bolovanja i praznika

  const cistiFond =
    fond - godisnjiOdmorSati - bolovanjeSati - praznikSati - trecaSmjena;
  const cistiFondZaradjeno = cistiFond * satnica;

  // Racunanje zarade za trecu smjenu, godisnji odmor, bolovanje i praznik

  const trecaSmjenaZaradjeno = trecaSmjena * (satnica * 1.25);
  const godisnjiOdmorZaradjeno = godisnjiOdmorSati * satnica;
  const bolovanjeZaradjeno = bolovanjeSati * (satnica * 0.8);
  const praznikZaradjeno = praznikSati * satnica;

  // Ukupno zaradjeno za fond sati

  const fondUkupnoZaradjeno =
    cistiFondZaradjeno +
    trecaSmjenaZaradjeno +
    godisnjiOdmorZaradjeno +
    bolovanjeZaradjeno +
    praznikZaradjeno;

  // Računanje toplog obroka

  const topliObrok =
    ((fond - godisnjiOdmorSati - praznikSati - bolovanjeSati) / 8) * 10;

  // Racunanje poreza

  const porez = (fondUkupnoZaradjeno - 300) * 0.1;

  // Racunanje prekovremenih sati

  const prekovremeniSatiZaradjeno = (satiOdradjeno - fond) * (satnica * 1.25);

  // Ukupno

  const ukupnoZaradjeno =
    fondUkupnoZaradjeno - porez + topliObrok + prekovremeniSatiZaradjeno;

  // Prikazivanje podataka

  resultFond.textContent = fondUkupnoZaradjeno.toFixed(2);
  resultPorez.textContent = porez.toFixed(2);
  resultTO.textContent = topliObrok.toFixed(2);
  resultPrekovremeni.textContent = prekovremeniSatiZaradjeno.toFixed(2);
  resultUkupno.textContent = ukupnoZaradjeno.toFixed(2);
});

// Zatvaranje rezultata kada se klikne na input polje

const inputPolja = document.querySelectorAll("input");

inputPolja.forEach((input) => {
  input.addEventListener("focus", function () {
    results.style.transform = "translateY(100%)";
  });
});
