import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCnUzWdcGVLz8DD5tZ1z0p5Ne4ObsQRn8w",
  authDomain: "slack-clone-71d40.firebaseapp.com",
  projectId: "slack-clone-71d40",
  storageBucket: "slack-clone-71d40.appspot.com",
  messagingSenderId: "681888039188",
  appId: "1:681888039188:web:78749bd21fc7427a06c201",
  measurementId: "G-M8PZ16D5R7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

export default db;
