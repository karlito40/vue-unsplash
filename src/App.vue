<template>
  <div id="app">
    <UnsplashTest/>
  </div>
</template>

<script>
import UnsplashTest from './components/UnsplashTest'

export default {
  name: 'app',
  components: {
    UnsplashTest
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
