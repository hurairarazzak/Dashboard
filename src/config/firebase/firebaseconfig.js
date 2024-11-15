// src/config/firebase/firebaseconfig.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push, onValue, remove, update } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBM5KqYPgCTdvXZ7WuGKr3eJ6prjquU5kM",
  authDomain: "contactform-devtodeploy.firebaseapp.com",
  databaseURL: "https://contactform-devtodeploy-default-rtdb.firebaseio.com",
  projectId: "contactform-devtodeploy",
  storageBucket: "contactform-devtodeploy.appspot.com",
  messagingSenderId: "706444580082",
  appId: "1:706444580082:web:4a29f34d28d00d42bbac6b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

// Exporting Firebase functions directly so they can be used in Todo.js
export { ref, push, onValue, remove, update };
