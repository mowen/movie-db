<template>
  <div>
    <div v-for="movie in movies" :key="movie.imdbId">
      <router-link :to="{ name: 'movie', params: { imdbId: movie.imdbId }}">
        {{ movie.title }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import axios from "axios";
  
  @Component
  export default class MovieList extends Vue {
    movies: Array<any> | null = [];

    async mounted(): Promise<void> {
      let movieResponse = await axios.get('/api/movies');
      this.movies = movieResponse.data.movies;
     }
  }
</script>