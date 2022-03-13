var products = {
   list: [],

   setProducts(prods) {
      this.list = prods
   },

   getAllProducts() {
      return this.list;
   },

   getProducts(categoryId) {
      var subList = [];
      for(var i=0; i<this.list.length; i++) {
         if(this.list[i].category.id == categoryId) {
            subList.push(this.list[i]);
         }
      }
      return subList;
   },

   getSuggested() {
      var subList = [];
      for(var i=0; i<this.list.length; i++) {
         if(this.list[i].properties.suggested != undefined && this.list[i].properties.suggested == true) {
            subList.push(this.list[i]);
         }
      }
      return subList;
   }
};

export default products;