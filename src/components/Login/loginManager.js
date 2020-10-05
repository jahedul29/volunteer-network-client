import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";

// function for initializing login framework
export const initializeLoginFramework = () => {
  if (firebase.app.length) {
    firebase.initializeApp(firebaseConfig);
  }
};

// Google sign In handler
export const handleGoogleSignIn = () => {
  var provider = new firebase.auth.GoogleAuthProvider();

  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      var user = res.user;
      const newUser = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      };
      return newUser;
      // ...
    })
    .catch(function (error) {
      // Handle Errors here.
      console.log(error.message);
      // ...
    });
};

// Sign Out handler
export const handleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then(function () {
      const newUser = {
        name: "",
        email: "",
      };
      return newUser;
      // Sign-out successful.
    })
    .catch(function (error) {
      // An error happened.
    });
};
