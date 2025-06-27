import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  userId: string | null;
}

const initialState: AuthState = {
  userId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUserId } = userSlice.actions;
