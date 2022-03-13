<template>
  <div class="about">
    <img style="float:left" width="40px" :src="getIconUrl('back.png')" @click="close()"/>
    <div class="info">
      <div class="product-name">{{prod.name}}</div>
      <div class="price">
        {{formatPrice()}}
      </div>
    </div>

    <div class="container">
        <b-img v-bind="imgProps"  :src="imgUrl" fluid></b-img>
        <div class="detail-text">{{prod.properties.long_description}}</div>
    </div>

    <div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: 'Details',
  props: ['prod'],
  components: {
  },
  data() {
    return {
      imgProps: { width: 100, class: 'm1' },
      imgUrl: ''
    }
  },
  computed: {
  },
  methods: {
    close() {
      this.$emit('close')
    },
    getIconUrl: function (pic) {
      if (pic.length === 0) return require('@/assets/img/po.png')
      return require('../assets/icons/' + pic)
    },
    formatPrice: function () {
      return Number(this.prod.price).toFixed(2) + ' €'
    },
    getImageUrl: function (pic) {
      if (pic.length === 0) this.imgUrl = require('../assets/img/po.png');

      const storage = firebase.storage();
      storage.ref(pic).getDownloadURL()
      .then((url) => {
        this.imgUrl = url;
      });
    }
  },
  mounted() {
    this.getImageUrl(this.prod.properties.imgUrl);
  }
}
</script>

<style scoped>
.about {
  font-family: "ProductSans";
}
.info {
  float: right;
  position: relative;
  top: 50px;
  text-align: right;
}
.product-name {
  color: var(--secondary-color);
  font-weight: 900;
  font-size: 2.0em;
  letter-spacing: -0.05em;
}
.detail-text {
  text-align: justify;
  color: var(--info-color);
  font-size: 13px;
}
.price {
  margin: 5px;
  color: var(--tertiary-color);
  font-weight: bold;
  font-size: 1.5em;
}
</style>