
import type { Action } from './types';

export const UPDATE_SCORE = 'UPDATE_SCORE';
export const RESET_SCORES = 'RESET_SCORES';
export const SET_HISTORY = 'SET_HISTORY';
export const UPDATE_HISTORY = 'UPDATE_HISTORY';

export function updateScore(index:int, score:int):Action {
  return {
    type: UPDATE_SCORE,
    payload: {
      index,
      score,
    }
  };
}

export function resetScores():Action {
  return {
    type: RESET_SCORES
  };
}

export function setHistory(history):Action {
  return {
    type: SET_HISTORY,
    payload: {
      history
    }
  };
}

export function updateHistory(history):Action {
  return {
    type: UPDATE_HISTORY,
    payload: {
      history
    }
  }
}
