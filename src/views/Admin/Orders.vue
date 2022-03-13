<template>
  <div>
    <div style="width: 100%; display: table;">
      <div style="display: table-row">
        <div style="width: 250px; display: table-cell;">
          <ul>
            <li v-for="order in orders" :key="order.id" @click="showOrder(order)">
              <div class="list-item">
                <div class="place">
                  <b-icon icon="geo-alt-fill" variant="primary"></b-icon>
                  {{order.place}}
                </div>
                <div>
                  <span class="date-time">
                    {{getDateTime(order)}}
                  </span>
                </div>
                <div class="amount">
                    {{getAmount(order)}}
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div style="display: table-cell;">
          <order-form :data="currentOrder"></order-form>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import Firebase from "../../firebase.js";
import Order from '../../data/Order.js';
import OrderForm from './OrderForm.vue';

export default {
  name: "Orders",
  data() {
    return {
      orders: [],
      currentOrder: {}
    };
  },
  components: {
    OrderForm
  },
  methods: {
    showOrder: function(order) {
      this.currentOrder = order;
    },
    getDateTime: function(order) {
      return order.timestamp.toDate().toLocaleDateString() + " " +
                    order.timestamp.toDate().toLocaleTimeString();
    },
    getAmount: function(order) {
      return Number(order.getTotale()).toFixed(2) + " €";
    },
    loadPendingOrders: function() {
      Firebase.db.collection('orders')
      .where('done', '==', false)
      .orderBy('timestamp', "desc")
      .onSnapshot((snapshotChange) => {
        this.orders = [];
        snapshotChange.forEach((doc) => {
          var record = new Order;
          record.fillData(doc.data());
          record.id = doc.id;
          this.orders.push(record)
        });
        console.log(this.orders)
      })
    }
  },
  mounted() {
    this.loadPendingOrders();
  },
};
</script>

<style scoped>
.list-item {
  text-align: left;
  padding: 10px;
  margin: 10px;
}
.place {
  font-weight: bold;
}
.date-time {
  font-size: 0.8em;
}
</style>
