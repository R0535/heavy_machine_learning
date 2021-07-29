<template>
  <v-container>
    <v-layout row wrap align-center>
        <v-card>
          <v-img class="white--text"  :src = "image.url"></v-img>
          <v-card-title>
                  <div>
                    <span class="grey--text">{{image.name}}</span>
                    <br>
                    <v-chip>{{image.scorePromedio}}</v-chip>
                    <br>
                  </div>
          </v-card-title>
          <v-card-actions>
            <input   type="text" v-model="comentario" style="background-color:black;color:white">
            <v-btn primary @click="enviarComentarios()">Comentar</v-btn>
          </v-card-actions>
        </v-card>
    </v-layout>
    <v-layout style="display:block">      
      <div >
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
//import {storage} from '@/main'
export default {
  data(){ 
    print(this.$route.params.id)
    return{
      id:this.$route.params.id,
      image: '',
      comentario:"",
      comentarios:[],
    }
  },methods:{
    enviarComentarios:function(){
      let comentario = {
        imageId:this.id,
        texto : this.comentario,
        createdAt:(+new Date()),
        score: 0
      }
      firestore.collection('comentarios').add(comentario)
    },
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