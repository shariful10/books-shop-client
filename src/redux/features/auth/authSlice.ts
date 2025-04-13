import { RootState } from "@/redux/store";
import { TAuthState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TAuthState = {
	user: null,
	token: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<TAuthState>) => {
			const { user, token } = action.payload;
			state.user = user;
			state.token = token;
		},
		logOut: (state) => {
			state.user = null;
			state.token = null;
		},
	},
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;
export const useCurrentToken = (state: RootState) => state.auth?.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
