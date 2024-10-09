import firebase from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import "firebaseui/dist/firebaseui.css";

const firebaseConfig = {
  apiKey: "AIzaSyDUygG1SZHtQ564PhmEY0DS8lSEL_FnXCA",
  authDomain: "finni-health-a64c1.firebaseapp.com",
  projectId: "finni-health-a64c1",
  storageBucket: "finni-health-a64c1.appspot.com",
  messagingSenderId: "657875054264",
  appId: "1:657875054264:web:00346c3e85938dbbc7ce4d",
  measurementId: "G-5XE5DFDTYQ",
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
export const auth = getAuth(firebaseApp);
