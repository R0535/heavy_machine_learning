<template>
  <v-container>
    <v-layout row wrap align-center>
        <v-card>
          <v-img class="white--text"  :src = "image.url"></v-img>
          <v-card-title>
                  <div>
                    <span class="grey--text">{{image.name}}</span>
                    <br>
                    <v-chip :color = "selectClass(image.scorePromedio)" >{{image.scorePromedio}}</v-chip>
                    <br>
                  </div>
          </v-card-title>
          <v-card-actions>
            <input   type="text" v-model="comentario" style="background-color:#cdcdcd;color:black;border-color:rgb(232 232 232);border-style:solid;border-radius:5px;height:50px;">
            <v-btn text color="primary" style="height:50px;" @click="enviarComentarios()">Comentar</v-btn>
          </v-card-actions>
        </v-card>
    </v-layout>
    <v-layout style="display:block">      
      <div >
        <h1>Equitquetas</h1>
      <div v-for="label in image.labels" v-bind:key = "image.labels[label]">
                    <span>{{label}}</span>
      </div>  
        <v-layout style="display:block">
            <h1>Otros comentarios</h1>
              <v-divider></v-divider>
        </v-layout>
      </div>
      <br>
      <div>
        <v-layout v-for="comentario in comentarios" v-bind:key="comentario.id">
          <div>
            <input type="text"
              :value="comentario.texto"
              :label="comentario.score"
              readonly>
          </div>
        </v-layout>
      </div>
      
    </v-layout>
    
  </v-container>
</template>

<script>
import {firestore} from "@/main"
import {apiKey} from '@/main'
import axios from 'axios'

//import {storage} from '@/main'
export default {
  data(){ 
    return{
      id:this.$route.params.id,
      image: '',
      apiKey:apiKey,
      comentario:"",
      comentarios:[],
    }
  },methods:{
    enviarComentarios:function(){
      const data = {
        "document":{
          "type":"PLAIN_TEXT",
          "language":"ES",
          "content":this.comentario
        },
        "encodingType": "UTF8"
      }
    axios.post(`https://language.googleapis.com/v1/documents:analyzeSentiment?key=${this.apiKey}`,data).
    then(response=>{
      const score = response.data.documentSentiment.score
      let comentario= {
        imageId:this.id,
        texto:this.comentario,
        createdAt:(+new Date()),
        score:score
      }
      firestore.collection('comentarios').add(comentario).then(response=>{
        console.log(response)
        const length = this.comentarios.length
        let scorePromedio = 0
        this.comentarios.forEach(
          comentario=>scorePromedio = scorePromedio + comentario.score
        )
        scorePromedio = scorePromedio/length
        firestore.collection('images').doc(this.id).set({
          scorePromedio:scorePromedio
        },{
        merge:true
        })
        this.comentario = ''
      })
    })
    },
    selectClass:function(score){
      if(score < -0.25){
        return "red"
      }
      if(score >= -0.25 && score < 0.25){
        return "warning"
      }else{
        return "success"
      }
    }
  },
  firestore(){
      return{
        image:firestore.collection('images').doc(this.id),
        comentarios:firestore.collection("comentarios").where("imageId","==",this.id)
        }
  }
}
</script>

<style>

</style>