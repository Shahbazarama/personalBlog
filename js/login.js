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

  var db = firebase.firestore();

  var quill = new Quill('#editor', {
    theme: 'snow'
  });

  const emailField = document.getElementById('emailField')
  const passwordField = document.getElementById('passwordField')
  const loginButton = document.getElementById('login')
  const signupButton = document.getElementById('signup')
  const logoutButton = document.getElementById('logout')
  const publishButton = document.getElementById('publish')

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


  publishButton.addEventListener('click', function(e){
    // MARK: Code to save blog post
    db.collection("blogPosts").add({
        body: quill.getText(),
        date: firebase.firestore.Timestamp.fromDate(new Date()),
        title: "another post"
      })
      .then(function(docRef) {
        db.collection("blogPosts").doc(docRef.id).collection("postComments").add({
          body: ""
        }).then(function(docRef) {
          console.log("comments init: ", docRef.id)
        }).catch(function(error) {
          console.log('comments error: ', error)
        })
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding blog post: ", error);
      });
  })


}());
