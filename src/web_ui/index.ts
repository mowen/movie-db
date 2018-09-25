import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import Movie from './Movie.vue'
import MovieList from './MovieList.vue'

Vue.use(VueRouter);

window.onload = function() {
  const router = new VueRouter({
    routes: [
      { path: '/', name: 'movieList', component: MovieList },
      { path: '/movie/:imdbId', name: 'movie', component: Movie }
    ],
    mode: 'history'
  });

  new Vue({
    el: '#app',
    router,
    render: h => h(App)
  })
}