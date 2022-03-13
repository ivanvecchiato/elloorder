import firebase from '@firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  ///*
  apiKey: "AIzaSyCG6GPbj83IzhcqDv3700cQP3oBVuHNtBY",
  authDomain: "mpos-dbce8.firebaseapp.com",
  projectId: "mpos-dbce8",
  storageBucket: "mpos-dbce8.appspot.com",
  messagingSenderId: "139969501580",
  appId: "1:139969501580:web:0e05cbe72050868a975ea9"
  /*
  apiKey: "AIzaSyBpxfZ5b56sgfOKqGCAOjWAZ78gBuW9eEc",
  authDomain: "pickitapp-2443e.firebaseapp.com",
  projectId: "pickitapp-2443e",
  storageBucket: "pickitapp-2443e.appspot.com",
  messagingSenderId: "347553626544",
  appId: "1:347553626544:web:8739dfec429200a3a6fe75"
  */
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().enablePersistence()

export default {
    db: firebaseApp.firestore()
}