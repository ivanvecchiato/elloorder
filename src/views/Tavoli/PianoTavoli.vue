<template>
  <div class="piano">
    <!--<p class='title'>{{area.name}}</p>-->
    <ul class="list -unstyled">
      <li v-for="item in area.places" :key="item.name" @click="openAccount(item)" class="table">
        <table-item :data='item'></table-item>
      </li>
    </ul>

  </div>
</template>

<script>
import TableItem from './TableItem.vue'
import Conto from '@/data/Conto.js'

export default {
  name: 'PianoTavoli',
  props: ['area'],
  components: {
    TableItem
  },
  data() {
    return {
      currentItem: null
    }
  },
  methods: {
    openAccount: function(item) {
      if(item.conto == null) {
        item.conto = new Conto;
      }
      this.$router.push({
        name: 'Comanda',
        params: {
          'item': item,
          'placeString': this.area.name + ' - ' +item.name,
          'place': JSON.stringify({
            'docId': this.area.docId,
            'key': item.key
          })
        }
      });
    },
    loadPlaces: function() {
        console.log(this.area)
    }
  },
  mounted() {
    this.loadPlaces();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  text-align: left;
}
li {
  margin: 2px;
}
a {
  color: #4276b9;
}
.piano {
  padding: 10px;
  overflow: scroll;
}
.title {
  margin-top: 10px;
  font-size: 30px;
  font-weight: 900;
  color: var(--secondary-color);
  letter-spacing: -0.05em;
}
</style>
