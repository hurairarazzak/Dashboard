// src/config/firebase/firebasefunctions.js

import { database, auth } from './firebaseconfig';
import { ref, set, get, update, remove, push } from 'firebase/database';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Authentication Functions
export const signUpUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

// CRUD Operations
export const addData = async (path, data) => {
  const newDataRef = push(ref(database, path));
  await set(newDataRef, data);
  return newDataRef.key; // Return the key of the new entry
};

// Fetching data from the database
export const getData = async (path) => {
  const snapshot = await get(ref(database, path));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return null;
  }
};


export const editData = (path, data) => update(ref(database, path), data);

export const deleteData = (path) => {
  try {
    remove(ref(database, path));
    console.log("Data Successfully deleted")
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

