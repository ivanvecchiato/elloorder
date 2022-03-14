var shoppingcart = {
   cart: [],
   place: {
      id: '',
      name: '',
      area: '',
      areaId: ''
   },

   addOrIncrement(obj) {
      var found = false

      for(var i=0; i<this.cart.length; i++) {
        var item = this.cart[i]
        if(item.id === obj.id) {
          item.quantity = obj.quantity;
          item.name = obj.name;
          item.price = obj.price;
          found = true
        }
      }

      if(!found) {
        var newItem = {};
        newItem.id = obj.id
        newItem.name = obj.name
        if(obj.quantity == undefined) obj.quantity = 1;
        newItem.quantity = obj.quantity
        newItem.price = obj.price

        this.cart.push(newItem)
      }

      return this.getQuantity();
   },

   getTotale() {
      var value = 0.0
      for(var i in this.cart) {
        var item = this.cart[i]
        value += item.quantity * item.price
      }
      return Number(value)
   },

   getQuantity() {
      var q = 0;
      for(var i in this.cart) {
        var item = this.cart[i]
        q += item.quantity;
      }
      return q;
   },

   getList() {
      return this.cart;
   },

   clear() {
      this.cart = [];
   }
}

export default shoppingcart;