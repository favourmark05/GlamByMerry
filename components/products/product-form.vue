<template>
    <div class="product-form">
      <div class="row">
        <div class="col-lg-8">
          <form method="post" @submit.prevent="createProduct(product)">
           <div class="row">
             <div class="col-12">
               <div class="form-group">
                 <label for="name">Name</label>
                 <input v-model="product.name" type="text" class="form-control" id="name" required>
               </div>
             </div>

             <div class="col-lg-4">
               <label for="price">Price</label>
               <input v-model="product.price" type="number" class="form-control" id="price" required>
             </div>


             <div class="col-lg-4">
               <label for="price">Quantity</label>
               <input v-model="product.quantity" type="number" class="form-control" id="price" required>
             </div>

             <div class="col-lg-4 ">
               <label for="category">Category</label>
               <select v-model="product.category_id" class="form-control" id="type">
                 <option value="" disabled>Select Category</option>
                 <option v-for="(category, key) in categories" :key="key" :value="category.id">{{category.name}}</option>
               </select>
             </div>

             <div class="col-12 mt-3">
               <label for="description">Description</label>
               <textarea v-model="product.description" id="description" placeholder="Product description" class="form-control" rows="5"></textarea>
             </div>

             <div class="col-12 mt-4 d-flex justify-content-center">
               <button type="submit" class="btn btn-primary" style="width: 50%;">Add Product</button>
             </div>
           </div>
          </form>
        </div>
        <div class="col-lg-4">
          <div class="product-images">
            <h6>Product images</h6>
            <div class="row no-gutters">
              <div class="col-6">
                <div class="add-product d-flex justify-content-center align-items-center" title="Add image" style="height: 97%; width: 98%; background-color: #f2f2f2;">
                  <span class="fa fa-plus fa-5x" @click="fireClickEvent"></span>
                  <input type="file" id="fileInput" style="display:none;" multiple accept="image/*" @change="handleImageUpload($event)">

                  
                 
                </div>
              </div>
              <div v-for="(image, key) in product_images" :key="key" class="col-6">
                <div class="m-1">
                  <img class="img-fluid" :src="image">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import swal from 'sweetalert'
    export default {
        name: "product-form",
        mounted () {
          this.listCategories()
        },
        data() {
            return {
                product: {
                    name: '',
                    price: '',
                    is_available: '',
                    description: '',
                    type: 'physical_product',
                    quantity: '',
                    category_id: ''
                },
                dialogImageUrl: '',
                dialogVisible: false,
                product_images: [],
                files: [],
                raw_files: [],
                categories: []
            }
        },
        methods: {
            createProduct(product) {
                console.log(product)
                let formData = new FormData();
                Object.keys(this.product).forEach((field)=>{
                    formData.append(field,this.product[field])
                });
                this.raw_files.forEach((file,i) => {
                    formData.append(`product_images[${i}]`,file,file.name);
                });
                this.$axios
                    .post('/products', formData)
                    .then((response) => {
                        console.log('Displaying products details')
                        console.log(response.data);
                        this.$router.go()
                        swal('Success', 'Product added successfully', 'success')
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleImageUpload ({target}) {
                let files = target.files;
                console.log(files);
                for(let i = 0; i < files.length; i++) {
                  const file = files[i];
                  const reader = new FileReader();
                  reader.onload = ((e) => { this.product_images.push(e.target.result)});
                  this.raw_files.push(file);
                  console.log(this.product.product_images);
                  reader.readAsDataURL(file);
                }
            },
            fireClickEvent() {
                const fileInput = document.getElementById('fileInput');
                if(fileInput) {
                    fileInput.click();
                }
            },
            listCategories() {
                this.$axios
                    .get('categories')
                    .then((response) => {
                        console.log(response.data);
                        this.categories = response.data.data
                    })
            }
        }
    }
</script>

<style>

  .add-product{
    cursor: pointer;
    background: #e5e5e5;
    padding: 10px;
  }
  .el-upload--picture-card {
    height: 125px !important;
    vertical-align: top;
    line-height: 146px;
    width: 163px !important;
  }

</style>
