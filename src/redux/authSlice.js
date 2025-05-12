import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	uid: null,
	email: null,
	isLoggedIn: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.uid = action.payload.uid;
			state.email = action.payload.email;
			state.isLoggedIn = true;
		},
		logoutSuccess: (state) => {
			state.uid = null;
			state.email = null;
			state.isLoggedIn = false;
		},
	},
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;