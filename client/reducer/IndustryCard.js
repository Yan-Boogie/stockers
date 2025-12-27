// @flow

import {
  FETCH_INDUSTRY_CARD_DATA,
} from '../actions/IndustryCard';

type State = {

}

export default (state: State = {
  IndustryCardData: [],
}, action: any) => {
  switch (action.type) {
    case FETCH_INDUSTRY_CARD_DATA:
      return {
        ...state,
        IndustryCardData: action.industryCardData,
      };

    default:
      return state;
  }
};
