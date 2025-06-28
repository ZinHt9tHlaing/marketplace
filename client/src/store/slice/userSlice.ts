import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "../../types/user";

interface AuthState {
  user: UserType | null;
}

const initialState: AuthState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export default userSlice.reducer;
export const { setUser, clearUser } = userSlice.actions;
