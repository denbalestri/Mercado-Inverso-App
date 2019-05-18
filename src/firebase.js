import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAZGFvaQWn22nesPXky6S048OAjByLlpK0",
    authDomain: "mercado-inverso-882ed.firebaseapp.com",
    databaseURL: "https://mercado-inverso-882ed.firebaseio.com",
    projectId: "mercado-inverso-882ed",
    storageBucket: "mercado-inverso-882ed.appspot.com",
    messagingSenderId: "1088448046212",
    appId: "1:1088448046212:web:f9ce585dce9dea95"
  };

 firebase.initializeApp(firebaseConfig);

export default firebase