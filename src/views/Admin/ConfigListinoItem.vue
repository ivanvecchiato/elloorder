<template>
  <b-row align-v="start" class="row text-left">
    <b-col cols="2"><b-form-input :disabled="editMode===false" v-model="data.name" placeholder="Nome"></b-form-input></b-col>
    <b-col cols="1"><b-form-input :disabled="editMode===false" v-model="data.category" placeholder="categoria"></b-form-input></b-col>
    <b-col cols="1"><b-form-input :disabled="editMode===false" v-model="data.price" placeholder="prezzo"></b-form-input></b-col>
    <b-col cols="4"><b-form-textarea
      :disabled="editMode===false"
      v-model="data.description"
      rows="2"
      max-rows="6"></b-form-textarea></b-col>
    <b-col cols="2"><b-form-input :disabled="editMode===false" v-model="data.imgUrl" placeholder="img"></b-form-input></b-col>
    <b-col cols="2" v-if="editMode == false"><b-icon icon="pencil" variant="danger" @click="editMode=true"></b-icon></b-col>
    <b-col cols="1" v-if="editMode == true"><b-icon icon="check-circle" variant="success" @click="saveEntry"></b-icon></b-col>
  </b-row>
</template>

<script>
import Firebase from "../../firebase.js"

export default {
  name: "ConfigListinoItem",
  props: ['data'],
  data() {
    return {
        editMode: false
    };
  },
  methods: {
    saveEntry: function() {
      if(this.data.id != 0){
        this.updateEntry()
      } else {
        this.newEntry()
      }
    },
    updateEntry: function() {
      Firebase.db.collection("listino").doc(this.data.id).set({
        description: this.data.description,
        price: this.data.price
      }, { merge: true })
      .then(() => {
        this.editMode = false;
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    },
    newEntry: function() {
      Firebase.db.collection("listino").add(Object.assign({}, this.data))
      .then(() => {
        this.editMode = false;
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    }
  },
  mounted() {
    if(this.data.id == 0)
      this.editMode = true;
  }
}
</script>

<style scoped>
.row {
  margin-top: 8px;
  width: 100%;
}
</style>