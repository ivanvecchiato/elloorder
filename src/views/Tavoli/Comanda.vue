<template>
   <div class="comanda">
      <div class="clearfix header">
         <div style="float:left;margin:10px" >
            <img width="35px" :src="getIconUrl('back.png')" @click="$router.go(-1)"/>
         </div>
            <span class="place" v-if="placeString != undefined">
               {{placeString}}
            </span>
         <img style="float:right;margin:10px" width="35px" :src="getIconUrl('send.png')" @click="sendOrder()"/>
      </div>

      <div class="cart" id="cart">
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
import axios from 'axios'

export default {
  components: { Catalog, Cart },
   name: 'Comanda',
   props: ['place', 'item', 'placeString'],
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
      sendOrder() {
         var p = JSON.parse(this.place);
         this.item.conto.place = p; 
         axios.post('http://127.0.0.1:8088/bill', this.item.conto)
           .then(function (response) {
             console.log(response);
           })
           .catch(function (error) {
             console.log(error);
           });
      },
      addItem: function(item) {
         this.item.conto.addItem(item);
         this.scrollToBottom();
      },
      scrollToBottom() {
         const container = this.$el.querySelector("#cart");
         container.scrollTop = container.scrollHeight;
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
.header {
   vertical-align: middle;
   text-align: center;
}
.place{
   text-align: center;
   display: inline-block;
   font-size: 1.5em;
   font-weight: bold;
   margin-left: 5px;
   color: var(--danger-color);
   background: #fff;
   border-radius: 30px;
   padding-left: 10px;
   padding-right: 10px;
}
.comanda {
   position: relative;
}
.cart {
   background: transparent;
   margin: 5px 5px 10px 5px;
   border: solid 1px lightgray;
   border-radius: 10px;
   height: calc(30vh - 2px);
   overflow: scroll;
}
.catalog {
  height: calc(70vh - 2px);
  overflow: scroll;
}
</style>