const webpack = require("webpack");
require('dotenv').config();

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/bootstrap.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/bootstrap-reset.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/assets/font-awesome/css/font-awesome.css'},

      { rel: 'stylesheet', type: 'text/css', href: '/assets/jquery-easy-pie-chart/jquery.easy-pie-chart.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/owl.carousel.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/slidebars.css' },


      { rel: 'stylesheet', type: 'text/css', href: '/css/style.css'},
      { rel: 'stylesheet', type: 'text/css', href: '/css/style-responsive.css' },


      { rel: 'stylesheet', type: 'text/css', href: '/css/gallery.css' },


    ],
    script:[
      { src: '/js/jquery.js' },
      { src: '/js/modernizr.custom.js' },
      { src: '/js/bootstrap.bundle.min.js' },
      { src: '/js/jquery.dcjqaccordion.2.7.js' },
      { src: '/js/jquery.scrollTo.min.js' },
      { src: '/js/jquery.nicescroll.js'  },
      { src: '/js/jquery.sparkline.js' },
      { src: 'assets/jquery-easy-pie-chart/jquery.easy-pie-chart.js' },
      { src: '/js/owl.carousel.js' },
      { src: '/js/jquery.customSelect.min.js' },
      { src: '/js/respond.min.js' },
      { src: '/js/slidebars.min.js' },

      { src: '/js/sparkline-chart.js' },
      { src: '/js/easy-pie-chart.js' },
      { src: '/assets/fancybox/source/jquery.fancybox.js' },

      { src: '/js/count.js' },
      {src: "js/toucheffects.js"},
     // {src: "js/modernizr.custom.js"},
      {src: "js/respond.min.js"},
      { src: '/js/common-scripts.js' },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/app.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src:'~/plugins/ckeditor',
      mode:'client',
    },
    {
      src: '~/plugins/plugins',

    }
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // 'bootstrap-vue/nuxt',
    '@nuxtjs/dotenv'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */



    extend(config, ctx) {
    }
  },
  env: {
    API_URL: process.env.API_URL
  },

  port: process.env.PORT
}
