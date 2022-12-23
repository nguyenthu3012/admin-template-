import axios from 'axios'
import { history } from '..'
export const DOMAIN = 'https://airbnbnew.cybersoft.edu.vn'
export const ACCESS_TOKEN = 'access_token'
export const USER_LOGIN = 'userLogin'
const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udGVuZCA3MyIsIkhldEhhblN0cmluZyI6IjE5LzA1LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4NDQ1NDQwMDAwMCIsIm5iZiI6MTY1OTg5MTYwMCwiZXhwIjoxNjg0NjAyMDAwfQ.49m9-EoDr6zr7UOk_79hfcvJWKI_s0Wy_g40ossfl9c'

export const http = axios.create({
    baseURL: DOMAIN,
    timeout: 30000
})

// Cau hinh ham get set Storage hoac Cookie
export const {setStorage, setStorageJson, getStorageJson, getStore} = {
    setStorageJson: (name: string, data: any): void => {
        data = JSON.stringify(data);
        localStorage.setItem(name, data)
    },
    setStorage: (name: string, data: any): void => {
        localStorage.setItem(name, data)
    },
    getStorageJson: (name: string): any | undefined => {
        if (localStorage.getItem(name)) {
            const dataStore: string | undefined | null = localStorage.getItem(name)
            if (typeof dataStore == 'string') {
                const data = JSON.parse(dataStore)
                return data
            }
            return undefined
        }
        return; // undefined
    },
    getStore: (name: string): string | null | undefined => {
        if (localStorage.getItem(name)) {
            const data: string | null | undefined = localStorage.getItem(name)
            return data
        }
        return;
    },

}

// Cau hinh tat ca request gui di
http.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        Authorization: `Bearer ${getStore(ACCESS_TOKEN)}`,
        TokenCybersoft: TOKEN_CYBERSOFT
    };
    return config;
}, (err) => {
    return Promise.reject(err);
})

// Cau hinh tat ca ket qua tra ve

http.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error?.response.status === 404 || error?.response.status === 400) {
        // Chuyen huong trang ve trang chu
        history.push('/')
    }
    return Promise.reject(error)
})
