import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJ_p2MGm00fovYeMcPMe9DIlPcrx3Q9Go",
  authDomain: "gecko-c2ae2.firebaseapp.com",
  projectId: "gecko-c2ae2",
  storageBucket: "gecko-c2ae2.appspot.com",
  messagingSenderId: "554664512531",
  appId: "1:554664512531:web:b9612ae19bcaa5e9c943e6",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

export { app, auth, db };
