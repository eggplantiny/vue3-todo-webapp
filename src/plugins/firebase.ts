import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDjC2EbHueaBI2hpG9tcUzTP2o-fm4ag1o',
  authDomain: 'vue3-todo-webapp.firebaseapp.com',
  projectId: 'vue3-todo-webapp',
  storageBucket: 'vue3-todo-webapp.appspot.com',
  messagingSenderId: '799347812000',
  appId: '1:799347812000:web:d5d17d22327bf2a6144bc5',
  measurementId: '${config.measurementId}'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
