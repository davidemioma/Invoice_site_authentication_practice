import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyAKHwZyGK48sFHO4ibyxRn24Om6uGr1FLU",
  authDomain: "invoice-dev-2ff87.firebaseapp.com",
  projectId: "invoice-dev-2ff87",
  storageBucket: "invoice-dev-2ff87.appspot.com",
  messagingSenderId: "572391947797",
  appId: "1:572391947797:web:ceb2b4159adf90c9d6d81c",
});

export const auth = getAuth(app);

export default app;
