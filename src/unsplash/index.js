import UnsplashMixin from './mixin';
import DollarUnsplash from './DollarUnsplash';

export function install(Vue, options = {}) {
  Object.defineProperty(Vue.prototype, '$unsplash', {
    get () {
      if(!this.$_unsplash) {
        this.$_unsplash = new DollarUnsplash(this, options);
      }
      
      return this.$_unsplash;
    },
  });

  Vue.mixin(UnsplashMixin)
}

export default { install };


