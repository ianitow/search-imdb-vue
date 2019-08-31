<template>
  <div class="q-ml-lg q-pa-md row items-start q-gutter-md flex wrap">
    <Movie
      v-for="valor in data"
      :object="valor"
      :key="valor.title"
    />
  </div>

</template>

<script>
import Movie from '../components/Movie'
export default {
  props: ['data'],
  components: {
    Movie
  }
}
</script>

<style>
</style>
