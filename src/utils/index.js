const currencyFormat = (val = 0) => `₱${(val / 100).toFixed(2)}`;

const utils = {
  currencyFormat,
};

export default utils;
