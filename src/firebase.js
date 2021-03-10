import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const app = firebase.initializeApp({
    apiKey: "AIzaSyDmWlaEkgA2o7A4qkVeEXaC2N_OWFEaMd0",
  authDomain: "lyoimsweb.firebaseapp.com",
  projectId: "lyoimsweb",
  storageBucket: "lyoimsweb.appspot.com",
  messagingSenderId: "407922520085",
  appId: "1:407922520085:web:8a80058bc9d0d32c209e1c"
})

export const db = firebase.firestore();
export const auth = app.auth()
export default app