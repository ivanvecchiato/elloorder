<template>
  <div class="home">
    <b-navbar class="header" sticky>
      <div style="width: 100%">
      <b-dropdown v-if="park.length > 0"
        id="dropdown-1"
        size="lg"
        :text="currentArea.name"
        :style="setColor(currentArea.color)">
        <b-dropdown-item
          z-index="100"
          class="dropdown"
          v-for="area in park"
          :key="area.id"
          @click="selectArea(area)">
            {{area.name}}
        </b-dropdown-item>
      </b-dropdown>

      </div>
    </b-navbar>

    <vue-horizontal class="horizontal-selectors" v-if="false">
      <div v-for="area in park"
        class="horizontal-selector"
        :key="area.id"
        @click="selectArea(area)">
        {{area.name}}
      </div>
    </vue-horizontal>

    <piano-tavoli
      class="piano"
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
import axios from 'axios';

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
    setColor: function(color) {
      return "background: " + color + ";";
    },
    loadProducts(local) {
      if(local == true) {
        var self = this;
        axios.post('http://127.0.0.1:8088/getproducts')
          .then(function (response) {
            self.categorie = [];
            var prods = response.data;
            for(var j=0; j<prods.length; j++) {
              self.addCategoryIfNew(prods[j].category);
            }
            categories.setList(self.categorie);
            products.setProducts(prods)
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
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
      }
    },
    loadPlaces() {
      var ref = Firebase.db.collection("park").orderBy('order');
      
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
    this.loadProducts(true);
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
.header {
  padding: 0px;
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
.indicator {
  height: 6px;
  width: 100%;
}
#dropdown-1 {
  margin: 2px;
}
.dropdown {
  background-color: #ffffff;
  font-size: 1.5em;
  margin: 10px;
  width: 100%;
}
.piano {
  overflow: scroll;
}
</style>
