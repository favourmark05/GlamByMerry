<template>
  <div class="card  shadow-sm">
    <div class="card-header">
      <div class="d-flex justify-content-between">
        <div>
          <label>Product categories</label>
        </div>
        <div>
          <!--<button @click="showModal" class="btn btn-primary btn-sm">Add Category</button>-->
          <div class="col-sm-12 mx-0 pr-0 my-0">
            <b-button id="show-btn" @click="showModal">Add Category</b-button>
            <category-modal :title="title" :form-action="formAction" :type="type" ref="categoryModal" @listCategories="listCategories"/>
          </div>
        </div>
      </div>

    </div>

    <div class="card-body">

      <table class="table">
        <thead>
        <tr>
          <th>S/N</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(category, key) in categories" :key="key">
          <td>{{key + 1}}</td>
          <td>{{category.name}}</td>
          <td>
            <div class="btn-group btn-group-sm">
              <button @click="updateCategory(key)" class="btn btn-sm btn-success">Edit</button>
              <button @click="deleteCategory(category.id)" class="btn btn-danger">Delete</button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
    import CategoryModal from "./categoryModal";
    export default {
        name: "product-category",
        components: {CategoryModal},
        created () {
            this.listCategories()
        },
        data() {
            return {
                title: '',
                type: 'physical_product',
                formAction: '',
                categories: []
            }
        },
        methods: {
            showModal() {
                this.title = 'Add Category'
                this.formAction = 'Add'
                return this.$refs.categoryModal.showModal()
            },
            listCategories() {
                console.log('Listing categories')
                this.$axios
                    .get('categories?type=' + this.type)
                    .then((response) => {
                        this.categories = response.data.data;
                        console.log(this.categories)
                    })
                    .catch((error) => {
                        this.error('Problem fetching categories')
                    })
            },
            error(errorMessage) {
                this.errorMessage = errorMessage;
                this.showError = true;
            },
            deleteCategory(categoryId) {
                swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this product",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            this.$axios
                                .delete('categories/' + categoryId)
                                .then((response) => {
                                    console.log(response.data)
                                    swal("Success! !", {
                                        icon: "success",
                                    });
                                    this.listCategories()
                                })
                        }
                    });
            },
            updateCategory(key) {
                const category = {...this.categories[key]}
                this.formAction = 'Update'
                this.title = 'Update Category'
                    console.log('I am being called')
                    this.$refs.categoryModal.showModal(category)
            }
        }
    }
</script>

<style scoped>
.add-category-button {
  background-color: #007BFF !important;
  border: 1px solid #007BFF;
}
</style>
