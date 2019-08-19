<template>
  <div class="create-services">
    <breadcrumb :links="breadcrumbLinks"/>
    <card title="Edit Service" v-if="!sendingRequest">
      <service-form
        :config="formConfig"
        :updated-service="service"
        :sending-request="updatingService"
        @formSubmitted="updateService"/>
    </card>
  </div>
</template>

<script>
  import Breadcrumb from "~/components/general/breadcrumb";
  import Card from "~/components/general/card";
  import ServiceForm from "~/components/services/service-form";

  export default {
    name: "edit",
    components: {ServiceForm, Card, Breadcrumb },

    data: () => ({
      breadcrumbLinks:[
        {
          title:"Services",
          path:'/services'
        },
        {
          title:"Edit Service",
          path:''
        }
      ],

      productId:null,
      service:{},
      sendingRequest:false,
      updatingService:false,
      formConfig: {
        btnText: "Update Service",
        title:"Update service"
      }


    }),

    methods:{

      getService(){
        this.sendingRequest = true;
        this.$axios.get('products/'+this.productId)
          .then(({data}) => {
             this.service = data.data
          })
          .catch(() => {
            this.$toast.error("Error fetching product")
            this.errorOccured = true;
          }).finally(() => {
            this.sendingRequest = false;
        })
      },


      updateService(service){
        this.updatingService = true
        this.$axios.post('/products/'+this.service.id+'/update',service)
          .then((res) => {
            this.$toast.success("Service updated successfully");
          }).catch((err)=>{
            this.$toast.error("Something went wrong product was not updated");
        }).finally(() => {
          this.updatingService = false
        })

      }
    },

    created() {
       this.productId =  this.$route.params.id;
       this.getService()
    }

  }
</script>

<style scoped>

</style>
