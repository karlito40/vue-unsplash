<template>
  <div class="gallery">
    <div class="api">
      <button class="btn btn-more" @click="$unsplash.nextPage('photos')">Show More</button>
      <form @submit.prevent="">
        <input v-model="unsplash.photos.search" type="text" placeholder="Search..." class="input">
      </form>
    </div>
    
    <div class="photo-list">
      <a :key="photo.id" v-for="photo in photos" :href="photo.links.download + '?force=true'">
        <figure>
          <img  v-if="!photo.placeholder" class="img" :src="photo.urls.regular">
          <div v-else class="placeholder" :style="getPlaceholderStyle()"></div>
          <figcaption>{{ photo.user.name }}</figcaption>
        </figure>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  unsplash: {
    photos: {
      type: 'concat',
      placeholder: false
    }
  },
  methods: {
    getPlaceholderStyle() {
      return {
        height: ~~rand(150, 350) + 'px'
      }
    }
  }
  
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
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

.photo-list {
  column-width: 320px;
  column-gap: 15px;
  padding: 15px;
}

a {
  display: block;
  margin-bottom: 15px;
  text-decoration: none;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.25);
}

.img {
  object-fit: cover;
  width: 100%;
  display: block;
}

figure {
  margin: 0;
  background-color: white;
  border-radius: 7px;
}

figcaption {
  text-align: right;
  margin: 0;
  padding: 10px 15px;
  color: black;
}

.placeholder {
  background-color: #df6262;
}
</style>
