// Import the functions you need from the SDKs you need

import { SignpostOutlined } from "@mui/icons-material";
import { initializeApp } from "firebase/app";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyAdYIH-8WMSfRQTBILb0RYSRSDWhfTHWj0",

  authDomain: "bottleflipkart.firebaseapp.com",

  projectId: "bottleflipkart",

  storageBucket: "bottleflipkart.appspot.com",

  messagingSenderId: "191643961529",

  appId: "1:191643961529:web:f650674ec2d74a020f3368"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth =getAuth(app);

const AuthContext=createContext(null)

const AuthProvider=({children})=>{
    const auth=useProvideAuth();
    return 
    <AuthContext.Provider value={auth}>
    {children}
    </AuthContext.Provider>
}

const useAuth=()=>{
    return useContext(AuthContext)
}


function useProvideAuth(){
    const [user,setUser]=useState()

    const signUp=(email,password,displayName)=>createUserWithEmailAndPassword(auth,email,password).then(({user})=>{
        updateProfile(user,{displayName});
        setUser(user);
        return user;
    })
    
    const signIn=(email,password)=>signInWithEmailAndPassword(auth,email,password).then(({user})=>{
        setUser(user)
        return user;
    })

    const signOutUser=()=>signOut(auth).then(()=>setUser(null));

    useEffect(() => {
    
        const unsubscribe=onAuthStateChanged(auth,(user)=>{
            user?setUser(user):setUser(null)
        })
      return () => {
        unsubscribe()
      }
    })

    return {signIn,signUp,signOut:signOutUser,user,}
    
}

export default AuthProvider;