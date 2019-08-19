<template>
  <div class="create-services">
    <breadcrumb :links="breadcrumbLinks" />
    <card title="Add new Service">
      <service-form
        :config="formConfig"
        :sending-request="sendingRequest"
        @formSubmitted="createService"/>

    </card>
  </div>
</template>

<script>
  import Breadcrumb from "~/components/general/breadcrumb";
  import Card from "~/components/general/card";
  import ServiceForm from "../../components/services/service-form";


  export default {
    name: "create",
    components: {ServiceForm, Card, Breadcrumb },
    data: () => ({
      breadcrumbLinks:[
        {
          title:"Services",
          path:'/services'
        },
        {
          title:"Create Service",
          path:''
        }
      ],
      formConfig:{
        title: "Create service",
        btnText: "Add Service"
      },

      editor: null,
      sendingRequest: false

    }),

    methods:{
      createService(service,done){
        this.sendingRequest = true;
        this.$axios.post('products',service)
          .then(({data}) => {
            this.$toast.success("Service added successfully");
          done()//Service form callback to clear the form
          }).catch(({response}) => {
          this.$toast.error("Something went service was not added");

        }).finally(()=>{
          this.sendingRequest  = false;
        })
      }
    },
    mounted() {

    },
  }
</script>

<style scoped >



</style>
