import { debounce, uniqBy } from 'lodash-es';
import axios from 'axios';

const DEFAULT_API = 'https://api.unsplash.com';

function isActive(vm) {
  return getOptions(vm);
}

function getOptions(vm) {
  return vm.$options.unsplash;
}

const UnsplashMixin = {
  data () {
    if(!isActive(this)) {
      return {};
    }

    const data = {
      unsplash: {},
    };

    return Object.keys(getOptions(this)).reduce((acc, label) => {
      acc[label] = [];
      acc.unsplash[label] = {
        page: 1,
        errors: null,
        loading: false,
      };
      return acc;
    }, data)
  },
  mounted() {
    if(!isActive(this)) {
      return;
    }

    Object.keys(getOptions(this)).map(registerQuery.bind(this));
  }
}

async function registerQuery(varName) {
  const query = this.$options.unsplash[varName];
  this.$watch(query, executeQuery.bind(this, varName), { immediate: true })
}

async function executeQuery(varName, newVal, oldVal) {
  const { page, skip, search, wait } = newVal;
  console.log('newVal', newVal)
  console.log('oldVal', oldVal)
  console.log('test executeQuery page', page, 'varName', varName)
  if(skip) {
    console.log('query skip');
    return;
  }
  // const { page } = this.unsplash[varName].query;
  // const { data: newData } = await this.$unsplashAPI.get(`/photos?page=${page}`);
  
  // this[varName] = uniqBy([
  //   ...this[varName],
  //   ...newData
  // ], 'id');
}

export function install(Vue, { accessKey, apiUrl }) {
  Vue.prototype.$unsplashAPI = axios.create({
    baseURL: apiUrl || DEFAULT_API,
    headers: {
      'Authorization': `Client-ID ${accessKey}`
    }
  });

  Vue.mixin(UnsplashMixin)
}

export default { install };

