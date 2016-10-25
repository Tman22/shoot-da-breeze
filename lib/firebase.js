import firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyCgAZzLvbAvhzMxr1IzXEWziRssmn9nKxc',
  authDomain: 'shoot-da-breeze.firebaseapp.com',
  databaseURL: 'https://shoot-da-breeze.firebaseio.com',
  storageBucket: 'shoot-da-breeze.appspot.com',
  messagingSenderId: '987844077811'
};

export default firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();

export function signIn() {
  return firebase.auth().signInWithPopup(provider);
}

export function logOut() {
  return firebase.auth().signOut();
}

export function deleteIdea(id) {
  return firebase.database().ref('messages/' + id).remove();
}

export function updateIdea(id, key , value) {
  return firebase.database().ref('messages/' + id).update({[key] : value});
}

export const reference = firebase.database().ref('messages');
