<template>
  <div class="create-product">
    <breadcrumb :links="breadcrumbLinks"/>
    <card title="Add new product">
      <product-form/>
    </card>
  </div>

</template>

<script>
  import Breadcrumb from "~/components/general/breadcrumb";
  import Card from "~/components/general/card";
  import ProductForm from '~/components/products/product-form'


    export default {
        name: "update",
      components: {ProductForm, Card, Breadcrumb },

      data:()=>({
        breadcrumbLinks:[
          {
            title:"Products",
            path:'/products'
          },
          {
            title:"update product",
            path:'/products/index'
          }
        ],

      productId:null,
      product:{},
      sendingRequest:false,
      updatingService:false,
      formConfig: {
        btnText: "Update product",
        title:"Update product"
      }


    }),

    methods:{

      getproducts(){
        this.sendingRequest = true;
        this.$axios.get('products/'+this.productId)
          .then(({data}) => {
             this.product = data.data
          })
          .catch(() => {
            this.$toast.error("Error fetching product")
            this.errorOccured = true;
          }).finally(() => {
            this.sendingRequest = false;
        })
      },


      updateService(product){
        this.updatingproduct = true
        this.$axios.post('/products/'+this.products.id+'/update',products)
          .then((res) => {
            this.$toast.success("Product updated successfully");
          }).catch((err)=>{
            this.$toast.error("Something went wrong product was not updated");
        }).finally(() => {
          this.updatingProduct = false
        })

      }
    },

    created() {
       this.productId =  this.$route.params.id;
       this.getproducts()
    }

  }
</script>

<style scoped>

</style>
