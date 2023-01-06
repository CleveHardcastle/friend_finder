module.exports = {
  optionSelect: (optionValue, dataValue) => {
    if (optionValue == dataValue) {
      return "selected";
    }
    return;
  }
};