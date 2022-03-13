<template>
  <div class="list-item">
    <div class="card-left clearfix">
      <div>
        <div class='product'>{{data.name}}</div>
        <div class="price" v-if="data.price != undefined">{{formatPrice(data.price)}}</div>
        <div v-if="description != undefined && description.length > 0" class="description">
          {{description}}
        </div>
        <div v-else>
          <br/>
        </div>
      </div>
    </div>

    <div class="bottom" v-if="isOrder===true">
      <span class='selector' @click.stop="incrementPartial()">+</span>
    </div>
  </div>
</template>

<script>

export default {
  props: ['data', 'isOrder'],
  data() {
    return {
      description: '',
      partial: 0,
      item: {'id': this.data.id, 'quantity': 0, 'name': '', 'price': 0.0},
      mainProps: { blankColor: '#777', height: 25, class: 'm1' }
    }
  },
  methods: {
    formatPrice: function (price) {
      return Number(price).toFixed(2) + ' €'
    },
    incrementPartial: function () {
      this.partial++
      this.emitEvent()
    },
    decrementPartial: function () {
      this.partial--;
      if (this.partial < 0) this.partial = 0
      this.emitEvent()
    },
    emitEvent: function () {
      this.item.quantity = this.partial
      this.item.name = this.data.name
      this.item.price = this.data.price
      this.$emit('change-value', this.item)
    }
  },
  mounted() {
    this.description = this.data.properties.short_description;
  },
}
</script>
<style scoped>
.product {
  text-align: left;
  font-size: 25px;
  z-index: 1000;
  color: var(--secondary-color);
  font-weight: bold;
  letter-spacing: -0.05em;
  line-height: 25px;
}
.list-item {
  background-color: #fff;
  margin-top: 25pt;
  padding: 4pt;
  border-radius: 10pt;
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
  font-size: 12px;
  font-weight: bold;
  margin-top: 5px;
  background: #ffffff;
  padding-right: 5px;
  padding-left: 5px;
  border-radius: 20px;
  color:  var(--primary-color);
  text-align: center;
  max-width: 60px;
}
.price {
  font-size: 12px;
  font-weight: bold;
  margin-top: 5px;
  color:  var(--primary-color);
}
.quantity-button {
  padding: 0pt;
  font-weight: bold;
  font-size: 26px;
  text-align: center;
  /*color: white;*/
}
.quantity {
  padding: 0pt;
  font-weight: normal;
  font-size: 26px;
  /*color: white;*/
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
.card-left {
  display: flex;
  flex-direction: row;
  justify-content: top;
  margin: 10px;
}
.bottom {
  position: relative;
  top: -20px;
  text-align: right;
}
</style>