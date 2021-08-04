import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from "firebase"
import { firestorePlugin } from "vuefire";
import vuetify from '@/plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import key from "@/KeyValues/index"

var config = {
    apiKey: key,
    authDomain: "heavy-machine-learning.firebaseapp.com",
    databaseURL: "https://heavy-machine-learning-default-rtdb.firebaseio.com",
    projectId: "heavy-machine-learning",
    storageBucket: "heavy-machine-learning.appspot.com",
    messagingSenderId: "829601946159",
    appId: "1:829601946159:web:014e377bac66daf119c4da",
    measurementId: "G-6VRH3V1T0V"
  };

const firebaseApp = firebase.initializeApp(config)
export const firestore = firebaseApp.firestore()
export const apiKey = key.key
export const storage = firebase.storage().ref('/images')
const app = createApp(App)
app.use(router)
app.use(vuetify)
app.use(VueAxios, axios)
app.use(firestorePlugin)
app.mount('#app')
