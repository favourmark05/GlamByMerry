<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <nuxt-link to="/"><i class="fa fa-dashboard"></i> Dashboard</nuxt-link>
      </li>
      <li v-for="(link,key) of links" class="breadcrumb-item">
        <nuxt-link  :to="link.path">{{link.title}}</nuxt-link>
      </li>
    </ol>
  </nav>
</template>

<script>
    export default {
        name: "Breadcrumb",
        props:{
          links: {
            type: Array,
            required: true
          },

        },
      methods:{

      }
    }
</script>

<style scoped>

</style>
