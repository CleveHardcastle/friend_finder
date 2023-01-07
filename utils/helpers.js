module.exports = {
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
  }
};