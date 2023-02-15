import React, { useContext, useEffect, useState } from "react";
// import { auth } from "../firebase";
// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
// } from "firebase/auth";

// const AuthContext = React.createContext();
// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState();

//   function signUp(email, password) {
//     return auth.createUserWithEmailAndPassword;
//   }
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setCurrentUser(user);
//     });

//     return unsubscribe;
//   }, []);
//   const value = {
//     currentUser,
//     signUp,
//   };
//   return <AuthProvider value={value}>{children}</AuthProvider>;
// }
