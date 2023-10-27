// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAq9f42S0VcfEK7BS62319fjDXKYzy8bDY",
  authDomain: "food-delivery-app-dfa7c.firebaseapp.com",
  projectId: "food-delivery-app-dfa7c",
  storageBucket: "food-delivery-app-dfa7c.appspot.com",
  messagingSenderId: "720075004638",
  appId: "1:720075004638:web:5ae4e0663130b87df2804f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;