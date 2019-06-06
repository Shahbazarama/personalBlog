(function() {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBtn3cepiDZkiBTx2hmrUiBJRBFZ_HHqY4",
    authDomain: "personalblog-3edff.firebaseapp.com",
    databaseURL: "https://personalblog-3edff.firebaseio.com",
    projectId: "personalblog-3edff",
    storageBucket: "personalblog-3edff.appspot.com",
    messagingSenderId: "796427749541",
    appId: "1:796427749541:web:4640dbf746e7c502"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const emailField = document.getElementById('emailField')
  const passwordField = document.getElementById('passwordField')
  const loginButton = document.getElementById('login')
  const signupButton = document.getElementById('signup')
  const logoutButton = document.getElementById('logout')

  loginButton.addEventListener('click', function(e) {
    const email = emailField.value
    const password = passwordField.value
    const auth = firebase.auth();

    auth.signInWithEmailAndPassword(email, password)
      .catch(e => console.log(e.message));
  })

  signupButton.addEventListener('click', function(e) {
    const email = emailField.value
    const password = passwordField.value
    const auth = firebase.auth();

    auth.createUserWithEmailAndPassword(email, password)
      .catch(e => console.log(e.message));
  })

  logoutButton.addEventListener('click', function(e) {
    firebase.auth().signOut();
  })

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser)
      logoutButton.classList.remove('d-none')
    } else {
      console.log('not logged in')
        logoutButton.classList.add('d-none')
    }
  })


}());
