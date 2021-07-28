<template>
  <v-app>
    <v-main>
      


    <v-app-bar density="compact">
      <v-app-bar-title>AI Abstract Vision</v-app-bar-title>
  
      <v-spacer></v-spacer>
  
      <v-btn text>Developer</v-btn>
  
      <v-btn class="mr-3" text>Abstract</v-btn>
  
      <v-divider inset vertical></v-divider>
  
      <v-btn
        class="mr-4 ml-5"
        color="primary"
        plain
      >
        <v-icon left icon="mdi-handshake-outline"></v-icon>
  
        <span>Jose Hernandez</span>
      </v-btn>
    </v-app-bar>


      <router-view/>
      
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>
