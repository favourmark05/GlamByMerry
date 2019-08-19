<template>
    <div class="categories">

      <breadcrumb :links="breadcrumbLinks"/>

      <div>
        <h5>Manage Categories</h5>

        <div class="row">
            <div class="col-lg-4">
              <service-category/>
            </div>

          <div class="col-lg-4">
            <product-category/>
          </div>

          <div class="col-lg-4">
          <course-category/>
          </div>

        </div>

      </div>

    </div>
</template>

<script>
    import Breadcrumb from "../components/general/breadcrumb";
    import ProductCategory from "../components/category/product-category";
    import ServiceCategory from "../components/category/service-category";
    import CourseCategory from "../components/category/course-category";
    export default {
        name: "categories",
      components: {CourseCategory, ServiceCategory, ProductCategory, Breadcrumb},
      data:() => ({

        breadcrumbLinks: [
          {
            title: "Manage Categories",
            path: "/categories"
          },


        ]
      })


    }
</script>

<style scoped>

</style>
