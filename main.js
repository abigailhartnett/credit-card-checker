// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5,
];

// Add your functions below:

let validCards = [];
let invalidCards = [];

const validateCred = (creditCard) => {
  // reverse number, skip first digit, multiply by 2
  const check = creditCard
    .toReversed()
    .filter((i, index) => {
      return index % 2 !== 0;
    })
    .map((i) => {
      let digit = i * 2;
      if (digit > 9) {
        return digit - 9;
      } else {
        return digit;
      }
    });

  // add all together, check remainder of dividing by 10
  let remainder =
    (check.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    ) +
      creditCard
        .toReversed()
        .filter((i, index) => {
          return index % 2 === 0;
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)) %
    10;

  // returns "is valid?"
  if (remainder > 0) {
    invalidCards.push(creditCard);
  } else {
    validCards.push(creditCard);
  }
};

const findInvalidCards = (cardBatch) => {
  for (i = 0; i < cardBatch.length; i++) {
    validateCred(cardBatch[i]);
  }
  return invalidCards;
};

findInvalidCards(batch);

const idInvalidCompanies = (invalidCards) => {
  let amexCount = 0;
  let visaCount = 0;
  let mastercardCount = 0;
  let discoverCount = 0;
  let otherCount = 0;
  let invalidCardIssuers = [];
  for (let i = 0; i < invalidCards.length; i++) {
    let issuerCode = invalidCards[i][0];
    let invalidCardIndex = invalidCards.indexOf(invalidCards[i]);
    if (issuerCode === 3 && amexCount < 1) {
      invalidCardIssuers.push("Amex");
      amexCount++;
    } else if (issuerCode === 4 && visaCount < 1) {
      invalidCardIssuers.push("Visa");
      visaCount++;
    } else if (issuerCode === 5 && mastercardCount < 1) {
      invalidCardIssuers.push("masterCard");
      mastercardCount++;
    } else if (issuerCode === 6 && discoverCount < 1) {
      invalidCardIssuers.push("Discover");
      discoverCount++;
    } else if (issuerCode <= 2 || issuerCode >= 7) {
      invalidCardIssuers.push("Other");
      otherCount++;
    }
  }
  return invalidCardIssuers;
};

console.log(idInvalidCompanies(invalidCards));
