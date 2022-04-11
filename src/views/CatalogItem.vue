<template>
  <div class="list-item">
    <div style="display: block">
      <div class="color-indicator" :style="getBgc(data)"/>
      <div class='product'>{{data.name}}</div>
      <div class="round-price" v-if="data.price != undefined">{{formatPrice(data.price)}}</div>
      <div v-else>
        <br/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['data', 'isOrder'],
  data() {
    return {
      partial: 0,
      item: {'id': this.data.id, 'quantity': 0, 'name': '', 'price': 0.0}
    }
  },
  methods: {
    formatPrice: function (price) {
      return Number(price).toFixed(2) + ' €'
    },
    getBgc: function(item) {
      if(item.properties.color != '') {
        return "background: " + item.properties.color;
      }
      return '';
    },
  },
  mounted() {
  },
}
</script>
<style scoped>
.product {
  text-align: left;
  font-size: 30px;
  z-index: 1000;
  color: var(--secondary-color);
  font-weight: bold;
  letter-spacing: -0.05em;
}
.color-indicator {
  width: 10px;
  height: 100%;
  background: white;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.list-item {
  background-color: #fff;
  display: block;
  margin-top: 10px;
  padding: 16px;
  border-radius: 10px;
  position: relative;
  box-shadow: 4px 4px 5px rgba(226, 191, 191, 0.2);
}
.description {
  font-size: 13px;
  z-index: 1000;
  width: 75%;
  color:  var(--info-color);
  margin-top: 5px;
}
.round-price {
  font-size: 16px;
  font-weight: bold;
  margin-top: 5px;
  background: var(--light-main-color);
  padding-right: 5px;
  padding-left: 5px;
  border-radius: 20px;
  color:  var(--primary-color);
  text-align: center;
  max-width: 80px;
}
.price {
  font-size: 12px;
  font-weight: bold;
  margin-top: 5px;
  color:  var(--primary-color);
}

.selector {
  display: inline-block;
  right: 10px;
  bottom: 10px;
  width:35px;
  height: 35px;
  font-weight: 500;
  font-size: 26px;
  margin: auto;
  line-height: 35px;
  text-align: center;
  background: var(--secondary-color);
  color: #fff;
  border-radius: 50%;
  box-shadow: 4px 4px 5px rgba(214, 154, 104, 0.1);
}
.number-selector {
  width:150px; 
  margin:0px auto;
  bottom:0px; 
  margin-bottom: 0px;
  background: var(--tertiary-color);
  color: var(--info-color);
  border-radius: 30pt;
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.1);
}
.bottom {
  position: relative;
  top: -20px;
  text-align: right;
}
</style>