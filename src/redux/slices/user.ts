import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../axios";
import { UserState } from "../../@types/user";
//
import { dispatch } from "../store";
// ----------------------------------------------------------------------

const initialState: UserState = {
  isLoading: false,
  error: null,
  user: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET CURRENT USER
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
      // console.log(action.payload);
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

export function getCurrentUser(page: number, pageSize: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const data = await axios.get("https://randomuser.me/api/", {
        params: { page, results: pageSize },
      });

      dispatch(slice.actions.getUserSuccess(data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
