<template>
  <div class="row">
    <div :class="{'col-lg-9': detailsShown, 'col-lg-12': !detailsShown}">
    <table class="table" >
      <thead>
      <tr>
        <th>S/N</th>
        <th>Name</th>
        <th>Price</th>
        <th>Duration</th>
        <th>Is Available</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(service,key) in services" :key="key">
        <td>{{key+1}}</td>
        <td>{{service.name}}</td>
        <td>{{service.price | currency}}</td>
        <td>{{getDuration(service.duration)}}</td>
        <td>{{service.is_available ? 'Yes' : 'No'}}</td>
        <td>
          <div class="btn-group btn-group-sm">
            <button @click="viewProduct(service)" class="btn btn-primary">View</button>
            <nuxt-link :to="'/services/edit/'+service.id" class="btn btn-secondary">Edit</nuxt-link>
            <button @click="deleteService($event, key)" class="btn btn-danger"><i class="fa fa-spinner fa-spin d-none"></i> Delete</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <service-view @shown="detailsShown = true" @hidden="detailsShown = false" :service="service" ref="productView"></service-view>
  </div>
  </div>
</template>

<script>
  import ServiceView from "./service-view";
  export default {
    name: "service-table",
    components: {ServiceView},
    props: {
      services :{
        type: Array,
        required: true
      },
      service:{},
    },
    data:()=>({
      detailsShown: false
    }),

    methods: {
      viewProduct(service){
        this.service = service;

        this.$refs.productView.show();
      },

      getDuration(duration){
        if(duration)
            return duration.split(':')[0]+'Hrs'+':'+duration.split(':')[0]+'min';
      },

      deleteService(event,index){
        let service = this.services[index];


        this.$swal({
          title: "Delete Service?",
          text: "Are you sure you want to delete service",
          buttons: true,
          dangerMode: true
        }).then( (shouldDelete)=> {

          if(shouldDelete){
            event.target.disabled=!event.target.disabled;
            event.target.firstChild.classList.toggle('d-none');

            this.$axios.delete('products/'+service.id)
              .then(() => {
                this.$toast.success("Service deleted successfully");
                this.services.splice(index,1);
                if(service.id == this.service.id){
                  this.$refs.productView.hide();
                }
              })
              .catch(()=>{
                this.$toast("Something wrong service was not deleted");
              }).finally(() => {
              event.target.disabled=!event.target.disabled;
              event.target.firstChild.classList.toggle('d-none')
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
