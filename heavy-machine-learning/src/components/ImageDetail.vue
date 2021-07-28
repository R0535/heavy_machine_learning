<template>
<div class="row">
      <div class="col">
        

        <div class="q-pa-md row items-start q-gutter-md" v-for="image in images" v-bind:key="image.id">
          <q-card class="my-card" style="width:16rem" >
            <img :src="image.url">

          <q-card-section>
            <div class="text-h6">{{image.name}}</div>
            <div class="text-subtitle2">by Pepe</div>
          </q-card-section>

        <q-card-section class="q-pt-none">
          {{image.scorePromedio}}
        </q-card-section>
        <q-card-section class="q-pt-none">

        </q-card-section>
          </q-card>


        </div>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>