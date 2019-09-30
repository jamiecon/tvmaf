import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyC9EaFsta0Ha72ryNchybnB840Uo2r1wug",
  authDomain: "spry-bus-252723.firebaseapp.com",
  projectId: "spry-bus-252723"
});
export const db = firebase.firestore();
