import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBqhpyabtlWh_y4AJkr4eHOTW0UzKikhl8",
    authDomain: "curso-71249.firebaseapp.com",
    projectId: "curso-71249",
    storageBucket: "curso-71249.appspot.com",
    messagingSenderId: "687355922779",
    appId: "1:687355922779:web:58ec7a29c53326184bb27e",
    measurementId: "G-172BTM3T93"
  };


  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);

  export { db };