import firebase from 'firebase/app'
import 'firebase/auth';
import "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyB_P_-s5XErkbcWYRCinoqihnpl6wcimHU",
    authDomain: "question-and-answer-68891.firebaseapp.com",
    projectId: "question-and-answer-68891",
    storageBucket: "question-and-answer-68891.appspot.com",
    messagingSenderId: "619485986646",
    appId: "1:619485986646:web:969ca102e6aa912da660f7",
    measurementId: "G-ZSV58YM3C3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth();
export const db = firebase.database();