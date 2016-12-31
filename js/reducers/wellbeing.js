
import type { Action } from '../actions/types';
import { UPDATE_SCORE, RESET_SCORES } from '../actions/wellbeing';

export type State = {
  scores: Array<int>
}

const initialState = {
  scores: [0, 0, 0, 0, 0, 0, 0]
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
    return initialState;
  }

  return state;
}
