import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
apiKey: "AIzaSyDu-lrYY0tDX_UvSBwIYZKXU6i9-q3FDOw",
authDomain: "simple-notes-firebase-d1331.firebaseapp.com",
projectId: "simple-notes-firebase-d1331",
storageBucket: "simple-notes-firebase-d1331.appspot.com",
messagingSenderId: "134244683545",
appId: "1:134244683545:web:10bf7d0317e542ef19ff88",
measurementId: "G-LRY7SPFNHJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;