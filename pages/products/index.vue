<template>
 <div class="manage-products">
   <breadcrumb :links="breadcrumbLinks"/>

   <div>
     <product-card/>
   </div>
 </div>
</template>

<script>
    // import Index from '../../components/products/index'
    // import Card from "../../components/general/card";
    import ProductCard from "../../components/products/product-card";
    import Breadcrumb from "../../components/general/breadcrumb";
    export default {
        name: "index",
        components: {
          Breadcrumb,
          ProductCard
        },
      data: () => ({
        breadcrumbLinks:[
          {
            title:"Products",
            path: "/products"
          },

          {
            title: "Manage Products",
            path:""
          }
        ]
      })
    }
</script>

<style scoped>

</style>
