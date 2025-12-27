// @flow

function replaceCalString(content) {
  if (/%/.test(content)) {
    const { index: percentageIndex } = content.match(/%/);
    let operatorIndex = 0;

    operatorIndex = content.indexOf('>');

    if (operatorIndex !== -1) {
      if (content.indexOf('>=') !== -1) {
        operatorIndex += 1;
      }
    } else {
      operatorIndex = content.indexOf('<');

      if (operatorIndex !== -1) {
        if (content.indexOf('<=') !== -1) {
          operatorIndex += 1;
        }
      } else {
        operatorIndex = content.indexOf('=');
      }
    }

    const subString = content.substr(0, operatorIndex + 1);

    const covertNumber = parseFloat(content.slice(operatorIndex + 1, percentageIndex)) / 100;

    const newContent = subString + covertNumber.toString();

    return newContent;
  }

  return content;
}

function getValue(type, name, chipData, rowId, date) {
  const {
    chipData: data,
  } = chipData;

  switch (type) {
    case 'GRID':
      return parseInt(data[rowId].value, 10);

    case 'DATE': {
      const dataIndex = data.findIndex(e => e.date === date);

      return parseInt(data[dataIndex].value, 10);
    }

    case 'AVERAGE':
      return (parseInt(data[0].value, 10) + parseInt(data[1].value, 10) + parseInt(data[2].value, 10)) / 3;

    case 'LARGE':
      return parseInt((Math.max(
        ...data.slice(0, 3).map(d => d.value)
      )), 10);

    default:
      return parseInt(data[rowId].value, 10);
  }
}

export default function getModuleAlertion(math, stockData) {
  const chipList = Object.values(stockData).reduce((list, el) => {
    if (!el.chipInfos) return list;

    return [
      ...list,
      ...el.chipInfos,
    ];
  }, []);

  const chipsValue = math.chipInfos.map((mathChip) => {
    const {
      type,
      name,
      rowId,
      date,
    } = mathChip.chipData;

    const value = getValue(type, name, chipList.find(chip => chip.chipName === name), rowId, date);

    return {
      ...mathChip,
      value,
    };
  });

  const subStringList = chipsValue.map(chip => ({
    stringName: math.content.substring(chip.FROM, chip.TO),
    value: chip.value,
  }));

  const calString = subStringList.reduce((string, subString) => {
    const {
      stringName,
      value,
    } = subString;

    return string.replace(stringName, value);
  }, math.content);

  const newString = replaceCalString(calString);

  return eval(newString);
}
