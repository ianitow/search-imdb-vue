<template>
  <a :href="link">
    <q-card class="my-card">
      <img
        :src="src"
        style="max-height:200px; max-width:200px;"
      >
      <q-card-section>
        <div class="text-h6">{{name}}</div>
        <div class="text-subtitle2">{{desc}}</div>
      </q-card-section>
    </q-card>
  </a>
</template>

<script>
export default {
  props: ['object'],
  data () {
    return {
      src: this.object.src,
      name: this.object.name,
      desc: this.object.desc,
      link: this.object.link
    }
  }
}
</script>

<style>
</style>
