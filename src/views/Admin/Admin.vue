<template>
<div>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav>
      <b-nav-item href="/#/admin">Home</b-nav-item>

      <!-- Navbar dropdowns -->
      <b-nav-item-dropdown :text="$t('pricelist.pricelist')" right>
        <b-dropdown-item href="#" @click="loadPricelist">{{$t('pricelist.pricelist_config')}}</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown :text="$t('orders.orders')" right>
        <b-dropdown-item href="#" @click="loadOrders(1)">{{$t('orders.pending')}}</b-dropdown-item>
        <b-dropdown-item href="#" @click="loadOrders(2)">{{$t('orders.done')}}</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
  <div>
    <component :is="currentView"></component>
  </div>
</div>
</template>
 
<script>
import ConfigListino from './ConfigListino.vue'
import Orders from './Orders.vue'

export default {
  name: "Admin",
  data() {
    return {
      currentView: ''
    };
  },
  components: {
    ConfigListino,
    Orders
  },
  methods: {
    loadPricelist: function() {
      this.currentView = ConfigListino
    },
    loadOrders: function() {
      this.currentView = Orders;
    }
  },
  mounted() {
  },
};
</script>
<style scoped>
html, body {
  height: 100%;
}
.sidemenu {
  text-align: left;
  height: 100%;
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
}
</style>