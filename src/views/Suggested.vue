<template>
  <div class="hello">
    <p class='title'>{{$t('pricelist.popular')}}</p>

    <ul class="list -unstyled">
      <li v-for="item in suggestedProducts" :key="item.id" @click="showDetails(item)">
        <catalog-item :data='item' :isOrder="isOrder()" v-on:change-value="onChangeValue" ref="listitem"></catalog-item>
      </li>
    </ul>

    <b-modal ref="prod-details" hide-footer hide-header>
      <Details
        :prod="currentItem"
        @close="closeDetails">
      </Details>
    </b-modal>
  </div>
</template>

<script>
import CatalogItem from './CatalogItem.vue'
import products from '../store/products'
import Details from './Details.vue'
//import geolocation from '@/store/geolocation'
import shoppingcart from '@/store/shoppingcart'

export default {
  name: 'Suggested',
  props: ['place'],
  components: {
    CatalogItem, Details
  },
  data() {
    return {
      suggestedProducts: [],
      currentItem: null
    }
  },
  methods: {
    showDetails: function(item) {
      if(item.long_description.length == 0)
        return;

      this.currentItem = item;
      this.$refs['prod-details'].show()
    },
    closeDetails: function() {
      this.$refs['prod-details'].hide()
    },
    loadSuggested: function() {
      this.suggestedProducts = products.getSuggested();
      console.log('loadSuggested', this.suggestedProducts);
    },
    isOrder: function() {
      var placeAvailable = (this.place !== undefined && this.place != '0');
      var distanceOk = true; //geolocation.distanceAccettable();

      return (placeAvailable && distanceOk);
    },
    onChangeValue: function(obj) {
      var q = shoppingcart.addOrIncrement(obj);
      var self = this;

      this.$bvToast.toast(self.$t('orders.cart_items', {number: q}), {
        title: self.$t('orders.order'),
        variant: 'warning',
        solid: true
      })

      this.$emit('cartUpdate');
    }
  },
  mounted() {
    this.loadSuggested();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
  text-align: left;
}
li {
  /*display: inline-block;*/
  margin: 0 10px;
}
a {
  color: #4276b9;
}
.hello {
  padding: 10px;
}
.title {
  margin-top: 10px;
  font-size: 30px;
  font-weight: 900;
  color: var(--secondary-color);
  letter-spacing: -0.05em;
}
</style>
