// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_9NCYslgqnZAdv46udjuXe6_tEhIVJwI",
  authDomain: "porject-main-p.firebaseapp.com",
  projectId: "porject-main-p",
  storageBucket: "porject-main-p.firebasestorage.app",
  messagingSenderId: "1017373088655",
  appId: "1:1017373088655:web:ca8fc258766837341e49fa",
  measurementId: "G-FT6S5NCP3H"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to save contact form data
function saveMessage(name, email, subject, message) {
  const newMessageRef = database.ref('messages').push();
  return newMessageRef.set({
    name: name,
    email: email,
    subject: subject,
    message: message,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    read: false
  });
}