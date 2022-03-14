<template>
  <div>
    <div
      v-for="item in orderList"
      :key="item.id"
      @click="showItemDetails(index, item)"
      class="cart-item">
      <span class="item-quantity">{{item.quantity}}</span>
      <span :class="getItemNameClass(item.status)">{{item.name}}</span>
      <div class="item-details">
        <span class="item-unitary-price" v-if="item.quantity>1">
          {{item.quantity}} x {{formatPrice(item.price)}}
        </span>
        <span class="item-note">{{item.note}}</span>
      </div>
      <span class="item-price">{{formatPrice(item.quantity * item.price)}}</span>
    </div>
  </div>
</template>

<script>
import Firebase from "../../firebase.js";
import Order from "../../data/Order.js";
import Conto from "../../data/Conto.js";
import shoppingcart from '@/store/shoppingcart'

export default {
  props: ['orderList'],
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
    getItemNameClass: function(item_status) {
      if(item_status == -100) {
        return "item-name-crossed";
      } else return "item-name";
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
.cart-item {
  display: flex;
  width: 100%;
  padding: 4px;
  max-height: 60px;
  min-height: 30px;
  position: relative;
  border-right: solid 5px rgba(155, 201, 155);
  vertical-align: middle;
}
.item-quantity {
  display: inline-block;
  position: absolute;
  background: var(--light-secondary-color);
  border-radius: 6px;
  text-align: center;
  width: 24px;
  height: 24px;
  left: 2px;
}
.item-name {
  text-align: left;
  display: inline-block;
  position: absolute;
  max-width: 300px;
  left: 40px;
  font-weight: bold;
}
.item-name-crossed {
  text-align: left;
  display: inline-block;
  position: absolute;
  max-width: 300px;
  left: 40px;
  color: lightcoral;
  font-weight: normal;
  text-decoration: line-through;
}
.item-details {
  display: flex;
  position: absolute;
  left: 40px;
  top: 25px;
  flex-direction: column;
}
.item-note {
  color: var(--info-color);
  font-size: 0.9em;
}
.item-unitary-price {
  color: var(--info-color);
  font-size: 0.9em;
  font-weight: bold;
}
.item-price {
  display: inline-block;
  position: absolute;
  right: 5px;
  font-size: 1.0em;
  color: var(--info2-color);
  font-weight: bold;
}
</style>
