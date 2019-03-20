`npm run install-example`
`npm run example`

Installation du plugin

``` javascript
import VueUnsplash from 'POC/vue-unsplash' 
import axios from 'axios'

Vue.use(VueUnsplash, {
  accessKey: MY_ACCESS_KEY,
  httpClient: axios,
  // On peut configurer un autre endpoint si jamais l'api change...
  // apiUrl: 'https://unsplash-api-has-changed-url.com'
});
```

Exemple d’utilisation simple (1)
``` javascript
<template>
  <div class="gallery">
    <div class="api">
      <button class="btn btn-more" @click="$unsplash.nextPage('photos')">Show More</button>
      <form @submit.prevent="">
        <input v-model="unsplash.photos.search" type="text" placeholder="Search..." class="input">
      </form>
    </div>

    <!-- Gestion automatique du status de chargement -->
    <div v-if="unsplash.photos.loading" class="loading">Loading....</div>
    <div v-if="unsplash.photos.errors" class="error">{{ unsplash.photos.errors }}</div>

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
  data: {},
  unsplash: {
    photos: {
      type: 'concat', // Les résultats s'agrège les uns aux autres
      placeholder: true, // Génére des placeholders pendant le chargement
    }
  },
  computed: {}, 
  methods: {
    getPlaceholderStyle() {
      return {
        height: ~~rand(150, 350) + 'px'
      }
    }
  }
}
</script>
```
On peut surcharger la méthode de récupération des données.

Exemple custom (2):

``` javascript
export default {
  data: {
    mySearchInput: '',
    myPage: 1
  },
  unsplash: {
    photos: {
      type: 'concat',
      placeholder: false,
      query() {
        // this.photos sera mis à jour dès lors qu'une de ces props changent:
        return {
          skip: false,
          // $unsplash se basera sur this.myPage pour récupérer la page
          page: this.myPage,
          // $unsplash se basera sur this.mySearchInput pour effectuer une recherche
          search: this.mySearchInput,
          // delay du debounce lors d'une recherche
          wait: this.mySearchInput && this.myPage === 1 ? 200 : 0 
        }
      }
    }
  },
  watch: {
    // Revient à la première page lorsque la recherche change
    mySearchInput() { 
      this.myPage = 1;
    }
  }

}
```

On peut redéfinir la mutation utilisée dans la création d’une variable.

Exemple méthode de conversion (3):
``` javascript
export default {
  data: {
    mySearchInput: '',
    myPage: 1
  },
  unsplash: {
    photos: {
      type: 'custom', // Pour utiliser notre mutation perso
      placeholder: false,
      query() {
        // ... l'exemple (2) est toujours valable dans ce contexte
      },
      // { result } équivaut à la response de l'api
      // { change } contient les modifications effectuées sur query() pour lancer et arriver jusqu'à { result }
      // { state } équivaut à la valeur courante de la variable ciblée
      mutation({ result, change, state }) {
        // concat les anciennes données avec les résultats de l'api 
        // reset les données si on effectue une nouvelle recherche
        const oldData = (!change.oldVal || change.oldVal.search === change.newVal.search) ? state : [];

        if(!placeholder) {
          remove(oldData, (e) => e.placeholder);
        }

        return uniqBy([
          ...oldData,
          ...result
        ], 'id');
      }
    }
  }
}
```

Le plugin peut être utilisé depuis un composant à l’aide de l’attribut `$unsplash`.

`$unsplash` expose la méthode `nextPage()` pour charger la page suivante d’une variable cible (seulement vrai si on utilise PAS une `query()` perso).

``` javascript
$unsplash.nextPage(target)
// this.$unsplash.nextPage('photos')..
```

`$unsplash` permet également d'effectuer des requêtes sur l’api d’Unsplash.

``` javascript
const res = await this.$unsplash.api.getResource('/photos', { 
  page: 2, 
  anotherQueryString: 'Khaleesi' 
})
```
