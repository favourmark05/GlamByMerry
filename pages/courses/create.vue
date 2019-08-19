<template>
  <div class="courses">
    <breadcrumb :links="breadcrumbLinks" />
    <card title="Create course">
        <course-form/>
    </card>
  </div>
</template>

<script>
  import Breadcrumb from "~/components/general/breadcrumb";
  import Card from "../../components/general/card";
  import CourseForm from "./course-form";

  export default {
        name: "create",
      components:{
        CourseForm,
        Card,
        Breadcrumb
      },
      data: () => ({
        breadcrumbLinks:[
          {
            title:"Courses",
            path:'/courses'
          },
          {
            title:"Create Course",
            path:''
          }
        ],
        formConfig:{
          title: "Create Course",
          btnText: "Add Course"
        },

        editor: null,
        sendingRequest: false

      }),
    }
</script>

<style scoped>

</style>
