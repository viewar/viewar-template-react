import { combineReducers } from 'redux';
import GeneralReducer from './generalReducer';

export function viewarReducers() {
  return combineReducers({
    viewar_general: GeneralReducer,
  });
}