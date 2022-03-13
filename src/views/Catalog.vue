<template>
  <div class="carta">
    <b-modal ref="cart-modal" hide-footer hide-header :key="rand">
      <Cart
        :place="place"
        @confirmOrder="confirmOrder"></Cart>
    </b-modal>

    <div class="clearfix header">
      <img style="float:left;margin:10px" width="40px" :src="getIconUrl('back.png')" @click="$router.go(-1)"/>
      <span class="place float-right" v-if="place != undefined">
        <img width="40px" :src="getIconUrl('order.png')" @click="showCart()"/>
        {{cartQuantity}}
      </span>
    </div>

    <horizontal-scroll class="horizontal-scroll">
      <div class="outer">
        <div v-for="cat in categorie"
          :key="cat.id"
          @click="selectProducts(cat.id)" style="text-align:center">
          <div
            class="inner-content"
            :class="[selectedCategory == cat.id ? 'selected' : 'unselected']">
            {{cat.name}}
          </div>
          <div class="indicator" v-if="selectedCategory == cat.id"></div>
        </div>
      </div>
    </horizontal-scroll>

    <ul class="list -unstyled">
      <li v-for="item in products" :key="item.id" @click="showDetails(item)">
        <catalog-item
          :data='item'
          :isOrder="isOrder()"
          v-on:change-value="onChangeValue"
          ref="listitem">
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
import Cart from './Cart.vue'
import HorizontalScroll from 'vue-horizontal-scroll'
import 'vue-horizontal-scroll/dist/vue-horizontal-scroll.css'
import products from '../store/products';
import Details from './Details.vue'
import shoppingcart from '@/store/shoppingcart'

export default {
  props: ['place', 'selectedCategory'],
  data() {
    return {
      mainProps: { blankColor: '#777', width: 100, height: 120, class: 'm1' },
      products: [],
      categorie: [],
      notes: '',
      currentItem: null
    };
  },
  components: {
    CatalogItem,
    HorizontalScroll,
    Details,
    Cart
  },
  computed: {
    rand: function() {
      return Math.random()
    },
    currentCategory: function() {
      if(this.selectedCategory == 0) {
        return ''
      } else {
        for(var i=0; i<categories.length; i++) {
          if(categories[i].id == this.selectedCategory)
            return categories[i].name;
        }
        return '---';
      }
    },
    cartQuantity: function() {
      return shoppingcart.getQuantity();
    }
  },

  methods: {
    confirmOrder() {
      this.$refs['cart-modal'].hide()
      this.reset();
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
    },
    isOrder: function() {
      if(this.place !== undefined && this.place != '0') return true
      else return false
    },

    onChangeValue: function(obj) {
      var q = shoppingcart.addOrIncrement(obj);
      var self = this;

      this.$bvToast.toast(self.$t('orders.cart_items', {number: q}), {
        title: self.$t('orders.order'),
        variant: 'warning',
        solid: true
      })
    },
    
    getImageUrl: function (pic) {
      if (pic.length === 0) return require('@/assets/img/po.png')
      var url = this.remoteUrl + '/img/' + pic
      return url
    },

    getIconUrl: function (pic) {
      if (pic.length === 0) return require('@/assets/img/po.png')
      return require('../assets/icons/' + pic)
    },

    showCart: function() {
      this.$refs['cart-modal'].show()
    },

    reset: function() {
      this.notes = '';
      shoppingcart.clear();
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
.header {
  text-align: left;
  color: var(--primary-color);
}
.h1 {
  font-weight: 900;
  font-family: 'ProductSans';
  letter-spacing: -2px;
}
.list {
  padding: 20px;
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
.footer {
  height: 100px;
}
.image {
  margin-top: -35pt;
}
.place {
  margin: 10px;
  font-weight: bold;
  font-size: 20px;
  color: var(--secondary-color);
}
.horizontal-scroll {
  display: flex;
  width: 100%;
  margin-top: 20px;
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
  min-width: 50px;
  margin-right: 10px;
  line-height: 40px;
  border-radius: 30px;
  font-weight: bold;
}
.selected {
  font-weight: 900;
  color: rgb(87, 81, 78);
}
.unselected {
  font-weight: 600;
  color: #FFCC80;
}
.indicator {
  background: #FB8C00;
  height: 5px;
  width: 50%;
  margin: auto;
  border-radius: 20px;
}
.inner-content:not(:first-of-type) {
    margin-left: 10px;
}
.totale {
  font-weight: bold;
  color: var(--info-color);
}
</style>