import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import {
  getAuth,
  updatePassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

import {
  getDatabase,
  ref,
  child,
  get,
  onValue,
  set,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";

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

$("#saveProfileData").click(function () {
  let email = $("#Email").val();
  let nombrecompleto = $("#full_name").val();
  let CartaIdentita = $("#CartaIdentita").val();
  let DataNascita = $("#DataNascita").val();
  let LuogodiNascita = $("#LuogoNascita").val();
  let Password = $("#Password").val();

  const db = getDatabase();
  let userId = window.localStorage.getItem("userId");
  set(ref(db, "users/" + userId), {
    uid: userId,
    name: nombrecompleto,
    email: email,
    cie: CartaIdentita,
    dataNasc: DataNascita,
    luogoNasc: LuogodiNascita,
  }).then(function () {
    if (Password == "") {
      alert("changes made successfully.");
    } else {
      const auth = getAuth();
      const user = auth.currentUser;
      updatePassword(user, Password)
        .then(() => {
          // Update successful.
          alert("changes made successfully.");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  });
});

$("#logOut").click(function () {
  logOut();
});

function logOut() {
  window.localStorage.removeItem("userId");
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      window.location = "login.html";
    })
    .catch((error) => {
      alert(error.message);
    });
}

$(document).ready(function () {
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      // User is signed in
      console.log(user);

      console.log("-.-");
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${user.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            let userId = snapshot.val().uid;
            window.localStorage.setItem("userId", userId);
            getUserData(userId);
          } else {
            console.log("No data available");
            alert("No hay datos cargados para este usuario.");
            logOut();
          }
          console.log("-.-");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // User is signed out
      window.location = "index.html";
    }
  });
});

function getUserData(userId) {
  const db = getDatabase();
  const starCountRef = ref(db, "users/" + userId);
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    $("#Email").val(data.email);
    $("#full_name").val(data.name);
    $("#CartaIdentita").val(data.cie);
    $("#DataNascita").val(data.dataNasc);
    $("#LuogoNascita").val(data.luogoNasc);
    //let Password = $("#Password").val();
  });
}
