import { fromJS } from 'immutable';
import { SET_LOADING } from '../constants/actionTypes';

const initialState = fromJS(
  {
    loading: false,
  });

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return state.set('loading', action.bool);
    default:
      return state;
  }
};
