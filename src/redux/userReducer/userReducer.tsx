import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { history } from '../..'
import { LoginModel, UserModel } from '../../Models/UserModel/UserModel'
import { ACCESS_TOKEN, getStorageJson, http, USER_LOGIN, setStorage, setStorageJson } from '../../util/config'
import { AppDispatch } from '../configureStore'
export type UserState = {
    users: UserModel[],
    usersPagination: UserModel[],
    userDetail: UserModel | null,
    userLogin: UserModel | null
}

const initialState: UserState = {
    users: [],
    usersPagination: [],
    userDetail: null,
    userLogin: getStorageJson(USER_LOGIN)
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    getAllUserAction: (state: UserState, action: PayloadAction<UserModel[]>) => {
        state.users = action.payload
    },
    getAllUserPaginationAction: (state: UserState, action: PayloadAction<UserModel[]>) => {
        state.usersPagination = action.payload
    },
    getUserByIdAction: (state: UserState, action: PayloadAction<UserModel>) => {
        state.userDetail = action.payload
    },
    deleteUserByIdAction: (state: UserState, action: PayloadAction<number>) => {
        state.users = state.users.filter(user => user.id !== action.payload)
    },
    createUserAction: (state: UserState, action: PayloadAction<UserModel>) => {
        state.users.push(action.payload)
        state.usersPagination.push(action.payload)
    },
    loginAction: (state: UserState, action: PayloadAction<UserModel>) =>  {
        state.userLogin = action.payload;
      },
  }
});

export const { getAllUserAction, getAllUserPaginationAction, deleteUserByIdAction, getUserByIdAction,createUserAction, loginAction } = userReducer.actions

export default userReducer.reducer

// async action
export const getAllUserApi = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const result = await http.get('/api/users')
            const content: UserModel[] = result.data.content
            const action: PayloadAction<UserModel[]> = getAllUserAction(content)
            dispatch(action)
        } catch (error) {
            console.log(error);
        }   
    }
}

export const getAllUserPaginationApi = (pageIndex: number, pageSize: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            const result = await http.get(`api/users/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}`)
            const content: UserModel[] = result.data.content.data
            const action: PayloadAction<UserModel[]> = getAllUserPaginationAction(content)
            dispatch(action)
        } catch (error) {
            console.log(error);
        }   
    }
}


export const deleteUserByIdApi = (id: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            const result = await http.delete(`/api/users?id=${id}`)
            dispatch(deleteUserByIdAction(id))
            console.log(result)

        } catch (error) {
            console.log(error);
        }   
    }
}


export const getUserByIdApi = (id: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            const result = await http.get(`/api/users/${id}`)
            const content: UserModel = result.data.content
            console.log(content)
            const action: PayloadAction<UserModel> = getUserByIdAction(content)
            dispatch(action)

        } catch (error) {
            console.log(error);
        }   
    }
}

export const updateUserByIdApi = (id: number, user: UserModel) => {
    return async (dispatch: AppDispatch) => {
        try {
            const result = await http.put(`/api/users/${id}`, user)
            const content: UserModel = result.data.content

            const action: PayloadAction<UserModel> = getUserByIdAction(content)
            dispatch(action)

        } catch (error) {
            console.log(error);
        }   
    }
}

export const createUserApi = (user: UserModel) => {
    return async (dispatch: AppDispatch) => {
        try {
            const result = await http.post('/api/users', user)
            const content: UserModel = result.data.content

            const action: PayloadAction<UserModel> = createUserAction(content)
            dispatch(action)

        } catch (error) {
            console.log(error);
        }   
    }
}

export const searchUserApi = (user: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const result = await http.get(`/api/users/search/${user}`)
            const content: UserModel[] = result.data.content

            const action: PayloadAction<UserModel[]> = getAllUserAction(content)
            dispatch(action)

        } catch (error) {
            console.log(error);
        }   
    }
}

export const loginApi = (user: LoginModel) => {
    return async (dispatch: AppDispatch) => {
        try {
            const result = await http.post('/api/auth/signin', user)
            const userLogin : UserModel = result.data.content.user
            setStorage(ACCESS_TOKEN, result.data.content.token);
            setStorageJson(USER_LOGIN, result.data.content.user);
            dispatch(loginAction(userLogin));
            history.push('/')
        } catch (error) {
            console.log(error)
        }
      
    }
}