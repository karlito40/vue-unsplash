import { debounce } from 'lodash-es';
import API from './API';
import * as ResponseFormatter from './formatter';
import assert from 'assert';

const AVAILABLE_TYPES = Object.keys(ResponseFormatter);

export default class DollarUnsplash {
  constructor(vm, options) {
    this.vm = vm;
    this.api = new API(options);
    this.debounce = {};
  }

  createData() {
    const data = { unsplash: {} };

    return Object.entries(this.getOptions()).reduce((acc, [varName, varOptions]) => {``
      if(process.env.NODE_ENV === 'development') {
        assert.ok(
          AVAILABLE_TYPES.includes(varOptions.type),
          `Unknow type ${varOptions.type} for unsplash query ${varName} [available types: ${AVAILABLE_TYPES}]`
        );
      }

      acc[varName] = [];
      acc.unsplash[varName] = {
        errors: null,
        loading: false,
        page: 1,
        search: ''
      };

      return acc;
    }, data)
  }

  addQuery(varName) {
    if(!this.getOptions(varName).query) {
      this.getOptions(varName).query = () => {
        const { page, search } = this.vm.unsplash[varName];

        return {
          skip: false,
          page,
          search,
          wait: search && page === 1 ? 250 : 0
        }
      }
    }
  
    const { query } = this.getOptions(varName);
    this.vm.$watch(query, this.executeQuery.bind(this, varName), { immediate: true })
  }

  executeQuery(varName, newVal, oldVal) {
    if(!oldVal || oldVal.wait !== newVal.wait) {
      this.registerDebounce(varName, this.onQueryChange.bind(this), newVal.wait)
    }

    if(oldVal && oldVal.search !== newVal.search) {
      this.vm.unsplash[varName].page = 1;
    }

    const { type, placeholder } = this.getOptions(varName);

    if(placeholder) {
      const varSize = this.vm[varName].length;
      const result = Array.from(Array(15), (v, i) => ({
        id: varSize + '-' + i,
        placeholder,
        user: {
          name: ''
        },
        urls: {
          regular: ''
        },
        links: {
          download: ''
        }
      }));

      this.vm[varName] = ResponseFormatter[type].call(this.vm, {
        result,
        target: varName,
        change: {
          newVal: {}, 
          oldVal: {},
        }, 
        previousState: this.vm[varName],
        placeholder
      });
    }

    this.vm.unsplash[varName].loading = true;
  
    this.executeDebounce(varName, newVal, oldVal)
  }

  async onQueryChange(varName, newVal, oldVal) {
    const { page, skip, search } = newVal;
    if(skip) {
      return;
    }
    
    const targetType = this.getType(varName);
    const resource = !search ? '/photos' : '/search/photos';
  
    const result = await this.api.getResource(resource, { 
      page,
      ...search && { query: search },
    });

    this.vm.unsplash[varName].loading = false;

    return this.vm[varName] = ResponseFormatter[targetType].call(this.vm, {
      result,
      target: varName,
      change: {
        newVal, 
        oldVal,
      }, 
      previousState: this.vm[varName]
    });
  }

  getType(varName) {
    return this.getOptions(varName).type;
  }

  getOptions(varName) {
    return varName ? this.vm.$options.unsplash[varName] : this.vm.$options.unsplash;
  }

  nextPage(varName) {
    this.vm.unsplash[varName].page++;
  }

  registerDebounce(varName, handler, wait) {
    this.debounce[varName] = debounce(handler, wait);
  }

  executeDebounce(varName, newVal, oldVal) {
    if(this.debounce[varName]) {
      this.debounce[varName](varName, newVal, oldVal);
    }
  }
}