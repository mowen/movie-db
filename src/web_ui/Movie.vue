<template>
  <div>
    <h2 v-text="movie.title" />
    <img :src="movie.posterUrl" :alt="movie.title" />
    <p v-text="movie.overview" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import axios from "axios";
  
  @Component
  export default class Movie extends Vue {
    movie: any | null = null;

    async mounted(): Promise<void> {
      let imdbId = this.$route.params.imdbId;
      let movieResponse = await axios.get(`/api/movies/${imdbId}`); 
      this.movie = movieResponse.data.movie;
    }
  }
</script>