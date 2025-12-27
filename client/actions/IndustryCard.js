// @flow

export const FETCH_INDUSTRY_CARD_DATA = 'INDUSTRY/FETCH_INDUSTRY_CARD_DATA';

export function fetchIndustryCardData(industryCardData) {
  return {
    type: FETCH_INDUSTRY_CARD_DATA,
    industryCardData,
  };
}
