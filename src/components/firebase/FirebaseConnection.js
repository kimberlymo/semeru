import firebase from "firebase";

/**
 * erstellt eine Verbindung zu der firestore Datenbank und initialiert dies auch.
 * Diese Konfiguration muss nur einmal in diesem Code programmiert werden
 *
 * @type {{storageBucket: string, apiKey: string, messagingSenderId: string, appId: string, projectId: string, measurementId: string, authDomain: string}}
 * @author Kimberly Moorhouse kdkdkdk
 */
const firebaseConfig = {
    apiKey: "AIzaSyB-FtRRuqWMdiV5iDHiZKfxDNQI5o64qAI",
    authDomain: "semeru-52985.firebaseapp.com",
    projectId: "semeru-52985",
    storageBucket: "semeru-52985.appspot.com",
    messagingSenderId: "1090112397950",
    appId: "1:1090112397950:web:5c5937829ee10694802e2f",
    measurementId: "G-FPBQ133JL7"
};

export default firebase.initializeApp(firebaseConfig);