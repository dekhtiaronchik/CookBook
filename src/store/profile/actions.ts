import {$api} from "api/api";
import axios from "axios";
import {API_BASE_URL} from "constants/config";
import {AuthResponse} from "models/AuthResponse";
import {IRecipe} from "models/Recipe";
import {Dispatch} from "redux";
import {AuthService} from "services/authService";
import {ProfileActionTypes, ProfileAction} from './types'

export const login = (email: string, password: string) => async (dispatch: Dispatch<ProfileAction>) => {
    try {

        const response = await AuthService.login(email, password)
        console.log(response.data)
        if (response.status !== 200) throw TypeError('Ошибка авторизации')
        localStorage.setItem('token', response.data.accessToken);

        dispatch({
            type: ProfileActionTypes.LOGIN_PROFILE_SUCCESS,
            payload: response.data.user
        })
    } catch (e: any) {
        if (e instanceof Error) dispatch({
            type: ProfileActionTypes.LOGIN_PROFILE_ERROR,
            payload: e
        })
    }
}

export const register = (email: string, password: string) =>
    async (dispatch: Dispatch<ProfileAction>) => {
        try {
            console.log("Store, register")
            const response = await AuthService.register(email, password)
            console.log(response.data)
            if (response.status !== 200) throw TypeError('Ошибка авторизации')
            localStorage.setItem('token', response.data.accessToken);

            dispatch({
                type: ProfileActionTypes.LOGIN_PROFILE_SUCCESS,
                payload: response.data.user
            })
        } catch (e: any) {
            if (e instanceof Error) dispatch({
                type: ProfileActionTypes.LOGIN_PROFILE_ERROR,
                payload: e
            })
        }
    }

export const logout = () => async (dispatch: Dispatch<ProfileAction>) => {
    try {

        const response = await AuthService.logout()
        console.log(response)
        localStorage.removeItem('token');

        dispatch({type: ProfileActionTypes.LOGOUT_PROFILE_SUCCESS})
    } catch (e: any) {
        if (e instanceof Error) dispatch({
            type: ProfileActionTypes.LOGIN_PROFILE_ERROR,
            payload: e
        })
    }
}
export const checkAuth = () => async (dispatch: Dispatch<ProfileAction>) => {
    try {
        const response = await axios.get<AuthResponse>(`${API_BASE_URL}/refresh`, {withCredentials: true})
        console.log(response);
        localStorage.setItem('token', response.data.accessToken);

        dispatch({
            type: ProfileActionTypes.LOGIN_PROFILE_SUCCESS,
            payload: response.data.user
        })
    } catch (e) {
        if (e instanceof Error) dispatch({
            type: ProfileActionTypes.LOGIN_PROFILE_ERROR,
            payload: e
        })
    }
}