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
    addEvent: (state, action: PayloadAction<Event>) => {
      const events = [...state.events, action.payload];
      return { ...state, events };
    },

    removeEvent: (state, action: PayloadAction<string>) => {
      const events = state.events.filter((event) => event.id !== action.payload);
      return { ...state, events };
    },

    clearEvent: (state) => {
      return { ...state, events: [] };
    }
  },
});

// Action creators are generated for each case reducer function
export const { addEvent, removeEvent, clearEvent } = counterSlice.actions;

export default counterSlice.reducer;
