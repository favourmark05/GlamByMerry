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
        name: "create",
      components: {ProductForm, Card, Breadcrumb },

      data:()=>({
        breadcrumbLinks:[
          {
            title:"Products",
            path:'/products'
          },
          {
            title:"Create Product",
            path:'/products/create'
          }
        ],
      })

    }
</script>

<style scoped>

</style>
