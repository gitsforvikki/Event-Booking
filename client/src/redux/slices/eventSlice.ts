import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as userUtil from "../../utils/userUtil";
import * as tokenUtil from "../../utils/tokenUtil";

interface Event {
  _id: string;
  user: string;
  name: string;
  image: string;
  date: string;
  type: "FREE" | "PRO";
  price: number;
  info: string;
  created: string;
  __v: number;
}

interface EventState {
  events: Event[];
  singleEvent: Event | null;
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  events: [],
  singleEvent: null,
  loading: false,
  error: null,
};

export const getFreeEvents = createAsyncThunk(
  "event/getFreeEvents",
  async (_, { rejectWithValue }) => {
    try {
      const productUrl = `${
        import.meta.env.VITE_APP_EXPRESS_SERVER
      }/api/event/free`;
      const response = await axios.get(productUrl);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch events"
      );
    }
  }
);

//get paid events
export const getProEvents = createAsyncThunk(
  "event/getProEvents",
  async (_, { rejectWithValue }) => {
    if (userUtil.getToken()) {
      tokenUtil.setAuthToken(userUtil.getToken());
    }
    try {
      const productUrl = `${
        import.meta.env.VITE_APP_EXPRESS_SERVER
      }/api/event/pro`;
      const response = await axios.get(productUrl);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch events"
      );
    }
  }
);

//get single event
export const getSingleEvent = createAsyncThunk(
  "event/getSingleEvent",
  async (id: string, { rejectWithValue }) => {
    try {
      const productUrl = `${
        import.meta.env.VITE_APP_EXPRESS_SERVER
      }/api/event/${id}`;
      const response = await axios.get(productUrl);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch event"
      );
    }
  }
);

export const EventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get free events
      .addCase(getFreeEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFreeEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.FreeEvents;
        state.error = null;
      })
      .addCase(getFreeEvents.rejected, (state, action) => {
        state.events = [];
        state.loading = false;
        state.error = action.payload as string;
      })
      //get pro events
      .addCase(getProEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.ProEvents;
        state.error = null;
      })
      .addCase(getProEvents.rejected, (state, action) => {
        state.events = [];
        state.loading = false;
        state.error = action.payload as string;
      })
      //get single event
      .addCase(getSingleEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.singleEvent = action.payload.event;
        state.error = null;
      })
      .addCase(getSingleEvent.rejected, (state, action) => {
        state.singleEvent = null;
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default EventSlice.reducer;
