import axios from 'axios'
import swal from 'sweetalert'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import VueCurrencyFilter from 'vue-currency-filter'
import BootstrapVue from 'bootstrap-vue'
//import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import toast from 'toastr'
const http = axios.create({
    baseURL:process.env.API_URL
});


if(process.browser){
    http.interceptors.request.use((config)=>{
        config.headers.Authorization = "Bearer "+localStorage.getItem('token');
        config.headers['Accept'] = 'application/json';
        config.headers['Content-Type'] = 'application/json';
        return config;
    })
}
Vue.prototype.$axios = http;
Vue.prototype.$toast = toast;
Vue.prototype.$swal = swal;

Vue.use(VueCurrencyFilter,
    {
        symbol : '₦',
        thousandsSeparator: ',',
        fractionCount: 0,
        fractionSeparator: '.',
        symbolPosition: 'front',
        symbolSpacing: false
    });

Vue.use(Element, { locale });

Vue.use(BootstrapVue)
