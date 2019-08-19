<template>
  <div class="container">
    <div class="form-row d-flex">
    <form action="" class="fom">
        <div class="container">
      <div class="form-group">
        <label for="title">Course title</label>
        <input
          type="text"
          v-model="course.name"
          id="title"
          class="form-control"
          :class="{'is-invalid':errors.name.show}"
        />
        <div class="invalid-feedback" v-show="errors.name.show">{{errors.name.message}}</div>
      </div>
      <div class="form-group">
        <label for="category">Category</label>
        <select
          id="category"
          v-model="course.category_id"
          class="form-control"
          :class="{'is-invalid' : errors.category_id.show}"
        >
          <option disabled selected value>Select category</option>
          <option
            v-for="(category, key) in categories"
            :key="key"
            :value="category.id"
          >{{category.name}}</option>
        </select>
        <div
          class="invalid-feedback"
          v-show="errors.category_id.show"
        >{{errors.category_id.message}}</div>
      </div>

      <div class="form-group">
        <label for="price">Price</label>
        <input
          type="number"
          v-model="course.price"
          id="price"
          :class="{'is-invalid' : errors.price.show}"
          class="form-control"
        />
        <div class="invalid-feedback" v-show="errors.price.show">{{errors.price.message}}</div>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          v-model="course.description"
          id="description"
          :class="{'is-invalid' : errors.description.show}"
          class="form-control"
        ></textarea>
        <div
          class="invalid-feedback"
          v-show="errors.description.show"
        >{{errors.description.message}}</div>
      </div>
      
        </div>
      <div class="row">
        <div class="col-lg-8 w-100">
          <div class="form-group mt-2">
            <label>Duration</label>

            <div class="d-flex duration">
              <div class="mr-2 w-100">
                <select v-model="duration.hour" class="form-control w-100">
                  <option>Hour</option>
                  <option v-for="n in 24">{{n}}</option>
                </select>
              </div>

              <div class="w-100">
                <select v-model="duration.minute" class="form-control w-100">
                  <option>Minute</option>
                  <option v-for="n in 60">{{n}}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="d-flex justify-content-center">
        <button type="submit" :disabled="sendingRequest" class="btn btn-primary">
          <i v-if="sendingRequest" class="fa fa-spin fa-spinner"></i>
          {{formAction}} Create Course
        </button>
      </div>
    </form>

    <div class="col-lg-5 ">
          <div class="col-lg-3 mr-0 add-course-cover-column mage">
            <h6 class="pl-5 "></h6>
            <div :class="{'border-danger border':errors.cover_image.show}">
              <img
                ref="imgPreview"
                @click="openImageDialog"
                title="Click to add image"
                src="/img/image-icon.png"
                alt="cover Image"
                class=" img-placeholder mage"
              />
              <input
                @change="handleImageUpload($event)"
                type="file"
                accepts="image/*"
                style="display: none"
                ref="imagePicker"
              />
            </div>
            <div
              class="invalid-feedback"
              v-show="errors.cover_image.show"
            >{{errors.cover_image.message}}</div>
          </div>
        </div>
      
    </div>
  </div>
</template>

<script>
  export default {
    name: "course-form-modal",
    props:{
      config: {
        type: Object,
        required: true,
        default: {}
      },
      sendingRequest: {
        type: Boolean
      },
        formAction: {
          type: String
        }
    },
      created() {
        this.getCategories()
          this.errors = this.getValidationErrors();
      },

    data:()=>({
      course:{
        name: '',
        price: '',
        category_id: '',
        description: '',
          type: 'course',
          cover_image: '',
          is_available: '1'
      },
        categories: [],
        duration: {
            hour: '',
            minute: ''
        },
        errors: {},
    }),
    methods: {

      open(course = null){
          if(course) {
              console.log(course)
              this.course = {...course}
              this.$emit('courseId', course.id)
          } else {
              this.course = {
                  name: '',
                  price: '',
                  category_id: '',
                  description: '',
                  type: 'course',
                  cover_image: '',
                  is_available: '1'
              }
          }
          this.$refs.courseModal.show(course)
      },

      close(){
        this.$refs.courseModal.hide()
      },

      submitForm(){
        axios.post('url')
          if (this.formIsValid()){
              const formData = new FormData();
              Object.keys(this.course).forEach((field) => {
                  if(field == 'cover_image'){
                      if(this.course[field] instanceof File)
                          formData.append('product_images[0]',this.course[field],this.course[field].name);
                  } else{
                      formData.append(field,this.course[field])
                  }

              });

              formData.append('type','course');
              formData.append('duration',this.duration.hour+':'+this.duration.minute);
              this.$emit('formSubmitted',formData,this.clearForm)
          }
        // this.$emit('formSubmitted',this.course,this.clearForm)
      },

      clearForm(){

        Object.keys(this.course).forEach((field) => {
          this.course[field] = '';
        });

        this.close();
      },
        getCategories(){
            this.$axios
                .get('categories?type=course')
                .then(({data}) => {
                    this.categories = data.data;
                })
                .catch(({response}) => {
                    console.log("Error getting categories");
                    console.log(response);
                })
        },
        handleImageUpload(event){
            if(event.target.files.length>0){
                if(event.target.files[0].type.match('image/*')){
                    const fileReader = new FileReader();
                    fileReader.onload = ({target}) => {
                        this.$refs.imgPreview.src = target.result;
                    }
                    fileReader.readAsDataURL(event.target.files[0]);
                    this.course.cover_image = event.target.files[0];
                }
            }

        },
        openImageDialog() {
          this.$refs.imagePicker.click()
        },

        formIsValid(){
            let isValid = true;
            this.errors = this.getValidationErrors();
            Object.keys(this.course).forEach((field) => {

                if(!this.course[field]){
                    isValid = false;
                    if(this.errors[field]){
                        this.errors[field].show = true
                    }

                }else {
                    if(this.errors[field]){
                        this.errors[field].show = false
                    }

                }
            })




            return isValid;
        },

        getValidationErrors:()=>({
            name:{
                message: 'Name is required',
                show: false,
            },

            price: {
                message: "Price is required",
                show:false,
            },
            category_id: {
                message: "Select category",
                show:false
            },

            cover_image:{
                message: "Cover image is required",
                show:false
            },

            description: {
                message: "Description is required",
                show:false
            }
        }),
        openUpdateCourseModal (course = null) {

        }

    }

  }
</script>

<style scoped>
.fom{
  width: 500px !important;
}
.mage{
  width: 300px !important;
  height: 400px !important;
}
</style>
