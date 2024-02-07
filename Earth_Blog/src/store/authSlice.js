import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    status:false,
    userData:null,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action) => {
                state.status = true;
                state.userData = action.payload;
                Cookies.set('status', state.status)
        },
        logout:(state,action) => {
            state.status= false;
            state.userData = null;
            Cookies.remove('status')
        }
    }
})

export const { login , logout } = authSlice.actions;
export default authSlice.reducer;