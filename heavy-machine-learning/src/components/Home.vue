<template>
<div >

    <div class="row">
      <div class="col-12">
        <q-file v-model="model" label="Standard"  @change="processFile($event)"/>
      </div>
      <div class="col-12 ">
    <q-btn color="white" text-color="black" label="Upload" @click="uploadFile"/>
      </div>
      <div class="col-12">
        <q-separator />
      </div>
    </div>

    <div class="row">
      <div class="col">
        

        <div class="q-pa-md row items-start q-gutter-md" v-for="image in images" v-bind:key="image.id">
          <q-card class="my-card">
            <img :src="image.url">

          <q-card-section>
            <div class="text-h6">{{image.name}}</div>
            <div class="text-subtitle2">by Pepe</div>
          </q-card-section>

        <q-card-section class="q-pt-none">
          {{image.scorePromedio}}
        </q-card-section>
          </q-card>


        </div>
      </div>
      <div class="col-12 col-md-auto">
        .col-12 .col-md-auto (Variable width content)
      </div>
      <div class="col">
        .col
      </div>
    </div>

  </div>
</template>






<script>
import {firestore} from '@/main'
import {storage} from '@/main'

export default {
  data:()=>({
    file:'',
    images:[]
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
    }
  },
  firestore(){
    return {
      images:firestore.collection("images")
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
