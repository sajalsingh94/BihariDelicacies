import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
	_id: string;
	email: string;
	name?: string;
	role: 'user' | 'seller' | 'admin';
};

export type UserState = {
	sessionToken?: string;
	currentUser?: User | null;
};

const initialState: UserState = {
	currentUser: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<User | null>) {
			state.currentUser = action.payload;
		},
		setSessionToken(state, action: PayloadAction<string | undefined>) {
			state.sessionToken = action.payload;
		},
	}
});

export const { setUser, setSessionToken } = userSlice.actions;
export default userSlice.reducer;