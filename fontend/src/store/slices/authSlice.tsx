import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { AuthState, LoginRequest, LoginResponse } from '@/types/Auth.d';
import { loginService, logoutService } from '@/services/authServices';
import { sessionService } from '@/services/sessionServices';

const token = sessionService.getToken();
const user = sessionService.getUser();

const initialState: AuthState = {
	isAuth: !!token && !!user,
	user,
	token,
	expiryTime: null,
	loading: false,
	error: null,
};

export const loginUser = createAsyncThunk<
	LoginResponse,
	LoginRequest,
	{ rejectValue: string }
>('auth/loginUser', async (dataLogin, { rejectWithValue }) => {
	try {
		const res = await loginService(dataLogin);
		return res;
	} catch (err: unknown) {
		if (err instanceof Error) return rejectWithValue(err.message);
		return rejectWithValue('Login failed');
	}
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
	'auth/logoutUser',
	async (_, { rejectWithValue }) => {
		try {
			await logoutService(sessionService.getToken() || "");
			sessionService.clearSession(); // Xóa sessionStorage
		} catch (err: unknown) {
			if (err instanceof Error) return rejectWithValue(err.message);
			return rejectWithValue('Logout failed');
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// Login
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.isAuth = true;
				state.user = action.payload.result.user;
				state.token = action.payload.result.token;
				state.expiryTime = action.payload.result.expiryTime;

				sessionService.setSession(
					action.payload.result.token,
					action.payload.result.user
				);
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? 'Login failed';
			})
			// Logout
			.addCase(logoutUser.fulfilled, (state) => {
				state.isAuth = false;
				state.user = null;
				state.token = null;
				state.expiryTime = null;
				state.error = null;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.error = action.payload ?? 'Logout failed';
			});
	},
});

export default authSlice.reducer;
