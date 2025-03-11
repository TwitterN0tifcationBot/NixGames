// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// DOM elements
const googleLoginBtn = document.getElementById('google-login');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signInBtn = document.getElementById('sign-in');
const signUpBtn = document.getElementById('sign-up');
const logoutBtn = document.getElementById('logout');
const authContainer = document.getElementById('auth-container');
const loggedInContainer = document.getElementById('logged-in');
const userNameSpan = document.getElementById('user-name');

// Google login
googleLoginBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            updateUI(user);
        })
        .catch((error) => {
            console.error(error.message);
        });
});

// Email login
signInBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            updateUI(user);
        })
        .catch((error) => {
            console.error(error.message);
        });
});

// Email sign up
signUpBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            updateUI(user);
        })
        .catch((error) => {
            console.error(error.message);
        });
});

// Logout
logoutBtn.addEventListener('click', () => {
    firebase.auth().signOut()
        .then(() => {
            updateUI(null);
        })
        .catch((error) => {
            console.error(error.message);
        });
});

// Update UI based on auth state
firebase.auth().onAuthStateChanged((user) => {
    updateUI(user);
});

function updateUI(user) {
    if (user) {
        authContainer.style.display = 'none';
        loggedInContainer.style.display = 'block';
        userNameSpan.textContent = user.displayName || user.email;
    } else {
        authContainer.style.display = 'block';
        loggedInContainer.style.display = 'none';
    }
}
