<template>

  <div class="listino">
    <h1 v-if="items.length==0">Listino vuoto</h1>
    <b-container fluid>
        <b-row align-v="start" class="row text-left">
          <b-col cols="2">Nome</b-col>
          <b-col cols="1">Categoria</b-col>
          <b-col cols="1">Prezzo</b-col>
          <b-col cols="4">Descrizione</b-col>
          <b-col cols="2">Immagine</b-col>
        </b-row>
        <config-listino-item v-for="entry in products" :key="entry.id" :data="entry"></config-listino-item>
    </b-container>
    <div class="bottom">
      <button v-if="editMode==false" type="button" class="btn btn-primary" @click="editMode = true">Nuovo</button>
      <config-listino-item v-if="editMode == true" :key="rand" :data="newItem"></config-listino-item>
    </div>
</div>
</template>
 
<script>
import Firebase from "../../firebase.js";
import ConfigListinoItem from "./ConfigListinoItem.vue";

export default {
  name: "ConfigListino",
  data() {
    return {
      products: [],
      fields: ['nome', 'categoria', 'prezzo', 'descrizione'],
      items: [],
      editMode: false,
      newItem: {
        id: 0,
        name: '',
        description: '',
        price: 0,
        category: 0
      }
    };
  },
  components: {
    ConfigListinoItem,
  },
  methods: {
    rand: function() {
      return Math.random()
    },
    newEntry: function() {
      var prod = {productId: 0, category: 0};
      Firebase.db.collection('listino').add(Object.assign({}, prod))
    },
    editCell: function(event) {
      console.log(event, this.products);
      var prod = this.products[event.detail.rowIndex];
      prod.productId = Number(prod.productId);
      prod.price = Number(prod.price);
      prod.category = Number(prod.category);
      
      Firebase.db.collection('listino').doc(prod.id).set(
        Object.assign({}, prod)
      )
    },
    cellUpdated: function() {

    },
    productsToTable: function() {
      this.items = [];

      for(var i=0; i<this.products.length; i++){
        this.items.push({
          categoria: this.products[i].category,
          nome: this.products[i].name,
          prezzo: this.products[i].price,
          descrizione: this.products[i].description
        })
      }
    },
    loadPricelist: function() {
      Firebase.db.collection('listino')
      .orderBy('category').orderBy('name')
      .onSnapshot((snapshotChange) => {
        this.products = [];
        snapshotChange.forEach((doc) => {
          var record = doc.data();
          record.id = doc.id;
          this.products.push(record)
        });
        console.log('loadPricelist', this.products);
        this.productsToTable();
      })
    }
  },
  mounted() {
    this.loadPricelist();
  },
};
</script>

<style scoped>
.bottom {
  margin-top: 20px;
}
.listino {
  padding: 10px;
}
</style>
