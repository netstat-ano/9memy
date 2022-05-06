import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
const authenticationSlice = createSlice({
    name: "authentication",
    initialState: { user: null },
    reducers: {
        logIn(state, action) {
            return { user: action.payload };
        },
        logOut() {
            return { user: null };
        },
    },
});
export default authenticationSlice;
export const authenticationSliceActions = authenticationSlice.actions;
export const signUp = (user) => {
    return async (dispatch) => {
        await createUserWithEmailAndPassword(auth, user.email, user.password);
        await updateProfile(auth.currentUser, {
            displayName: user.username,
        });
        dispatch(authenticationSliceActions.logIn(auth.currentUser));
    };
};
export const logIn = (user) => {
    return async (dispatch) => {
        await signInWithEmailAndPassword(auth, user.email, user.password);
        dispatch(authenticationSliceActions.logIn(auth.currentUser));
    };
};
export const logOut = () => {
    return async (dispatch) => {
        await signOut(auth);
        dispatch(authenticationSliceActions.logOut());
    };
};
