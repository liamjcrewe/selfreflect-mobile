
import type { Action } from '../actions/types';
import { SET_USER_ID, SET_TOKEN } from '../actions/user';

export type State = {
    id: int,
    token: string
}

const initialState = {
  id: 0,
  token: ''
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_USER_ID) {
    return {
      ...state,
      id: action.payload,
    };
  }
  if (action.type === SET_TOKEN) {
    return {
      ...state,
      token: action.payload,
    };
  }
  return state;
}
