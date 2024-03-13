import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAuth = createAsyncThunk('auth/fetchUserData', async (params) => {
    const { data } = await axios.post('/auth/login', params);

    return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/register', params);

    return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchUserDataMe', async () => {
    const { data } = await axios.get('/auth/me');

    return data;
});

const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducer: {
        logout: (state) => {
            state.data = null;
        },
    },
    extraReducers: {
        [fetchAuth.pending]: (state, action) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuth.rejected]: (state, action) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchAuthMe.pending]: (state, action) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuthMe.rejected]: (state, action) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchRegister.pending]: (state, action) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchRegister.rejected]: (state, action) => {
            state.status = 'error';
            state.data = null;
        },
    },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
// export const selectIsAuth = (state) => !Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
// 3:36:13