import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"

interface User {
    email: string
    password: string
}

interface ErrorResponse {
    msg: string
}

interface LoginResponse {
    token?: string
    user: User
    isError: boolean
    isSuccess: boolean
    isLoading: boolean
    message: string
}

interface StateProps {
    user: {
        uuid: string
        name: string
        email: string
        role: "admin" | "user"
    } | null,
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string
}

const BASE_URL = "http://localhost:5000"

const initialState: StateProps = {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const loginUser = createAsyncThunk<LoginResponse, User, {rejectValue: string}>("user/loginUser", async (user: User, thunkAPI) => {
    try {
        const res = await axios.post(`${BASE_URL}/login`, {
            email: user.email,
            password: user.password
        })
        return res.data
    } catch (error) {
        const err = error as AxiosError<ErrorResponse>
        if (err.response) {
            const msg = err.response.data?.msg
            return thunkAPI.rejectWithValue(msg)
        } else {
            return thunkAPI.rejectWithValue("Network error")
        }
    }
})

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
    try {
        const res = await axios.get(`${BASE_URL}/me`)
        return res.data
    } catch (error) {
        const err = error as AxiosError<ErrorResponse>
        if (err.response) {
            const msg = err.response.data?.msg
            return thunkAPI.rejectWithValue(msg)
        } else {
            return thunkAPI.rejectWithValue("Network error")
        }
    }
})

export const logout = createAsyncThunk("user/logout", async () => {
    await axios.delete(`${BASE_URL}/logout`)
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload // from loginUser
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload as string
        })

        // get user login
        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload as string
        })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer