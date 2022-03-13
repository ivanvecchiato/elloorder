
export default class Order {
  constructor() {
    this.order = [];
    this.place = '';
    this.notes = '';
    this.timestamp = new Date();
    this.done = false;
    this.id_order = Date.now();
  }

  getTotale() {
    var amount = 0;
    this.order.forEach(item => {
      amount += item.price * item.quantity;
    });
    
    return amount;
  }

  fillData(data) {
    var keys = Object.keys(this);
    keys.forEach(element => {
        this[element] = data[element];
    });
  }
}
