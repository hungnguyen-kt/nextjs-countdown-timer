import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Event } from './type'

export interface CounterState {
  events: Event[];
}

const initialState: CounterState = {
  events: [],
};

export const counterSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.events = [];
    },
    decrement: (state) => {
      state.events = [];
    },
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state = {
        ...state,
        events: [...state.events],
      };
    },
    addEvent: (state, action: PayloadAction<Event>) => {
      console.log('addEvent :>> ', action.payload);
      state = {
        ...state,
        events: [...state.events, action.payload],
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, setEvents, addEvent } = counterSlice.actions;

export default counterSlice.reducer;
