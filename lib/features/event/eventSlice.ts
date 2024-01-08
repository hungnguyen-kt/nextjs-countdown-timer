import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface Event {
  id: number;
  title: string;
  date: Date;
}

export interface CounterState {
  events: Event[];
}

const initialState: CounterState = {
  events: [
    {
      id: 1,
      title: 'Tet Holiday',
      date: new Date('2024-12-01'),
    },
    {
      id: 2,
      title: 'School Day',
      date: new Date('2024-08-08'),
    },
    {
      id: 3,
      title: 'New Job Day',
      date: new Date('2024-01-10'),
    },
    {
      id: 4,
      title: 'Birthday Party',
      date: new Date('2024-02-18'),
    },
  ],
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
    incrementByAmount: (state, action: PayloadAction<{}>) => {
      const event: Event = action.payload as Event;
      state.events = state.events.push(event);
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
