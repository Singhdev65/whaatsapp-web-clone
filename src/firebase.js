import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyClCzUMhF7zWMSujcdhSFxg9S0y-ZOP4sc",
  authDomain: "web-whatsapp-clone-2c544.firebaseapp.com",
  projectId: "web-whatsapp-clone-2c544",
  storageBucket: "web-whatsapp-clone-2c544.appspot.com",
  messagingSenderId: "951120383576",
  appId: "1:951120383576:web:b84a6fb30743bce392042d",
  measurementId: "G-PG4EDBZY52"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const messaging = firebase.messaging();

  export {auth, provider, messaging};
  export default db;