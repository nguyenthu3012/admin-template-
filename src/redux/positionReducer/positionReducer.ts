import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PositionModel } from '../../Models/PositionModel/PositionModel';
import { http } from '../../util/config';
import { AppDispatch } from '../configureStore';

export type PositionState = {
    positions: PositionModel[]
}

const initialState: PositionState = {
    positions: []
}

const positionReducer = createSlice({
  name: 'positionReducer',
  initialState,
  reducers: {
    getPositionAction: (state: PositionState, action: PayloadAction<PositionModel[]>) => {
        state.positions = action.payload
    }   
  }
});

export const { getPositionAction } = positionReducer.actions

export default positionReducer.reducer

// async action

export const getPositionApi = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const result = await http.get('/api/vi-tri')
            const content: PositionModel[] = result.data.content
            const action: PayloadAction<PositionModel[]> = getPositionAction(content)
            dispatch(action)
        } catch (error) {
            console.log(error);
        }   
    }
}