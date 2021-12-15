//----------Functions-------------//
$('#Registrar').click(function(){
    //alert("ahora si papa");
    let Email = $("#Email").val();
    console.log("Email:" + Email);
    });

  $('#Registrar').click(function(){
    //alert("ahora si papa");
    let nombrecompleto = $("#full_name").val();
    console.log("nombre Completo:" + nombrecompleto);
    });

  $('#Registrar').click(function(){
    //alert("ahora si papa");
    let CartaIdentita = $("#CartaIdentita").val();
    console.log("CartaIdentita:" + CartaIdentita);
    });

  $('#Registrar').click(function(){
    //alert("ahora si papa");
    let DataNascita = $("#Datadinascita").val();
    console.log("Data di Nascita:" + DataNascita);
    });

  $('#Registrar').click(function(){
    //alert("ahora si papa");
    let LuogodiNascita = $("#LuogoNascita").val();
    console.log("Luogo di nascita:" + LuogodiNascita);
    });
  
  $('#Registrar').click(function(){
    //alert("ahora si papa");
    let Password = $("#Password").val();
    console.log("Password:" + Password);
    });

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Other config options...
  });