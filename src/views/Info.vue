<template>
  <div>
    <toolbar></toolbar>

    <div>
      
      <b-card
      title=""
      :img-src="getImageUrl('logo_hm.png')"
      bg-variant="light">
       <b-card-text>
      <p class="detail-text"></p>
       </b-card-text>
    </b-card>


    </div>
  </div>
</template>

<script>
import Toolbar from './Toolbar.vue'

export default {
  props: ['prod'],
  components: {
    Toolbar
  },
  data() {
    return {

    }
  },
  methods: {
    formatPrice: function (price) {
      return price.toFixed(2) + ' €'
    },
    getImageUrl: function (pic) {
      if (pic.length === 0) return require('../assets/img/po.png')
      return require('../assets/' + pic)
    }
  }
}
</script>
