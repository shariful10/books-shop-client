import { RootState } from "@/redux/store";
import { TAuthState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TAuthState = {
	user: JSON.parse(localStorage.getItem("user") || "null"),
	token: JSON.parse(localStorage.getItem("token") || "null"),
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<TAuthState>) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
			localStorage.setItem("user", JSON.stringify(state.user));
			localStorage.setItem("token", JSON.stringify(state.token));
		},
		logOut: (state) => {
			state.user = null;
			state.token = null;
			localStorage.removeItem("user");
			localStorage.removeItem("token");
		},
	},
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;
export const useCurrentToken = (state: RootState) => state.auth?.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
