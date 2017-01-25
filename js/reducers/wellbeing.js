
import type { Action } from '../actions/types';
import {
  UPDATE_SCORE,
  RESET_SCORES,
  SET_HISTORY,
  UPDATE_HISTORY
} from '../actions/wellbeing';

import { append, slice } from 'ramda'

const initialState = {
  scores: [0, 0, 0, 0, 0, 0, 0],
  history: []
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === UPDATE_SCORE) {
    let newScores = [...state.scores]
    newScores[action.payload.index] = action.payload.score
    return {
      ...state,
      scores: newScores,
    };
  }

  if (action.type === RESET_SCORES) {
    return {
      ...state,
      scores: initialState.scores
    };
  }

  if (action.type === SET_HISTORY) {
    return {
      ...state,
      history: action.payload.history,
    };
  }

  if (action.type === UPDATE_HISTORY) {
    // If already have 5, remove first
    const oldHistory
      = state.history.length !== 5
      ? state.history
      : slice(1, 5, state.history)

    return {
      ...state,
      // append new history
      history: append(action.payload.history, oldHistory)
    };
  }

  return state;
}
