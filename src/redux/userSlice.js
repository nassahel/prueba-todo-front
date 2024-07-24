import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialState = {
    token: null,
    user: null,
    userType: null,
    userId: null
};

const getInitialState = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            return {
                token,
                user: decodedToken.username,
                userType: decodedToken.userType,
                userId: decodedToken.id
            };
        } catch (error) {
            console.error('Token decoding failed:', error);
        }
    }
    return initialState;
};

const userSlice = createSlice({
    name: 'auth',
    initialState: getInitialState(),
    reducers: {
        setCredentials: (state, action) => {
            const { token } = action.payload;
            localStorage.setItem('token', token);
            try {
                const decodedToken = jwtDecode(token);
                state.token = token;
                state.user = decodedToken.username;
                state.userType = decodedToken.userType;
                state.userId = decodedToken.id;
            } catch (error) {
                console.error('Token decoding failed:', error);
            }
        },
        logout: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.user = null;
            state.userType = null;
            state.userId = null;
        },
    },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
