<template>
    <form @submit.prevent="submitForm">
        <div class="row">
            <div class="col-lg-9">

                <div class="row">
                    <div class="col-12">
                        <div class="form-group">
                            <label for="name">Name:</label>
                            <input v-model="service.name"
                                   type="text" class="form-control"
                                   :class="{'is-invalid':errors.name.show}"
                                   id="name"  placeholder="Name of the service you are providing">
                            <div class="invalid-feedback" v-show="errors.name.show">
                                {{errors.name.message}}
                            </div>

                        </div>
                    </div>

                    <div class="col-lg-6">
                        <label for="price">Price:</label>
                        <input v-model="service.price"
                               class="form-control"
                               type="number"
                               :class="{'is-invalid':errors.price.show}"
                               id="price"
                               placeholder="At what are you providing the service">
                        <div class="invalid-feedback" v-show="errors.price.show">
                            {{errors.price.message}}
                        </div>

                    </div>

                    <div class="col-lg-6">
                        <label for="category">Category</label>
                        <select v-model="service.category_id"   :class="{'is-invalid':errors.category_id.show}"  class="form-control" id="category">
                            <option value="" disabled selected>Select Category</option>
                            <option v-for="(category,index) in categories" :value="category.id">{{category.name}}</option>
                        </select>

                        <div class="invalid-feedback" v-show="errors.category_id.show">
                            {{errors.category_id.message}}
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="form-group mt-2">
                            <label>Duration</label>

                            <div class="d-flex duration">
                                <div class="mr-2">
                                    <select v-model="duration.hour" class="form-control">
                                        <option>Hour </option>
                                        <option v-for="n in 24">{{n}}</option>
                                    </select>
                                </div>
                                <div>
                                    <select v-model="duration.minute" class="form-control">
                                        <option>Minute </option>
                                        <option v-for="n in 60">{{n}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div class="col-lg-4">
                        <div class="form-group mt-3">
                            <label>Currently Available</label>
                            <div>
                                <div class="custom-control custom-radio  custom-control-inline mb-3">
                                    <input v-model="service.is_available" checked value="1" type="radio" id="yes" name="available" class="custom-control-input">
                                    <label class="custom-control-label" for="yes">Yes</label>
                                </div>

                                <div class="custom-control custom-radio  custom-control-inline mb-3">
                                    <input v-model="service.is_available" type="radio" value="0" id="no"  name="available" class="custom-control-input">
                                    <label class="custom-control-label" for="no">No</label>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="col-12">
                        <div class="form-group">
                            <label for="description">Description:</label>
                            <textarea v-model="service.description"  rows="5" id="description"     class="form-control" placeholder="The description of this service"></textarea>

                        </div>
                    </div>
                </div>

                <div class="col-2 mt-3">
                    <button type="submit" :disbabled="sendingRequest" class="btn btn-primary"><i v-show="sendingRequest" class="fa fa-spinner fa-spin"></i> {{config.btnText}}</button>
                </div>

            </div>
            <div class="col-lg-3">
                <h6 class="text-center">Service cover image</h6>
                <div :class="{'border-danger border':errors.cover_image.show}" class="shadow-sm">
                    <img  ref="imgPreview" @click="openImageDialog" title="Click to add image" src="/img/image-icon.png" class="img-fluid img-placeholder">
                    <input @change="handleImageUpload($event)" type="file" accepts="image/*" style="display: none" ref="imagePicker"/>
                </div>
                <div v-if="errors.cover_image.show" class="text-danger">{{errors.cover_image.message}}</div>
                <!--        <el-dialog :visible.sync="dialogVisible">-->
                <!--          <img width="100%" :src="dialogImageUrl" alt="">-->
                <!--        </el-dialog>-->
            </div>
        </div>
    </form>

</template>

<script>
  export default {
    name: "service-form",
    data:() => ({
      service: {
        name: '',
        price: '',
        description: '',
        category_id: '',
        is_available: '1',
        cover_image: ''
      },

      duration:{
        hour:'',
        minute:'',
      },

      categories:[],
      coverImage: null,
      placeholderImg:'/img/image-icon.png',
      errors:{}
    }),

    props:{
      config: {
        type: Object,
        required: true
      },
      sendingRequest : Boolean,
      updatedService: Object

    },
    watch: {

    },
    methods: {
      getCategories(){
        this.$axios
          .get('categories?type=service')
          .then(({data}) => {
            this.categories = data.data;
          })
          .catch(({response}) => {
            console.log("Error getting categories");
            console.log(response);
          })
      },


      submitForm(){

        if (this.formIsValid()){
          const formData = new FormData();
          Object.keys(this.service).forEach((field) => {
            if(field == 'cover_image'){
              if(this.service[field] instanceof File)
                formData.append('product_images[0]',this.service[field],this.service[field].name);
            } else{
              formData.append(field,this.service[field])
            }

          });

          formData.append('type','service');
          formData.append('duration',this.duration.hour+':'+this.duration.minute);
          this.$emit('formSubmitted',formData,this.clearForm)
        }
      },

      clearForm(){
        Object.keys(this.service).forEach(f => {
          this.service[f] = '';
        })
        this.$refs.imgPreview.src = this.placeholderImg;
        this.duration.hour = '';
        this.duration.minute = '';
      },

      openImageDialog(){
        this.$refs.imagePicker.click()
      },

      handleImageUpload(event){
        if(event.target.files.length>0){
          if(event.target.files[0].type.match('image/*')){
            const fileReader = new FileReader();
            fileReader.onload = ({target}) => {
              this.$refs.imgPreview.src = target.result;
            }
            fileReader.readAsDataURL(event.target.files[0]);
            this.service.cover_image = event.target.files[0];
          }
        }

      },
      formIsValid(){
        let isValid = true;
        this.errors = this.getValidationErrors();
        Object.keys(this.service).forEach((field) => {

          if(!this.service[field]){
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
        }
      })
    },

    created() {
      this.getCategories();
      this.errors = this.getValidationErrors();


    },

    mounted() {
      if(this.updatedService){
        this.service = this.updatedService;
        let duration = this.service.duration.split(':');

        this.duration.hour = duration[0];
        this.duration.minute = duration[1];
        this.$refs.imgPreview.src  = this.service.cover_image;
        this.service.is_available = this.service.is_available?1:0;
      }
    }
  }
</script>

<style scoped>
  .img-placeholder{
    cursor: pointer;
  }

  .duration>div{
    flex-grow: 1;
  }
</style>
