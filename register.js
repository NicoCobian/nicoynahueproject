import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import {
  getDatabase,
  ref,
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
$("#Registrar").click(function () {
  let Email = $("#Email").val();
  let nombrecompleto = $("#full_name").val();
  let CartaIdentita = $("#CartaIdentita").val();
  let DataNascita = $("#DataNascita").val();
  let LuogodiNascita = $("#LuogoNascita").val();
  let Password = $("#Password").val();

  if (
    Email == "" ||
    nombrecompleto == "" ||
    CartaIdentita == "" ||
    DataNascita == "" ||
    LuogodiNascita == "" ||
    Password == ""
  ) {
    // ALGUN CAMPO VACIO
    alert("Debes completar todos los campos");
  } else {
    // TODO OK, PASAMOS A REGISTRAR EL USUARIO EN FIREBASE
    console.log("Email:" + Email);
    console.log("nombre Completo:" + nombrecompleto);
    console.log("CartaIdentita:" + CartaIdentita);
    console.log("Data di Nascita:" + DataNascita);
    console.log("Luogo di nascita:" + LuogodiNascita);
    console.log("Password:" + Password);

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.uid);
        storeUserData(
          user.uid,
          user.email,
          nombrecompleto,
          CartaIdentita,
          DataNascita,
          LuogodiNascita
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        alert(errorMessage);
      });
    console.log("registrarUsuarioEnFirebase");
  }
});

function storeUserData(
  userId,
  email,
  nombrecompleto,
  CartaIdentita,
  DataNascita,
  LuogodiNascita
) {
  const db = getDatabase();
  set(ref(db, "users/" + userId), {
    uid: userId,
    name: nombrecompleto,
    email: email,
    cie: CartaIdentita,
    dataNasc: DataNascita,
    luogoNasc: LuogodiNascita,
  }).then(function () {
    window.location = "ModifPerfil.html";
  });
}

$(document).ready(function () {
  let userId = window.localStorage.getItem("userId");
  if (userId != null) {
    window.location = "ModifPerfil.html";
  }
});

/*
  UserImpl {providerId: 'firebase', emailVerified: false, isAnonymous: false, tenantId: null, providerData: Array(1), …}
  accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk1NmMwNDEwZmE1MjFjMTZlNDQ2NWE4ZjVjODU5NjZhNWY1MDk5NGIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbG9naW4tZS1wYXNzd29yZCIsImF1ZCI6ImxvZ2luLWUtcGFzc3dvcmQiLCJhdXRoX3RpbWUiOjE2Mzk1OTM2NTksInVzZXJfaWQiOiJSdm1GeWhoN1M1TmtQVkIxSjFCSHNCS2g1SUkzIiwic3ViIjoiUnZtRnloaDdTNU5rUFZCMUoxQkhzQktoNUlJMyIsImlhdCI6MTYzOTU5MzY1OSwiZXhwIjoxNjM5NTk3MjU5LCJlbWFpbCI6InRlc3QzQG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3QzQG1haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.aGjtEhs9EAUp6-807568wwo4iBaIGKn_G-5wksia-MOIoCmAho8Bjj47NIfGeDqY2yFQzmSV6w_5zrfFMwUrvXYxgDNIRd3s1g7aVQko0DySL63efoiiLfJvMbZwieE2EFcvH19Gs31ozFjUW-q77OzNZRFh7CNSNtpDjwe7073cOJhlHWBFoNLKKOhfUC6OXESw02MqjLNvSHegDUc6ksAWxUUhbEJea7wOxUkvPKkHXQ5EBvaBekp98OPY60SWO1r5yEdujW2FqICpiMlltSyxefbbZWWlfaQueLM7TInnCznqjH-LfqVNQ811zrCpFCfWlj2XeKT1qn86QMFfDQ"
  auth: AuthImpl {app: FirebaseAppImpl, config: {…}, currentUser: UserImpl, emulatorConfig: null, operations: Promise, …}
  displayName: null
  email: "test3@mail.com"
  emailVerified: false
  isAnonymous: false
  metadata: UserMetadata {createdAt: '1639593659448', lastLoginAt: '1639593659448', lastSignInTime: 'Wed, 15 Dec 2021 18:40:59 GMT', creationTime: 'Wed, 15 Dec 2021 18:40:59 GMT'}
  phoneNumber: null
  photoURL: null
  proactiveRefresh: ProactiveRefresh {user: UserImpl, isRunning: false, timerId: null, errorBackoff: 30000}
  providerData: [{…}]
  providerId: "firebase"
  reloadListener: null
  reloadUserInfo: {localId: 'RvmFyhh7S5NkPVB1J1BHsBKh5II3', email: 'test3@mail.com', passwordHash: 'UkVEQUNURUQ=', emailVerified: false, passwordUpdatedAt: 1639593659448, …}
  stsTokenManager: StsTokenManager {refreshToken: 'AFxQ4_qY9adUxK792GBK90IgBoZ8TfPjURzLV57iyJG9PTxvDr…7T-ozUWs3k5j6SlCJNUOwbvzxOPuBSYkKKBdrqgQWttj6yHww', accessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk1NmMwNDEwZmE1MjFjMT…LM7TInnCznqjH-LfqVNQ811zrCpFCfWlj2XeKT1qn86QMFfDQ', expirationTime: 1639597259748}
  tenantId: null
  uid: "RvmFyhh7S5NkPVB1J1BHsBKh5II3"
  refreshToken: (...)
  [[Prototype]]: Object
  */
