// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {getStorage} = require("firebase/storage")
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPqwBadMb3l1hD9DBD_i-DWzBtjIJ-vpE",
  authDomain: "react-app-32123.firebaseapp.com",
  databaseURL: "https://react-app-32123-default-rtdb.firebaseio.com",
  projectId: "react-app-32123",
  storageBucket: "react-app-32123.appspot.com",
  messagingSenderId: "169811709703",
  appId: "1:169811709703:web:6b0fbf126530b100c17fa2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = storage