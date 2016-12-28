
import type { Action } from './types';

export const SET_USER_ID = 'SET_USER_ID';
export const SET_TOKEN = 'SET_TOKEN';

export function setUserId(id:int):Action {
  return {
    type: SET_USER_ID,
    payload: id,
  };
}

export function setToken(token:string):Action {
  return {
    type: SET_TOKEN,
    payload: token,
  };
}
