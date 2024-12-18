import { ADD_PROFILE, REMOVE_PROFILE, CALCULATE_AVERAGE_AGE } from "./actions";

const initialState = { profiles: [], avgAge: 0 };

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROFILE:
      return { ...state, profiles: [...state.profiles, action.payload] };
    case REMOVE_PROFILE:
      return {
        ...state,
        profiles: state.profiles.filter(
          (profile) => profile.id != action.payload
        ),
      };
    case CALCULATE_AVERAGE_AGE:
      return {
        ...state,
        profiles: [...state.profiles],
        avgAge: state.profiles.reduce(
          (acc, curr) => acc + curr.age / state.profiles.length,
          0
        ),
      };
    default:
      return state;
  }
};
