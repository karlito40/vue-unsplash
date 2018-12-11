<template>
  <div>
    <div class="api">
      <!-- toto => {{toto}} -->
      <button class="btn btn-more" @click="fetch">Show More</button>
      <form @submit.prevent="">
        <input v-model="search" type="text" placeholder="Search..." class="input">
        <button class="btn btn-more" @click="searchMore">Search More</button>
      </form>
    </div>
    
    <div class="gallery">
      <a :key="photo.id" v-for="photo in photos" :href="photo.links.download + '?force=true'">
        <img class="img" :src="photo.urls.regular">
      </a>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import axios from 'axios';

const ACCESS_KEY = '11150a568db7d05559ee691ce78e75cfa4dcf8368e56de8a836430966f453508';

const api = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    'Authorization': 'Client-ID ' + ACCESS_KEY
  }
});

// TODO: placeholder
export default {
  data() {
    return {
      search: '',
      page: 1
    }
  },
  unsplash: {
    photos() {
      return {
        skip: false,
        page: this.page,
        search: this.search,
        wait: this.search ? 100 : 0
      }
    }
  },
  watch: {
    // async search() {
    //   this.page = 1;
    //   this.searchFetch();
    // }
  },
  methods: {
    fetch() {
      this.page++;
      console.log('page add')
    },
    searchMore() {},
    searchFetch() {}
    // async fetch() {
    //   const { data: newPhotos } = await api.get(`/photos?page=${this.page++}`);
    //   this.photos = [...new Set([
    //     ...this.photos,
    //     ...newPhotos
    //   ])];
    // },
    // searchMore() {
    //   this.searchFetch();
    // },

    // searchFetch: debounce(async function() {
    //   console.log('search for', this.search, '->', Date.now())

    //   // https://api.unsplash.com/search/photos?page=1&query=office
    //   const withPhotos = this.page === 1 ? [] : this.photos;
    //   const { data: { results: newPhotos } } = await api.get(`/search/photos?page=${this.page++}&query=${this.search}`);
    //   this.photos = [...new Set([
    //     ...withPhotos,
    //     ...newPhotos
    //   ])];
    // }, 200),

  },
  
}


</script>

<style scoped>
.api {
  position: fixed;
  top: 10px;
  left: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
}


.btn {
  cursor: pointer;
  border: 0;
  background-color: black;
  color: white;
  font-weight: 500;
  border-radius: 20px;
  padding: 10px 20px;
}

.input {
  padding: 10px 20px;
  margin: 0 20px;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
}

.img {
  object-fit: cover;
  height: 200px;
  width: 300px;
}
</style>
