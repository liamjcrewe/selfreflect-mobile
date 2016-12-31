
import type { Action } from './types';

export const UPDATE_SCORE = 'UPDATE_SCORE';

export function updateScore(index:int, score:int):Action {
  return {
    type: UPDATE_SCORE,
    payload: {
      index,
      score,
    }
  };
}
