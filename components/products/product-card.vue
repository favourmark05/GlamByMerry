<template>
  <div class="row product-list">
  <div v-for="(physical_product, key) in physical_products" :key="key" class="col-md-3 card product">
    <div class="pro-img-box">
      <img @click="showModal" :src="physical_product.images[0]" alt="" id="product-image"/>
      <div class="btn-group btn-group-sm action-btns mx-auto">
        <nuxt-link :to="'products/edit/'+physical_product.id" class="btn btn-sm btn-primary"><i class="fa fa-pencil"></i> </nuxt-link>
        <button @click="deleteProduct(physical_product.id)" class="btn btn-sm btn-danger"><i class="fa fa-trash-o"></i></button>
        <button @click="showModal" class="btn btn-sm btn-secondary"><i class="fa fa-eye"></i></button>
      </div>
    </div>

    <div class="card-body text-center">
      <h4>
        <a href="#" class="pro-title">
          {{ physical_product.name }}
        </a>
      </h4>
      <p class="price">{{ physical_product.price | currency }}</p>
    </div>
  </div>


    <!-- Trigger the Modal -->
    <!--<img id="myImg" src="img/product-list/pro-1.jpg" alt="Snow" style="width:100%;max-width:300px">-->

    <!-- The Modal -->
    <div id="myModal" class="modal">

      <!-- The Close Button -->
      <span class="close-modal">&times;</span>

      <!-- Modal Content (The Image) -->
      <img class="modal-content" id="img01">

      <!--&lt;!&ndash; Modal Caption (Image Text) &ndash;&gt;-->
      <!--<div id="caption"></div>-->
    </div>
  </div>
</template>

<script>
    export default {
        name: "product-card",
        data() {
            return {
                physical_products: ''
            }
        },
        created() {
          this.listPhysicalProducts()
        },
        methods: {
            listPhysicalProducts() {
            
                this.$axios
                    .get('products/products')
                    .then((response) => {
                        console.log(response)
                        this.physical_products = response.data.data.items
                        console.log('These are the physical products')
                        console.log(this.physical_products)
                    })
                    .then((error) => {
                        console.log(error)
                    })
            },
            deleteProduct(productId) {
                console.log(productId)
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
                                .delete('products/' + productId)
                                .then((response) => {
                                    console.log(response.data)
                                    if(response.data.status === 'success') {
                                        swal("Success!  Product was successfully deleted!", {
                                            icon: "success",
                                        });
                                        this.listPhysicalProducts()
                                    }
                                })
                        }
                    });
            },
            showModal() {
                var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
                var img = document.getElementById("product-image");
                var modalImg = document.getElementById("img01");
                // var captionText = document.getElementById("caption");
                    modal.style.display = "block";
                    modalImg.src = img.src;
                    // captionText.innerHTML = this.alt;
                var span = document.getElementsByClassName("close-modal")[0];
                span.onclick = function() {
                    modal.style.display = "none";
                }
            }
        }
    }
</script>

<style scoped>
  .product{
    box-shadow: 0 0 5px lightgrey;
  }

  .action-btns{
    position: absolute;
    left: 30%;
    bottom:-12px;
  }


  /* Style the Image Used to Trigger the Modal */
  #product-image {
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
  }

  #product-image:hover {opacity: 0.7;}

  /* The Modal (background) */
  .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 85px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
  }

  /* Modal Content (Image) */
  .modal-content {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
  }

  /* Caption of Modal Image (Image Text) - Same Width as the Image */
  #caption {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
    text-align: center;
    color: #ccc;
    padding: 10px 0;
    height: 150px;
  }

  /* Add Animation - Zoom in the Modal */
  .modal-content, #caption {
    animation-name: zoom;
    animation-duration: 0.6s;
  }

  @keyframes zoom {
    from {transform:scale(0)}
    to {transform:scale(1)}
  }

  /* The Close Button */
  .close-modal {
    position: absolute;
    top: 60px;
    left: 95%;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    transition: 0.3s;
  }

  .close-modal:hover,
  .close-modal:focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
  }

  /* 100% Image Width on Smaller Screens */
  @media only screen and (max-width: 700px){
    .modal-content {
      width: 100%;
    }
  }

</style>
