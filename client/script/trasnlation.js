function getLang(a) {
  localStorage.setItem("Lang", a);
  location.reload();
}

arrLang = {
  en: {
    categories: "CATEGORY",
    back: "Back",
    dining: "DINING LOCATION",
    in: "Take in",
    out: "Take out",
    payement: "WHO WOULD YOU LIKE TO PAY ?",
    cc: "CREDIT CARD",
    cash: "CASH AT COUNTER",
    language: "language",
  },
  fr: {
    categories: "CATEGORIE",
    back: "Retour",
    dining: "OPTIONS DE RESTAURATION",
    in: "Sur place",
    out: "Emporté",
    payement: "COMMENT VOUDEREZ-VOUS PAYER ?",
    cc: "CARTE CREDIT",
    cash: "PAYER EN ESPÈCES",
    language: "langue",
  },
  ar: {
    categories: "الفئة",
    back: "العودة",
    dining: "خيارات الطعام",
    in: "في المنطقة",
    out: "اندفع",
    payement: "كيف تريد أن تدفع؟",
    cc: "بطاقة إئتمان",
    cash: "الدفع نقدا",
    language: "logha",
  },
};

function translate() {
  var elements = document.getElementsByClassName("lang");
  var lang = localStorage.getItem("Lang");

  for (let index = 0; index < elements.length; index++) {
    elements.item(index).innerHTML =
      arrLang[lang][elements.item(index).getAttribute("key")];
  }
}
