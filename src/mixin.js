export default {
  data () {
    if(!isActive(this)) {
      return {};
    }

    return this.$unsplash.createData();
    
  },
  mounted() {
    if(isActive(this)) {
      Object.keys(getOptions(this)).map(this.$unsplash.addQuery.bind(this.$unsplash));
    }
  }
}

function isActive(vm) {
  return getOptions(vm);
}

function getOptions(vm) {
  return vm.$options.unsplash;
}
