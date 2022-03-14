<template>
   <div class="comanda">
      <div class="clearfix header">
         <img style="float:left;margin:10px" width="35px" :src="getIconUrl('back.png')" @click="$router.go(-1)"/>
         <span class="place" v-if="place != undefined">
            {{place}}
         </span>
      </div>

      <div class="cart">
         <cart :orderList="groupedList"></cart>
      </div>

      <div class="catalog">
         <catalog
            @addItem="addItem">
         </catalog>
      </div>
   </div>
</template>

<script>
import Catalog from '../Catalog.vue';
import Cart from './Cart.vue';

export default {
  components: { Catalog, Cart },
   name: 'Comanda',
   props: ['place', 'item'],
   data() {
      return {
         
      }
   },
   computed: {
      groupedList: function () {
        return this.item.conto.groupByItems();
      },
   },
   methods: {
      addItem: function(item) {
         this.item.conto.addItem(item);
      },
      getIconUrl: function (pic) {
         if (pic.length === 0) return require('@/assets/img/po.png')
         return require('@/assets/icons/' + pic)
      },
   },
   mounted() {
      
   },
}
</script>

<style scoped>
.header .place{
   text-align: center;
   display: inline-block;
   font-size: 1.5em;
   font-weight: bold;
   color: var(--danger-color);
}
.comanda {
   position: relative;
}
.cart {
   background: white;
   height: calc(30vh - 2px);
   margin-bottom: 20px;
   overflow: scroll;
}
.catalog {
  height: calc(70vh - 2px);
  overflow: scroll;
}
</style>