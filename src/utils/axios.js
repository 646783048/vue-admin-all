import axios from "axios";
import VueAxios from 'vue-axios';
import Vue from 'vue'

axios.defaults.baseURL=('http://127.0.0.1:8083/')
Vue.use(VueAxios,axios)