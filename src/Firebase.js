
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCDeGEASs6WU3WtY4ArasYSLe3-YTNbpho",
  authDomain: "netflix-clone-33be2.firebaseapp.com",
  projectId: "netflix-clone-33be2",
  storageBucket: "netflix-clone-33be2.appspot.com",
  messagingSenderId: "963188336672",
  appId: "1:963188336672:web:b7f5615e88b100f346f445"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth (app);
const db = getFirestore (app);

const signup = async (name, email, password)=>  {
    try {
        const res = await createUserWithEmailAndPassword (auth, email, password);
        const user = res.user;
        await addDoc (collection (db, "user"), {
            uid :user.uid,
            name,
            authProvider: "local",
            email,
        });
    }catch  (error) {
      console.log (error);
      toast.error (error.code.split ('/')[1].split ('-').join (" "));
    }
}
const login = async (email, password)=>  {
    try {
        await signInWithEmailAndPassword (auth, email, password);
        
    } catch (error) {
        console.log (error);
        toast.error (error.code.split ('/')[1].split ('-').join (" "));
    }
}
const logout =  ()=>  {
    signOut (auth);
}
export  {auth, db, login, signup, logout};