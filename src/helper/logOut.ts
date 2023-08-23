import {  signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firbase";
import { clearToken } from "./clearToken";
export const LogOut = () => {
    signOut(auth).then((res: any)=> console.log(res))
    clearToken()
}