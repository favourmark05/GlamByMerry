<template>
    <div class="customers">
      <breadcrumb :links="breadcrumbLinks"/>
      <card title="Manage customers">
         <table class="table">
           <thead>
            <tr>
              <th>S/N</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone No</th>
<!--              <th>Action</th>-->
            </tr>
           </thead>
           <tbody>
              <tr v-for="(customer, index) in customers">
                <td>{{index+1}}</td>
                <td>{{customer.first_name}}</td>
                <td>{{customer.last_name}}</td>
                <td>{{customer.email}}</td>
                <td>{{customer.phone_no}}</td>
<!--                <td>-->
<!--                  <button class="btn btn-danger btn-sm" @click="disableCustomer">Disable</button>-->
<!--                </td>-->
              </tr>
           </tbody>
         </table>
      </card>
    </div>
</template>

<script>
    import Breadcrumb from "../components/general/breadcrumb";
    import Card from "../components/general/card";
    export default {
      name: "customers",
      components: {Card, Breadcrumb},
      data:() => ({
        breadcrumbLinks:[
          {
            title: "Manage customers",
            path: "/customers"
          }
        ],
        customers:[],
        customersMeta: {},
      }),
      methods: {

        getCustomers(){
          this.$axios.get('/account/list')
            .then((res) => {
              this.customers = res.data.data.items;
              this.customersMeta = res.data.data.meta;
            })
        },


        disableCustomer(){

        }
      },

      mounted() {
        this.getCustomers();
      }
    }
</script>

<style scoped>

</style>
