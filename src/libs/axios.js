import Vue from 'vue'
import constants from '@/app-configs/constants'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  // baseURL: 'https://some-domain.com/api/',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
  baseURL: constants.baseUrl,
  // baseURL: 'http://127.0.0.1:8000/api/v1/',
})

Vue.prototype.$http = axiosIns

export default axiosIns
