import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer/userReducer';
import positionReducer from './positionReducer/positionReducer';
import roomReducer from './roomReducer/roomReducer';
export const store = configureStore({
    reducer: {
        users: userReducer,
        positions: positionReducer,
        rooms: roomReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch