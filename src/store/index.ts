import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Guess {
  name: string;
  nationality: {
    countryCode: string | null;
    probability: number;
  };
  gender: {
    gender: string | null;
    probability: number;
  };
}

interface GuessesSliceState {
  guesses: Guess[];
}

const initialState: GuessesSliceState = {
  guesses: [],
};

export const guessesSlice = createSlice({
  name: 'guesses',
  initialState,
  reducers: {
    addGuess: (state, action: PayloadAction<Guess>) => {
      state.guesses = [...state.guesses, action.payload];
    },
  },
});

export const { addGuess } = guessesSlice.actions;

// Store creation
const store = configureStore({
  reducer: {
    guesses: guessesSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export const selectGuesses = (state: RootState) => state.guesses;

export default store;
