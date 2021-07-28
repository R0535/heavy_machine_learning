<template>
<v-container>
  <v-layout row wrap align-center>
    <v-flex class="xs12 sm6 md6 lg4">
      <v-card>
        <v-img class="white--text " height = "200px"
        :src = "image.url"></v-img>
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
    </v-flex>
  </v-layout>
  <v-layout>
    <v-flex  class="xs12 ">
      <v-text-field label= "¿Que  arece esta foto?" v-model="comentario"></v-text-field>  <!-- TEXT FIELD CTA-->
      <v-layout>
        <v-flex class= "xs12 pt5">
          <h1>Otros comentarios</h1>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>