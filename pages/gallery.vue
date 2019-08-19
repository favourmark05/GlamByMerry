<template>
    <div class="gallery">
      <breadcrumb :links="breadcrumbLinks"/>
      <card title="Mange site gallery">
        <ul class="grid cs-style-3">
          <li class="upload-btn">
            <img  class="img-fluid" src="/img/add-img.png">
          </li>
          <li v-for="n in 7">
            <figure>
              <img :src="`img/gallery/${n}.jpg`" alt="img04">
              <figcaption>
                <h3>Mindblowing</h3>
               <div class="row">
                <div class="col-5 ml-auto btn-group-sm btn-group">
                  <a class="fancybox btn btn-sm" rel="group" :href="`img/gallery/${n}.jpg`">View</a>
                  <button class="btn-primary btn btn-sm">Delete</button>
                </div>
               </div>
              </figcaption>
            </figure>
          </li>
        </ul>
      </card>
    </div>
</template>

<script>
  import Breadcrumb from "~/components/general/breadcrumb";
  import Card from "~/components/general/card";
    export default {
        name: "gallery",
      components:{ Breadcrumb, Card},
      head:{
          link:[
            { rel: 'stylesheet', type: 'text/css', href: '/css/gallery.css' },
            { rel: 'stylesheet', type: 'text/css', href: '/assets/fancybox/source/jquery.fancybox.css' },


          ]
      },
      data:()=>({
        breadcrumbLinks:[
          {
            title:"Manage gallery",
            path:'/gallery'
          },
        ],
      }),
      mounted() {
       jQuery(".fancybox").fancybox();

      }
    }
</script>

<style scoped>
  .cs-style-3 figure {
    overflow: hidden;
  }

  .cs-style-3 figure img {
    -webkit-transition: -webkit-transform 0.4s;
    -moz-transition: -moz-transform 0.4s;
    transition: transform 0.4s;
  }

   .cs-style-3 figure:hover img,
  .cs-style-3 figure.cs-hover img {
    -webkit-transform: translateY(-50px);
    -moz-transform: translateY(-50px);
    -ms-transform: translateY(-50px);
    transform: translateY(-50px) !important;
  }

  .cs-style-3 figcaption {
    height: 70px;
    width: 100%;
    top: auto;
    bottom: 0;
    opacity: 0;
    -webkit-transform: translateY(100%);
    -moz-transform: translateY(100%);
    -ms-transform: translateY(100%);
    transform: translateY(100%);
    -webkit-transition: -webkit-transform 0.4s, opacity 0.1s 0.3s;
    -moz-transition: -moz-transform 0.4s, opacity 0.1s 0.3s;
    transition: transform 0.4s, opacity 0.1s 0.3s;
  }

  .cs-style-3 figure:hover figcaption,
  .cs-style-3 figure.cs-hover figcaption {
    opacity: 1;
    -webkit-transform: translateY(0px);
    -moz-transform: translateY(0px);
    -ms-transform: translateY(0px);
    transform: translateY(0px);
    -webkit-transition: -webkit-transform 0.4s, opacity 0.1s;
    -moz-transition: -moz-transform 0.4s, opacity 0.1s;
    transition: transform 0.4s, opacity 0.1s;
  }

  .cs-style-3 figcaption a {
    position: static !important;
    /*bottom: 20px;*/
    /*right: 20px;*/
  }

  .upload-btn{
    text-align: center;
    background: #e5e5e5;
  }
  .upload-btn img{
    vertical-align: unset;
    cursor: pointer;
  }

</style>
