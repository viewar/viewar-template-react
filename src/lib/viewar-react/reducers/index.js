import { combineReducers } from 'redux';
import GeneralReducer from './generalReducer';

export default function viewarReducers() {
  return combineReducers({
    viewar_general: GeneralReducer,
  });
}