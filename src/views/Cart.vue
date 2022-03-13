<template>
  <div>
      <div v-if="status == 'sent'">
        <div class="d-block text-center">
          <b-img :src="getIconUrl('waiter.png')"/>
          <h3 class='modal-text'>Ordine inviato. Attendi qualche minuto...</h3>
        </div>
        <b-button class="mt-2" variant="light" block @click="hideConfirmation">Ok</b-button>
      </div>

      <div v-else>
        <div class="d-block text-center">
          <p class="place">{{$t('generic.place', {number: place})}}</p>
          <p v-if="cartQuantity === 0">nessun prodotto selezionato</p>

          <ul v-if="cartQuantity > 0" class="list">
            <li v-for="item in cart" :key="item.id">
              <span class="list-item">{{item.quantity}} x {{item.name}}</span>
            </li>
          </ul>
          <span class='totale float-right'>{{getTotale()}}</span>
        </div>
        <div v-if="cartQuantity > 0">
          <b-button rounded v-if="status != 'sending'" class="mt-2" variant="outline-success" block  @click="sendOrder">Invia</b-button>
          <div v-if="status == 'sending'" class="text-center">
            <b-spinner variant="secondary"></b-spinner><span>attendere...</span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Firebase from "../firebase.js";
import Order from "../data/Order.js";
import Conto from "../data/Conto.js";
import shoppingcart from '@/store/shoppingcart'

export default {
  props: ['place'],
  components: {
  },
  data() {
    return {
      status: 'idle', //'idle' - 'sending' - 'sent' - 'error'
      cart: shoppingcart.getList(),
      remoteAreaId: ''
    }
  },
  computed: {
    cartQuantity: function() {
      return shoppingcart.getQuantity();
    }
  },
  methods: {
    getIconUrl: function (pic) {
      if (pic.length === 0) return require('../assets/img/po.png')
      return require('../assets/icons/' + pic)
    },
    sendOrder: function() {
      var order = new Order;
      order.order = this.cart;
      order.place = this.place;
      order.notes = this.notes;

      console.log('sendOrder', order)

      this.status = 'sending';

      var conto = new Conto;
      var placeObj = {
        "id": shoppingcart.place.id,
        "name": shoppingcart.place.name,
        "area": {
          "docId": shoppingcart.place.areaId,
          "name": shoppingcart.place.area
        }
      }
      conto.load(placeObj, () =>{
        for(var i=0; i<this.cart.length; i++) {
          var item = this.cart[i];
          for(var q=0; q<item.quantity; q++) {
            var singleItem = JSON.parse(JSON.stringify(item));
            singleItem.quantity = 1;
            conto.orderList.push(singleItem);
          }
        }
        conto.update(placeObj);

        var docRef = Firebase.db.collection('park').doc(shoppingcart.place.areaId);
        var key = "places." + shoppingcart.place.id + ".conto";
        docRef.update({
            [key]: Object.assign({}, conto)
          })
        .then(() => {
          setTimeout(() => this.showConfirmation(), 1500);
          shoppingcart.clear();
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
        });
    },
    getTotale: function() {
      var value = shoppingcart.getTotale();
      return this.$t('generic.total') + ": " + this.formatPrice(value)
    },
    formatPrice: function (price) {
      return Number(price).toFixed(2) + ' €'
    },
    showConfirmation() {
      this.status = 'sent';
    },
    hideConfirmation() {
      this.status = 'idle';
      this.$emit('confirmOrder');
    },
  },
  mounted() {
  }
}
</script>

<style scoped>
.list {
  font-family: 'ProductSans';
  text-align: left;
}
.list-item {
  font-weight: normal;
  font-size: 18px;
  color: var(--info-color);

}
.place {
  margin: 10px;
  font-weight: bold;
  font-size: 20px;
  color: var(--secondary-color);
}
.totale {
  font-size: 18px;
  font-weight: bold;
  color: var(--primary-color);
}
</style>
