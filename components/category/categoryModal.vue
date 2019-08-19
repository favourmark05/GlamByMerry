<template>
    <div>
    <template>
        <div>
            <b-modal ref="my-modal" centered hide-footer :title="title">
                <div class="d-block">
                    <form>
                    <label for="category-name" class="col-form-label text-left">Name</label>
                    <input v-model="category.name" type="text" class="form-control" id="category-name" :placeholder="'Enter ' + (this.type === 'physical_product'?'Product':this.type) + ' Name'">
                    </form>
                </div>
                <div class="d-flex justify-content-center">
                    <b-button class="mt-3 category-save-button" block @click="submitForm"><i v-if="loading" class="fa fa-spin fa-spinner"></i> Save</b-button>
                </div>
            </b-modal>
        </div>
    </template>
    </div>
</template>

<script>
    export default {
        name: "categoryModal",
        props: [
            'title',
            'formAction',
            'type'
        ],
        data () {
            return {
                category: {
                    name: '',
                    type: this.type
                },
                loading: false
            }
        },
        methods: {
            // hideModal() {
            //     this.$refs.modal.hide();
            // },
            submitForm() {
                if(this.formAction === 'Add') {
                    this.addCategory()
                } else {
                    this.updateCategory()
                }
            },
            addCategory() {
                this.loading = true
                console.log('Adding category')
                if(this.category.name !== '' && this.category.type !== '') {
                    console.log(this.category)
                    this.$axios
                        .post('categories', this.category)
                        .then((response) => {
                            console.log('Category added successfully')
                            this.loading = false
                            this.hideModal()
                            this.$toast.success('Successfully added ' + (this.type === 'physical_product'?'product':this.type))
                            this.listCategories()
                            this.clearForm(this.category)
                        })
                        .catch((error) => {
                            console.log('An error occurred')
                            console.log(error)
                            this.$toast.error('Sorry, An error occurred while creating' + (this.type === 'physical_product'?'products':this.type))
                            this.loading = false
                        })
                } else {
                    swal('Error', 'Please fill in the category name', 'error')
                    this.loading = false
                }
            },
            updateCategory() {
                this.$axios
                    .post('categories/' + this.category.id + '/update', this.category)
                    .then((response) => {
                        console.log('Category Updated Successfully')
                        console.log(response.data)
                        swal('Success', (this.category.type === 'physical_product'?'Product':this.category.type) + ' updated Successfully', 'success')
                        this.hideModal()
                        this.listCategories()
                    })
            },
            showModal(category = null) {
                if(category) {
                    console.log(category)
                    this.category = {...category}
                } else {
                    this.category = {
                        name: '',
                        type: this.type
                    }
                }
                this.$refs['my-modal'].show(category)
            },
            hideModal() {
                this.$refs['my-modal'].hide()
            },
            toggleModal() {
                // We pass the ID of the button that we want to return focus to
                // when the modal has hidden
                this.$refs['my-modal'].toggle('#toggle-btn')
            },
            clearForm(formData) {
                Object.keys(formData).forEach((field) => {
                    formData[field] = ''
                })
            },
            listCategories() {
                return this.$emit('listCategories')
            }
        }
    }
</script>

<style scoped>
.modal-header {
    background: #ffffff !important;
    color: #1d1d1d;
}
    .category-save-button {
        width: 30%;
        justify-self: center;
    }
    .modal-dialog {
        top: 200px !important;
    }
</style>