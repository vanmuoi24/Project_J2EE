import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { AuthState, LoginRequest } from '@/types/Auth.d';
import { loginService, logoutService, refreshTokenService } from '@/services/authServices';
import { sessionService } from '@/services/sessionServices';


const initialState: AuthState = {
	isAuth: false,
	user: null,
	token: null,
	expiryTime: null,
	loading: false,
	error: null,
};

export const loginUser = createAsyncThunk('auth/loginUser', async (dataLogin: LoginRequest, { rejectWithValue }) => {
	try {
		const res = await loginService(dataLogin);
		return res;
	} catch (err: unknown) {
		if (err instanceof Error) return rejectWithValue(err.message);
		return rejectWithValue('Đăng nhập thất bại');
	}
});


export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const res = await refreshTokenService(sessionService.getToken() || "");
		return res;
      } catch (err: unknown) {
			if (err instanceof Error) return rejectWithValue(err.message);
			return rejectWithValue('Refresh token thất bại');
    }
  }
);

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
	'auth/logoutUser',
	async (_, { rejectWithValue }) => {
		try {
			await logoutService(sessionService.getToken() || "");
			sessionService.clearSession();
		} catch (err: unknown) {
			if (err instanceof Error) return rejectWithValue(err.message);
			return rejectWithValue('Đăng xuất thành công');
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		
	},
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
				state.user = action.payload?.result.user;
				state.token = action.payload?.result.token;
				state.expiryTime = action.payload?.result.expiryTime;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = typeof action.payload === 'string' ? action.payload : "Đăng nhập thất bại";
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
				state.error = typeof action.payload === 'string' ? action.payload : "Đăng xuất thất bại";

			})

			//refresh
			.addCase(refreshToken.fulfilled, (state, action) => {
			state.token = action.payload.result.token;
			state.expiryTime = action.payload.result.expiryTime;
			state.user = action.payload.result.user;
			state.isAuth = true;

			})
			.addCase(refreshToken.rejected, (state) => {
			state.isAuth = false;
			state.token = null;
			state.user = null;
			state.expiryTime = null;
			});
	},
});

export default authSlice.reducer;

// export const {restoreSession} = authSlice.actions;