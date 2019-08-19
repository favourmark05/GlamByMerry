<template>
  <div>
    <div v-show="userIsLogged" id="container">
      <app-header></app-header>
      <sidebar></sidebar>
    <section id="main-content">
      <section class="wrapper site-min-height">
        <!-- page start-->
        <nuxt />
        <!-- page end-->
      </section>
    </section>
    </div>

  </div>
</template>
<script>
  import AppHeader from "../components/layout/app-header";
  import Sidebar from "../components/layout/sidebar";
  import auth from '../utils/auth'
  export default {
    components: {Sidebar, AppHeader},
      data() {
          return {
              userIsLogged: false
          }
      },
      created() {
        this.checkAuthorization();
        if(!this.userIsLogged) {
            this.$router.push('/login')
        }
      },
      methods: {
          checkAuthorization() {
              if(auth.userIsLogged()) {
                  this.userIsLogged = true
              }
          }
      }
  }
</script>

<style>

</style>
