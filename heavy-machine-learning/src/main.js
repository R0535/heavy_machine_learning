import { createApp } from 'vue'
import App from './App.vue'
import firebase from "firebase"
import { firestorePlugin } from "vuefire";
import router from './router'


var config = {
    apiKey: "AIzaSyDY9Kk7jL7VUbsGa2pBV2fXvxfMGD_T0w8",
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
export const storage = firebase.storage().ref('/images')

//Vue.config.productionTip = false;
// new Vue({
//     render:h=>h(App),
//     router,
//     components:{
//         App
//     }
// }).$mount("#app")
let app = createApp(App)
app.component("App",App)
app.use(router)
app.use(firestorePlugin)
app.mount('#app')


