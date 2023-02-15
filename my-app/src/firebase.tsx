import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//reminder -> change the config from the .env
const firebaseConfig = {
  apiKey: "AIzaSyBM5s8DEeP4AfuOOCvSer3bBa2hnAlk6fM",
  authDomain: "auth-dev-29d1a.firebaseapp.com",
  projectId: "auth-dev-29d1a",
  storageBucket: "auth-dev-29d1a.appspot.com",
  messagingSenderId: "389409684591",
  appId: "1:389409684591:web:033e2de9fc6fe5d05a219a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
