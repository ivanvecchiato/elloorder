<template>
  <div class="carta">

    <vue-horizontal class="horizontal-selectors">
      <div v-for="cat in categorie"
        :key="cat.id"
        @click="selectProducts(cat.id)" style="text-align:center">
        <div
          class="horizontal-selector"
          :class="[selectedCategory == cat.id ? 'selected' : 'unselected']">
          {{cat.name}}
        </div>
      </div>
    </vue-horizontal>

    <ul class="list -unstyled">
      <li v-for="item in products" :key="item.id" @click="addOrder(item)">
        <catalog-item
          :data='item'>
        </catalog-item>
      </li>
    </ul>

    <div class="footer"></div>

    <b-modal ref="prod-details" hide-footer hide-header>
      <Details
        :prod="currentItem"
        @close="closeDetails">
      </Details>
    </b-modal>
  </div>
</template>

<script>

import categories from "../store/categories";
import CatalogItem from './CatalogItem.vue'
import VueHorizontal from 'vue-horizontal';
import products from '../store/products';
import Details from './Details.vue'

export default {
  props: ['place', 'selectedCategory'],
  data() {
    return {
      products: [],
      categorie: [],
      notes: '',
      currentItem: null
    };
  },
  components: {
    CatalogItem,
    VueHorizontal,
    Details
  },
  computed: {
  },

  methods: {
    confirmOrder() {
      this.$refs['cart-modal'].hide()
      this.reset();
    },
    addOrder(item) {
      this.$emit('addItem', item);
    },
    showDetails: function(item) {
      if(item.long_description.length == 0)
        return;

      this.currentItem = item;
      this.$refs['prod-details'].show()
    },
    closeDetails: function() {
      this.$refs['prod-details'].hide()
    },
    selectProducts: function(categoryId) {
      //console.log("selectProducts", index);
      this.selectedCategory = categoryId;
       this.products = products.getProducts(categoryId);
    }
  },

  mounted() {
    this.categorie = categories.getList();
    this.selectProducts(this.selectedCategory);
    console.log('place:' + this.place)
  }
};
</script>

<style scoped>
.list {
  padding: 10px;
}
ul {
  text-align: left;
}
.carta {
  /*background-color: var(--light-main-color);*/
  margin: 0;
  width: 100%;
  min-height: 100vh;
}
.horizontal-selectors {
  padding-left: 8px;
  padding-right: 8px;
}
.horizontal-selector {
  text-align: center;
  min-width: 100px;
  line-height: 35px;
  margin-right: 5px;
  background: white;
  border-radius: 30px;
  border: solid 1px var(--primary-color);
  font-weight: normal;
  color: var(--primary-color);
}
.selected {
  font-weight: 900;
  color: white;
  background: var(--primary-color);
}
.unselected {
  font-weight: 400;
  color: var(--primary-color);
}

</style>