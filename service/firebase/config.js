import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAEsZ4xTLNdV5hhpyu3imWA5tDrjoB5hg",
  authDomain: "analisis-financiero-anafin.firebaseapp.com",
  projectId: "analisis-financiero-anafin",
  storageBucket: "analisis-financiero-anafin.appspot.com",
  messagingSenderId: "378349837326",
  appId: "1:378349837326:web:1241914162092d47ba305f",
  measurementId: "G-MFPQCT03GX",
};
const app = initializeApp(firebaseConfig);
export const fireStore = getFirestore(app);

export default app;