module.exports = {
  format_date: (date) => {
    return date.toLocaleString().split(",")[0];
  },
  
  optionSelect: (optionValue, dataValue) => {
    if (optionValue == dataValue) {
      return "selected";
    }
    return;
  },

  hideEmpty: (value) => {
    if (Array.isArray(value)){
      if (value.length === 0) {
        return "hidden";
      }
    } else {
      if (value == null) {
        return "hidden";
      }
    }
  },

  checkFalse: (value) => {
    return value !== false ? true : false;
  }
};