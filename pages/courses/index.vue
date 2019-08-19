<template>
 <div class="courses">
   <breadcrumb :links="breadcrumbLinks"/>

   <div class="card">

     <header class="card-header">
       <div class="row">
         <div class="col-lg-10">
         Manage courses
         </div>
         <div class="col-lg-2">
           <button @click="newCourse" class="btn btn-primary btn-sm">Add Course</button>
         </div>
       </div>
     </header>
     <div class="card-body">
       <table class="table">
         <thead>
          <tr>
            <th>S/N</th>
            <th>Title</th>
            <th>Price</th>
            <th class="text-center">Actions</th>
          </tr>
         </thead>
         <tbody>
         <tr v-for="(course, key) in courses" :key="key">
           <td>{{key + 1}}</td>
           <td>{{course.title}}</td>
           <td>{{course.price | currency}}</td>
           <td class="text-center">
             <div class="btn btn-group btn-group-sm">
               <button @click="openUpdateCourseModal(key)" class="btn btn-primary">Edit</button>
               <div class="btn btn-secondary">Manage</div>
               <button @click="deleteCourse(course.id)" class="btn btn-danger">Delete</button>
             </div>
           </td>
         </tr>
         </tbody>
       </table>

     </div>
   </div>

   <course-form-modal
     :config="modalConfig"
     :course="editedCourse"
     @formSubmitted="handleFormSubmit"
     @courseId="getCourseId"
     :sending-request="sendingRequest"
     :form-action="formAction"
     ref="courseModal" />
 </div>


</template>

<script>
    import Breadcrumb from "../../components/general/breadcrumb";
    import Card from "../../components/general/card";
    import CourseFormModal from "../../components/course/course-form-modal";
    export default {
        name: "index",
      components: {CourseFormModal, Card, Breadcrumb},
      data:()=>({
        breadcrumbLinks:[
          {
            title:"Manage Courses",
            path:'/courses'
          },
        ],

        modalConfig: {},
        editedCourse: null,
        formAction: 'Add',
        sendingRequest: false,
          courses: [],
          updateCourseId: ''
      }),
        created(){
            this.listCourses()
        },

      methods: {
          newCourse(){
            let config = {};
           config.title = "Create course";
           config.actionBtnText = "Add course";
           this.modalConfig = config;
           this.formAction = 'Add';
           this.editedCourse = null;
           this.$refs.courseModal.open()
          },

        handleFormSubmit(course,clearForm){
              console.log(this.formAction)
            if(this.formAction === 'Add'){
              this.addCourse(course,clearForm);
            }

            if (this.formAction === 'Update') {
              this.updateCourse(course);
            }
        },


        addCourse(course){
              console.log(course)
            console.log('Adding new course')
          this.sendingRequest = true;
          this.$axios
              .post('products', course)
              .then((response) => {
                  console.log('Course added successfully')
                  console.log(response.data.data)
                  this.listCourses()
                  this.$refs.courseModal.close()
                  this.$refs.courseModal.clearForm()
                  this.$toast.success("Course Created Successfully");
              })
            // setTimeout(() => {
            //   this.sendingRequest = false
            //   clearForm();
            // },2000)
        },

        updateCourse(course){
              this.sendingRequest = true
          console.log(this.updateCourseId)
            this.$axios
                .post('products/' + this.updateCourseId + '/update', course)
                .then((response) => {
                    console.log('Course Updated Successfully')
                    this.$toast.success('Course updated successfully')
                    this.listCourses()
                    this.sendingRequest = false
                    this.$refs.courseModal.close()
                    this.$refs.courseModal.clearForm()
                })
                .catch((error) => {
                    console.log('Error updating courses')
                    this.$toast.error('An error occurred while trying to update course')
                })
        },
          listCourses() {
              this.sendingRequest = true
              console.log('Listing Courses')
              this.$axios
                  .get('products/courses')
                  .then((response) => {
                      this.courses = response.data.data
                      console.log(this.courses)
                      this.sendingRequest = false
                  })
                  .catch((error) => {
                      console.log('Error getting courses')
                      console.log(error)
                  })
          },
          openUpdateCourseModal(key) {
              const course = {...this.courses[key]}
              this.formAction = 'Update'
              this.title = 'Update Course'
              this.$refs.courseModal.open(course)
          },

          getCourseId(courseId) {
              this.updateCourseId = courseId
          },
          deleteCourse(id) {

              swal({
                  title: "Are you sure?",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
              })
                  .then((willDelete) => {
                      if (willDelete) {
                          this.sendingRequest = true
                          this.$axios
                              .delete('products/' + id)
                              .then((response) => {
                                  console.log('Course deleted successfully')
                                  console.log(response.data.data)
                                  this.listCourses()
                                  this.$toast.success('Course deleted successfully')
                              })
                              .catch((error) => {
                                  console.log('Error deleting course')
                                  this.$toast.error('An error occurred while trying to delete course')
                                  console.log(error)
                              })
                      }
                  });
          }


      },



    }
</script>

<style scoped>
.table td {
  vertical-align: 0 !important;
}
</style>
