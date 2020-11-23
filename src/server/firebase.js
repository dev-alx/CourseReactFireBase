import app from 'firebase/app';
import 'firebase/firestore';

//configuracion de la web app en firebase
const config = {
    apiKey: "AIzaSyDkXfDk_805wXY4GkDZup_cw7b8sxSNIWQ",
    authDomain: "home-a2f32.firebaseapp.com",
    databaseURL: "https://home-a2f32.firebaseio.com",
    projectId: "home-a2f32",
    storageBucket: "home-a2f32.appspot.com",
    messagingSenderId: "665163438621",
    appId: "1:665163438621:web:da00cbee8fdaa8bc8484f4",
    measurementId: "G-7F9EFJ8DKS"
  };

class Firebase{

    constructor(){
        //inicializo el objeto
        app.initializeApp(config);
        //Inicializo la base de datos de firebase en la variable
        this.db = app.firestore();
    }
}

export default Firebase;