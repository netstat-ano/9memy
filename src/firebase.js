import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCTY3TpA943QNv4gSa5cWj_qmCub3Yo4Gk",
    authDomain: "memy-915e8.firebaseapp.com",
    projectId: "memy-915e8",
    storageBucket: "memy-915e8.appspot.com",
    messagingSenderId: "843252964028",
    appId: "1:843252964028:web:e5286f3f2aa128188fceb9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
