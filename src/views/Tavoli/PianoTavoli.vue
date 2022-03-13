<template>
  <div class="piano">
    <p class='title'>{{area.name}}</p>

    <ul class="list -unstyled">
      <li v-for="item in area.places" :key="item.name" @click="openAccount(item)" class="table">
        <table-item :data='item'></table-item>
      </li>
    </ul>

  </div>
</template>

<script>
import TableItem from './TableItem.vue'

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
      this.$router.push({
        name: 'Catalog',
        params: {
          place: {
            id: item.key,
            name: item.name,
            area: this.area.name,
            areaId: this.area.docId
          }
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
  text-align: left;
}
li {
  /*display: inline-block;*/
  margin: 0 10px;
}
a {
  color: #4276b9;
}
.piano {
  padding: 10px;
}
.title {
  margin-top: 10px;
  font-size: 30px;
  font-weight: 900;
  color: var(--secondary-color);
  letter-spacing: -0.05em;
}

</style>
