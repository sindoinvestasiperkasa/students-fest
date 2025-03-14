import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDkv5w5JoaALm7RZ_tsz6loIYQixAEKeoE",
  authDomain: "sindo-ip.firebaseapp.com",
  databaseURL: "https://sindo-ip-default-rtdb.firebaseio.com",
  projectId: "sindo-ip",
  storageBucket: "sindo-ip.firebasestorage.app",
  messagingSenderId: "254146823351",
  appId: "1:254146823351:web:291bc7e79fc3b7f5ab7932",
  measurementId: "G-FKMB3MW2L3"
};

const firebaseConfigRealtime = {
  apiKey: "AIzaSyD3SPwYnCe7qUcSB8guzziEzoRFny1a3Iw",
  authDomain: "sosro-fest.firebaseapp.com",
  databaseURL: "https://sosro-fest-default-rtdb.firebaseio.com",
  projectId: "sosro-fest",
  storageBucket: "sosro-fest.appspot.com",
  messagingSenderId: "992853274840",
  appId: "1:992853274840:web:8e3b866833f8551120e7ad",
  measurementId: "G-ZT2GR5Y2X5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, "sindo-ip");
const db = getFirestore(app, "studentsfest");
const db2 = getFirestore(app, "sindo-lms");
const auth = getAuth(app);

const appRealtime = initializeApp(firebaseConfigRealtime, "sosro-fest");
const dbRealtime = getDatabase(appRealtime);

export { db, auth, dbRealtime, db2 };