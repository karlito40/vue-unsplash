<template>
  <div id="app">
    <Gallery/>
  </div>
</template>

<script>
import Gallery from './components/Gallery'

export default {
  name: 'app',
  components: {
    Gallery
  }
}
</script>

<style>
*, *:after, *:before {
  box-sizing: content-box;
}

html, body {
  margin: 0;
  background-color: #ddd;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
