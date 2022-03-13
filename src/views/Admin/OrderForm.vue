<template>
  <div>
    {{data}}
  </div>
</template>
 
<script>
import Firebase from "../../firebase.js";
import Order from '../../data/Order.js';

export default {
  name: "Orders",
  data() {
    return {
      currentOrder: {}
    };
  },
  props: ['data'],
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
    console.log('OrderForm', this.data);
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
