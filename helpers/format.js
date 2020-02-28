const formatInputAmount = amount => {
  return String(parseFloat(amount).toFixed(2));
};

module.exports = formatInputAmount;
