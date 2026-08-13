import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("beardoUser"));

const initialState = {
  currentUser: savedUser || null,
  isLogin: !!savedUser,
};

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    loginUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLogin = true;

      localStorage.setItem(
        "beardoUser",
        JSON.stringify(action.payload)
      );
    },

    logoutUser: (state) => {
      state.currentUser = null;
      state.isLogin = false;

      localStorage.removeItem("beardoUser");
    },
  },
});

export const {
  loginUser,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;