import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



    const firebaseConfig = {
        apiKey: "AIzaSyC2-I3QyI3VfrCHyjAE5vK81LzCxNeCycE",
        authDomain: "misiontic2022-df733.firebaseapp.com",
        projectId: "misiontic2022-df733",
        storageBucket: "misiontic2022-df733.appspot.com",
        messagingSenderId: "883830207830",
        appId: "1:883830207830:web:cfae93fc9d5629e23f92f7",
        measurementId: "G-RWESBZBJMY"

    }

    firebase.initializeApp(firebaseConfig);
    export const db = firebase.firestore();