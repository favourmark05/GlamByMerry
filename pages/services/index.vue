<template>
  <div class="services">
    <breadcrumb :links="breadcrumbLinks"/>
    <card title="Manage Services">

      <!--Loader   -->
      <div class="loading mx-auto text-center" v-if="sendingRequest">
        <loader/>
        <p>Fetching your services please wait ...</p>
      </div>
      <!-- /Loader -->


      <!--  No services message -->
      <div class="text-center"  v-if="!services.length && !sendingRequest && !serverError && !connectionError">
        <h6 class="mb-4">No service has been added yet</h6>
        <nuxt-link to="/services/create" class="btn btn-primary btn-sm">Add Service</nuxt-link>
      </div>
      <!--/ No services message -->

      <!--Connection error -->
      <div class="connection-error text-center" v-if="connectionError && !sendingRequest && !serverError">
        <h6 class="text-danger">Connection Error</h6>
        <p class="text-danger">Can not connect to server, make you are connected then try again</p>
        <button @click="getServices()" class="btn btn-primary btn-sm">Try again</button>
      </div>
      <!--/Connection error-->

      <div class="server-error text-center" v-if="!connectionError && !sendingRequest && serverError">
        <h6 class="text-danger">Server Error</h6>
        <p class="text-danger">An error occurred on the server, contact support</p>
      </div>
          <service-table
            :services="services"
            v-if="services.length> 0"
            @shown="detailsShown=true"


          ></service-table>

    </card>
  </div>
</template>
<script>
  import Breadcrumb from "~/components/general/breadcrumb";
  import Card from "~/components/general/card";
  import Loader from "../../components/general/loader";
  import ServiceTable from "../../components/services/service-table";

  export default {
    name: "index",
    components:{ServiceTable, Loader, Breadcrumb, Card},
    data: () => ({
      breadcrumbLinks:[
        {
          title:"Services",
          path:'/services'
        },
      ],

      services:[],

      sendingRequest:false,
      connectionError:false,
      serverError:false,
      detailsShown:false


    }),

    methods: {
      getServices(){

        this.sendingRequest = true;
        this.connectionError =false;
        this.serverError = false;

        this.$axios.get('products/services')
          .then((res)=>{
            this.services = res.data.data
          }).catch((error) => {

          if(!error.response){
            this.connectionError = true;
          }else {
            this.serverError = true;
          }
        }).finally(()=>{
          this.sendingRequest = false
        })

      },
    },

    created() {
      this.getServices();
    }

  }
</script>

<style scoped>

</style>
