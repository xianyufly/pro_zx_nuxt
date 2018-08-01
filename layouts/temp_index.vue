<template>
  <div>
    <v-menu :menuData="menuData"></v-menu>
    <nuxt/>
    <v-copyright></v-copyright>
  </div>
</template>
<script>
import menu from '~/components/menu.vue'
import copyright from '~/components/copyright.vue'
export default {
  components: {
    "v-menu": menu,
    "v-copyright": copyright
  },
  props: [],
  data() {
    return {
      menuData: this.$store.state.menu.menuArray
    }
  },
  mounted() {
  },
  methods: {

  }
}

</script>
<style>


</style>
