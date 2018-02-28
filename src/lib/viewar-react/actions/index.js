import { SET_LOADING } from '../constants/actionTypes';

export const setLoading = bool => ({
  type: SET_LOADING,
  bool,
});