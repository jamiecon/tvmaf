import * as firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyC9EaFsta0Ha72ryNchybnB840Uo2r1wug",
  authDomain: "spry-bus-252723.firebaseapp.com",
  projectId: "spry-bus-252723"
});
const firestoreDatabase = firebase.firestore();

export default firestoreDatabase;
