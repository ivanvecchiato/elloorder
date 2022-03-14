<template>
  <div class="home">
    <div class="clearfix header">
    </div>

    <vue-horizontal class="horizontal-selectors">
      <div v-for="area in park"
        class="horizontal-selector"
        :key="area.id"
        @click="selectArea(area)">
        {{area.name}}
      </div>
    </vue-horizontal>

    <piano-tavoli
      v-if="dataLoaded"
      :area="currentArea"
      @refresh="refresh"/>
  </div>
</template>

<script>
// @ is an alias to /src
import PianoTavoli from '@/views/Tavoli/PianoTavoli.vue'
import Firebase from "../firebase.js";
import VueHorizontal from 'vue-horizontal';
import products from '../store/products'
import categories from '../store/categories'
import Conto from "@/data/Conto.js";

export default {
  name: 'Home',
  components: {
    PianoTavoli,
    VueHorizontal
  },
  props: ['place'],
  data() {
    return {
      park: [],
      categorie: [],
      dataLoaded: false,
      currentArea: null
    }
  },
  methods: {
    rand: function() {
      return Math.random()
    },
    refresh: function() {
    },
    getIconUrl: function (pic) {
      if (pic.length === 0) return require('../assets/img/po.png')
      return require('../assets/icons/' + pic)
    },
    selectArea: function(area) {
      this.currentArea = area;
    },
    addCategoryIfNew(c) {
      var found = false;
      for(var i=0; i<this.categorie.length; i++) {
        if(this.categorie[i].name == c.name) {
          found = true;
          break;
        }
      }
      if(!found) {
        this.categorie.push(c);
      }
    },
    loadProducts() {
      var ref = Firebase.db.collection("products")
      .where("status", "==", 1);
      
      ref.onSnapshot((snapshotChange) => {
        this.categorie = [];
        var items = []
        snapshotChange.forEach((doc) => {
          var p = doc.data();
          items.push(p);
          this.addCategoryIfNew(p.category);
        })
        categories.setList(this.categorie);
        products.setProducts(items);
      });
    },
    loadPlaces() {
      var ref = Firebase.db.collection("park").orderBy('id');
      
      ref.onSnapshot((snapshotChange) => {
        this.park = [];
        snapshotChange.forEach((doc) => {
          var area = doc.data();
          area.docId = doc.id;
          var places = area.places;
          for(var n in places) {
            if(places[n].conto != null) {
              var conto = new Conto;
              conto.fillData(places[n].conto);
              places[n].conto = conto;
            }
            places[n].key = n;
          }
          this.park.push(area);
        })
        this.currentArea = this.park[0];
        this.dataLoaded = true;
      });
    },
    addPlace(areaRef, places) {
      var ref = Firebase.db.collection('park').doc(areaRef);
      places[this.place] = {
        name: this.place.toString(),
        seats: 0,
        conto: null
      }
      ref.update({
        'places': places
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
    },
  },
  mounted() {
    this.loadPlaces();
    this.loadProducts();
  },
}
</script>

<style scoped>
.home
{
  margin: 0;
  width: 100%;
  min-height: 100vh;
}

.horizontal-selectors {
    padding: 10px;
}
.horizontal-selector {
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-width: 100px;
  line-height: 35px;
  margin-right: 5px;
  background: white;
  border-radius: 30px;
  border: solid 1px var(--primary-color);
  font-weight: bold;
  color: var(--primary-color);
}
.place {
  margin: 5px;
  font-weight: bold;
  font-size: 20px;
  color: var(--secondary-color);
}
</style>
