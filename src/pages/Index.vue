<template>
  <div>
    <q-page
      class="flex flex-center"
      style="min-height:300px;"
    >
      <h2 class="text-center full-width q-my-none">IMDB Search</h2>
      <q-input
        v-model="nameOfMovie"
        outlined
        class="self-start"
        style="width:70%;"
        label="Insira o nome do filme aqui..."
      />
    </q-page>
    <div class="flex flex-center">
      <h6
        v-if="this.search == 'searching'"
        class="full-width text-center"
      >Buscando seu filme...</h6>
      <h6
        v-if="this.search == 'not-found'"
        class="full-width text-center"
      >Filme não encontrado :(</h6>
      <h6
        v-else-if="this.search == 'wait'"
        class="full-width text-center"
      >Esperando parar de digitar...</h6>
      <h6
        v-else-if="this.search == 'founded'"
        class="full-width text-center"
      >Filmes encontrados</h6>
      <MovieList :data="movies" />
    </div>
  </div>

</template>

<style>
</style>

<script>
import store from '../store/index'
import _ from 'lodash'
import MovieList from '../components/MovieList'
export default {
  created: function () {
    this.getResponseFromAPI = _.debounce(this.updateNameInStore, 500)
  },
  data () {
    return {
      search: '',
      movies: [],
      nameOfMovie: this.$store.movieimdb
    }
  },
  store,
  components: {
    MovieList
  },
  methods: {
    updateNameInStore: function () {
      this.$store.commit('updateNameInStore', this.nameOfMovie)
      this.search = 'searching'
      let vm = this
      this.$http.get('', { params: { apikey: 'f7bfe6d2', s: this.nameOfMovie } }).then(function (response) {
        if (response.data.Response === 'False' && response.status === 200) {
          vm.search = 'not-found'
        } else if (response.data.Response === 'True' && response.status === 200) {
          vm.search = 'founded'
          response.data.Search.forEach(element => {
            vm.movies.push({
              name: element.title,
              desc: element.Year,
              src: (element.Poster === 'N/A') ? 'https://static.thenounproject.com/png/140281-200.png' : element.Poster,
              link: 'https://www.imdb.com/title/' + element.imdbID
            })
          })
        }
      }).catch((err) => {
        throw err
      })
    }
  },
  watch: {
    nameOfMovie: function (newQuestion, oldQuestion) {
      this.search = 'wait'
      this.movies = []
      this.getResponseFromAPI()
    }
  }
}

</script>
