import moment from "moment";

const formatDisplayDate = date => {
  return moment.utc(date).format("MM/DD/YYYY");
};

const formatInputDate = date => {
  return moment.utc(date).format("YYYY-MM-DD");
};

const formatDisplayAmount = amount => {
  return amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export {
  formatDisplayDate,
  formatInputDate,
  formatDisplayAmount
};
