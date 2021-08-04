<template>
<v-container>
  <v-layout >
    <div class ="xs12  pb-3">
      <input type="file" ref = "fileInput" id ="file"  @change="processFile($event)">

    </div>
  </v-layout>
  <v-layout class = "xs12 pl-2 pb-3">
    <div>
      <v-btn color="primary" @click="uploadFile()">Subir</v-btn>
    </div>
  </v-layout>
  <v-divider></v-divider>
  <v-layout row wrap align-center>
    <div>
      <v-container fluid class="pl-0 pr-0">
        <v-layout row wrap>
          <div v-for="image in images" v-bind:key = "image.id">
            <v-card>
              <img class="white--text" style="height:150px" :src="image.url">
              <v-card-title>
                <div>
                  <span class="grey--text">{{image.name}}</span>
                  <br>
                  <v-chip :color = "selectClass(image.scorePromedio)">{{image.scorePromedio}}</v-chip><br>
                  <div v-for="label in image.labels" v-bind:key = "image.labels[label]">
                    <span>{{label}}</span>
                  </div>
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
import {apiKey} from '@/main'
import {storage} from '@/main'
import axios from 'axios'
export default {
  data:()=>({
    file:'',
    images:[],
    apiKey:apiKey,
  }),
  methods:{
    selectClass:function(score){
      if(score < -0.25){
        return "red"
      }
      if(score >= -0.25 && score < 0.25){
        return "warning"
      }else{
        return "info"
      }
    },
    processFile:function(event){
      this.file = event.target.files[0]
    },
    uploadFile:function(){
      console.log("AAAAAAAA")
      let name = (+new Date())+'-'+this.file.name
      let metadata = {contentType: this.file.type}
      storage.child(name).put(this.file,metadata).
      then(snapshot => snapshot.ref.getDownloadURL()).
      then(url => {
        console.log(url)
        const input = this.$refs.fileInput
        input.type = "text"
        input.type = "file"
        const data = {
          "requests":[{
            'features':[{
              'type':"LABEL_DETECTION"
            }],
            "image":{
              "source":{
                "imageUri":url
              }
            }
          }]
        }
        axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${this.apiKey}`, data)
        .then(response=>{
          const labels=[]
          let slicedLabelArray = response.data.responses[0].labelAnnotations.slice(0,3)
          slicedLabelArray.forEach(function(label){
            labels.push(label.description)
          })  
          let image = {
          url:url,
          name:name,
          createdAt:(+new Date()),
          labels:labels,
          scorePromedio:0
        }
        firestore.collection('images').add(image)
        }),(error) => {
          console.log(error);
        }
        
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
  filters:{
    separatedLabels:function(value){
      return `${value[0]},${value[1]},${value[2]}`
    }
  }
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
