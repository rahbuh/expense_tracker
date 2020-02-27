import moment from "moment";

const formatDisplayDate = date => {
  return moment(date).format("MM/DD/YYYY");
};

const formatInputDate = date => {
  return moment(date).format("YYYY-MM-DD");
}

export { formatDisplayDate, formatInputDate };
