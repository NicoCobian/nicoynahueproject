import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC6MuGaBatAshpNzNRVpNG2ZVoTDP0BGyQ",
  authDomain: "login-e-password.firebaseapp.com",
  projectId: "login-e-password",
  storageBucket: "login-e-password.appspot.com",
  messagingSenderId: "976144367089",
  appId: "1:976144367089:web:dca67744273d922c565850",
  measurementId: "G-TGE42YHS3B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//----------Functions-------------//
$("#login").click(function () {
  let Email = $("#Email").val();
  let Password = $("#Password").val();

  if (Email == "" || Password == "") {
    // ALGUN CAMPO VACIO
    alert("Debes completar todos los campos");
  } else {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        window.localStorage.setItem("user", user);

        // REDIRIGIR A OTRA PAGINA HTML
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        alert(errorMessage);
      });
  }
});

$(document).ready(function () {
  let user = window.localStorage.getItem("user");
  console.log(user.email);
});
