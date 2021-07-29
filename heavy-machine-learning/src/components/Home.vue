<template>
<v-container>
  <v-layout >
    <div class ="xs12  pb-3">
      <input type="file" ref = "fileInput" id ="file"  @change="processFile($event)">

    </div>
  </v-layout>
  <v-layout class = "xs12 pl-2 pb-3">
    <div>
      <v-btn color="primary" @change="processFile($event)">Subir</v-btn>
    </div>
  </v-layout>
  <v-divider></v-divider>
  <v-layout row wrap align-center>
    <div>
      <v-container fluid class="pl-0 pr-0">
        <v-layout row wrap>
          <div v-for="image in images" v-bind:key = "image.id">
            <v-card>
              <v-img class="white--text" height="200px" :src = "image.url"></v-img>
              <v-card-title>
                <div>
                  <span class="grey--text">{{image.name}}</span>
                  <br>
                  <v-chip>{{image.scorePromedio}}</v-chip>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat @click="goToImageDetail(image.id)">Explorar</v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-layout>
      </v-container>

    </div>
  </v-layout>
</v-container>
</template>






<script>
import {firestore} from '@/main'
import {storage} from '@/main'

export default {
  data:()=>({
    file:'',
    images:[],
  }),
  methods:{
    processFile:function(event){
      this.file = event.target.files[0]
    },
    uploadFile:function(){
      let name = (+new Date())+'-'+this.file.name
      let metadata = {contentType: this.file.type}
      storage.child(name).put(this.file,metadata).
      then(snapshot => snapshot.ref.getDownloadURL()).
      then(url => {
        let image = {
          url:url,
          name:name,
          createdAt:(+new Date()),
          scorePromedio:0
        }
        firestore.collection('images').add(image)
      })
    },
    goToImageDetail: function(id){
      this.$router.push({path:`/image/${id}`})
    },
  },
  firestore(){
    return {
      images:firestore.collection("images")
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
