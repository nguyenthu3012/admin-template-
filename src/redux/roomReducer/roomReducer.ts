import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RoomModel } from '../../Models/RoomModel/RoomModel';
import { http } from '../../util/config';
import { AppDispatch } from '../configureStore';

export type RoomState = {
    rooms: RoomModel[],
    roomPagination: RoomModel[],
}

const initialState: RoomState = {
    rooms: [],
    roomPagination: []
}

const roomReducer = createSlice({
  name: 'roomReducer',
  initialState,
  reducers: {
    getAllRoomAction: (state: RoomState, action: PayloadAction<RoomModel[]>) => {
        state.rooms = action.payload
    },
    getRoomPagAction: (state: RoomState, action: PayloadAction<RoomModel[]>) => {
        state.roomPagination = action.payload
    }
  }
});

export const {getAllRoomAction, getRoomPagAction} = roomReducer.actions

export default roomReducer.reducer

// async thunk
export const getAllRoomApi = () => {
    return async (dispatch: AppDispatch) => {
        const result = await http.get('/api/phong-thue')
        const content: RoomModel[] = result.data.content
        const action: PayloadAction<RoomModel[]> = getAllRoomAction(content)
        dispatch(action)
    }
}

export const getRoomPagApi = (pageIndex: number, pageSize: number) => {
    return async (dispatch: AppDispatch) => {
        const result = await http.get(`/api/phong-thue/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}`)
        const content: RoomModel[] = result.data.content.data
        const action: PayloadAction<RoomModel[]> = getRoomPagAction(content)
        dispatch(action)
    }
}