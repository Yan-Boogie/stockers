// @flow

import moment from 'moment';

const SHEET_TYPES = {
  BALANCE_SHEET: '資產負債表',
  CASH_FLOW: '現金流量表',
  COMPREHENSIVE_INCOME: '綜合損益表',
  DIVIDEND: '配股配息與除權息',
};

const dividendDataTypes = [{
  id: 'cash_dividend',
  name: '現金股利',
}, {
  id: 'ex_dividend_date',
  name: '除息日',
}, {
  id: 'ex_right_date',
  name: '除權日',
}, {
  id: 'pay_year',
  name: '支付年',
}, {
  id: 'price_before_dividend',
  name: '除權息前之股價',
}, {
  id: 'stock_dividend',
  name: '股票股利',
}];

function prettifySheetData(sheetData, typeName) {
  const removeChipNames = ['_id', 'code', 'report_date', 'year', 'season', 'ticker', 'belongs_year'];

  const sheetChipsSet = sheetData.reduce((set, el) => {
    const chipNames = Object.keys(el);

    chipNames.forEach((chipName) => {
      if (!~removeChipNames.indexOf(chipName)) {
        if (typeName === SHEET_TYPES.DIVIDEND) {
          set.add(dividendDataTypes.find(type => type.id === chipName).name);
        } else {
          set.add(chipName);
        }
      }
    });

    return set;
  }, new Set());

  const sheetChips = Array.from(sheetChipsSet);

  if (typeName === SHEET_TYPES.DIVIDEND) {
    return {
      name: typeName,
      isProgression: false,
      chipInfos: sheetChips.map(chip => ({
        chipName: chip,
        chipData: sheetData.map(info => ({
          date: moment(info.belongs_year).format('YYYY'),
          value: info[dividendDataTypes.find(type => type.name === chip).id],
        })).sort((cursorA, cursorB) => moment(cursorB.date).format('x') - moment(cursorA.date).format('x')),
      })),
    };
  }

  return {
    name: typeName,
    isProgression: !(typeName === SHEET_TYPES.BALANCE_SHEET),
    chipInfos: sheetChips.map(chip => ({
      chipName: chip,
      chipData: sheetData.map(info => ({
        date: moment(`${info.year}-${info.season * 3}`).format('YYYY-MM'),
        value: info[chip],
      })).sort((cursorA, cursorB) => moment(cursorB.date).format('x') - moment(cursorA.date).format('x')),
    })),
  };
}

export function prettifyStockData(data) {
  const balanceSheet = prettifySheetData(data.BalanceSheet, SHEET_TYPES.BALANCE_SHEET);

  const cashFlow = prettifySheetData(data.CashFlow, SHEET_TYPES.CASH_FLOW);

  const comprehensiveIncome = prettifySheetData(
    data.ComprehensiveIncom, SHEET_TYPES.COMPREHENSIVE_INCOME
  );

  const dividend = prettifySheetData(data.Dividend, SHEET_TYPES.DIVIDEND);

  return {
    companyId: data.company_id,
    companyName: data.company_name,
    balanceSheet,
    cashFlow,
    comprehensiveIncome,
    dividend,
  };
}

export default prettifyStockData;
