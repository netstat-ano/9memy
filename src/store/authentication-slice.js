import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import { get, ref, update } from "firebase/database";
import { database } from "../firebase";
const authenticationSlice = createSlice({
    name: "authentication",
    initialState: { user: null, userData: {} },
    reducers: {
        logIn(state, action) {
            return {
                userData: action.payload.userData,
                user: action.payload.user,
            };
        },
        logOut() {
            return { user: null, userData: null };
        },
        saveData(state, action) {
            return { ...state, userData: action.payload };
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
        const snapshot = await get(ref(database, `${auth.currentUser.uid}/`));
        if (snapshot.exists()) {
            const response = snapshot.val();
            dispatch(
                authenticationSliceActions.logIn({
                    user: auth.currentUser,
                    userData: response,
                })
            );
            return;
        }
        dispatch(
            authenticationSliceActions.logIn({
                user: auth.currentUser,
                userData: {},
            })
        );
    };
};
export const logOut = () => {
    return async (dispatch) => {
        await signOut(auth);
        dispatch(authenticationSliceActions.logOut());
    };
};
export const fetchUserData = () => {
    return async (dispatch, getState) => {
        const user = getState().authentication.user;
        const snapshot = await get(ref(database, `/${user.uid}`));
        const response = snapshot.val();
        dispatch(authenticationSliceActions.saveData(response));
    };
};
export const updateUserData = (newData) => {
    return async (dispatch, getState) => {
        const user = getState().authentication.user;
        const updates = {};
        updates[`/${user.uid}/${newData.url ? newData.url : ""}`] =
            newData.data;
        await update(ref(database), updates);
        const snapshot = await get(ref(database, `/${user.uid}`));
        dispatch(authenticationSliceActions.saveData(snapshot.val()));
    };
};
