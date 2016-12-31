
import type { Action } from './types';

export const UPDATE_SCORE = 'UPDATE_SCORE';
export const RESET_SCORES = 'RESET_SCORES';

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
