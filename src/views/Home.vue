<template>
  <div class="home">
    <b-modal ref="cart-modal" hide-footer hide-header :key="rand">
      <Cart
        :place="place"
        @confirmOrder="confirmOrder"></Cart>
    </b-modal>

    <div class="clearfix header">
    </div>

    <vue-horizontal class="horizontal-selectors">
      <div v-for="cat in categorie"
        class="inner-content"
        :key="cat.id"
        @click="goTo(cat.id)">
        {{cat.name}}
      </div>
    </vue-horizontal>

    <suggested
      v-if="dataLoaded"
      :place="place"
      @cartUpdate="cartUpdate"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Suggested from '@/views/Suggested.vue'
import Firebase from "../firebase.js";
import VueHorizontal from 'vue-horizontal';
import products from '../store/products'
import categories from '../store/categories'
import shoppingcart from '@/store/shoppingcart'
import Cart from './Cart.vue'

export default {
  name: 'Home',
  components: {
    Suggested,
    VueHorizontal,
    Cart
  },
  props: ['place'],
  data() {
    return {
      categorie: [],
      dataLoaded: false,
      gettingLocation: false,
      cartQuantity: 0
    }
  },
  methods: {
    rand: function() {
      return Math.random()
    },
    confirmOrder() {
      this.$refs['cart-modal'].hide()
      this.reset();
    },
    showCart: function() {
      this.$refs['cart-modal'].show()
    },
    cartUpdate: function() {
      this.getCartQuantity();
    },
    getCartQuantity: function() {
      this.cartQuantity = shoppingcart.getQuantity();
    },
    getIconUrl: function (pic) {
      if (pic.length === 0) return require('../assets/img/po.png')
      return require('../assets/icons/' + pic)
    },
    goTo: function(category) {
      console.log(category)
      this.$router.push({
        name: 'Catalog',
        params: {
          place: this.place,
          selectedCategory: category}
        }
      )
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
    padding: 2px;
}
.horizontal-selector {
    margin-left: 5px;
    margin-right: 5px;
}
.outer {
  display: flex;
  flex: 1;
  width: auto;
  height: 100%;
  padding: 0 15px;
  flex-flow: row nowrap;
  align-items: center;
}
.inner-content {
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-width: 100px;
  margin-right: 10px;
  background: white;
  border-radius: 30px;
  border: solid 1px #FFCC80;
  font-weight: 600;
  color: #FFCC80;
}
.inner-content:not(:first-of-type) {
    margin-left: 10px;
}
.categorie {
  padding: 10px;
  margin-top: 20px;
}
.logo {
  width: 60%;
  margin: 10px;
}
.place {
  margin: 10px;
  font-weight: bold;
  font-size: 20px;
  color: var(--secondary-color);
}
</style>
