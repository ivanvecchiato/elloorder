import Firebase from "../firebase.js";
import utils from "../utils.js";

export default class Conto {
  constructor() {
    this.id = '';
    this.docId = 0;
    this.operator = {
      id: 0,
      name: ''
    };
    this.orderList = [];
    //this.place = '';
    this.note = '';
    this.createdAt = new Date();
    this.lastModified = new Date();
    this.done = false;
    this.id_order = Date.now();
    this.payments = []; // Payment obj
    this.totale = 0;
    this.discount = {
      type: 0,
      rate: 0,
      value: 0
    };
    this.status = 0; // 0=open, 1=closed, -100=deleted, 100=prebill
    this.chiusuraFiscale = 0;
    this.source = 0; //0=frontend, 1000 = takeaway, 2000 = ecommerce, {obj}=tavolo
    this.customer = null; // class Customer TBD
  }

  load(place, callback) {
    var docRef = Firebase.db.collection("park").doc(place.area.docId);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          if (doc.data().places[place.id].conto != null) {
            if (doc.data().places[place.id].conto.orderList.length > 0) {
              this.fillData(doc.data().places[place.id].conto);
            }
          }
          if(callback) callback();
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  getTotale() {
    var amount = 0;
    this.orderList.forEach(item => {
      if (item.status != -100)
        amount += Number(item.price) /* * item.quantity*/ ;
    });

    this.totale = amount;
    return amount;
  }

  getTotaleNetto() {
    var amount = 0;
    this.orderList.forEach(item => {
      if (item.status != -100)
        amount += Number(item.price) /* * item.quantity*/ ;
    });

    this.totale = amount;
    return amount - this.discount.value;
  }

  setDiscount(d) {
    this.discount = d;
    this.saveCache();
  }

  size() {
    if (this.orderList === undefined)
      return 0;
    return this.orderList.length;
  }

  getQuantity() {
    var q = 0;
    for (var i = 0; i < this.size(); i++) {
      if (this.orderList[i].status != -100) q++;
    }
    return q;
  }

  getDeletedQuantity() {
    var q = 0;
    for (var i = 0; i < this.size(); i++) {
      if (this.orderList[i].status == -100) q++;
    }
    return q;
  }

  clear() {
    this.orderList = [];
    this.clearDiscount();
    this.clearPayments();
    localStorage.removeItem('cart');
  }

  clearDiscount() {
    this.discount = {
      type: 0,
      rate: 0,
      value: 0
    }
  }

  clearPayments() {
    this.payments = []
  }

  removeItem(index) {
    //this.orderList.splice(index, 1);
    this.orderList[index].status = -100;
    this.saveCache();
  }

  incrementItem(index) {
    this.orderList[index].quantity++;
    this.saveCache();
  }

  decrementItem(index) {
    if (this.orderList[index].quantity == 1)
      this.removeItem(index);
    else
      this.orderList[index].quantity--;

    this.saveCache();
  }

  getInsertId(index) {
    return this.orderList[index].insertId;
  }

  addItem(p) {
    p.quantity = 1;
    p.insertId = this.size() + 1;
    this.orderList.push(Object.assign({}, p));
    this.saveCache();
  }

  setPrice(index, price) {
    this.orderList[index].price = price;
  }

  setNote(index, note) {
    this.orderList[index].note = note;
  }

  cloneItem(index, count) {
    console.log("cloning", count, this.orderList[index])
    for (var i = 0; i < count; i++) {
      this.addItem(this.orderList[index])
    }
  }

  groupItem(p, list, params) {
    var inserted = false;
    for (var i = 0; i < list.length; i++) {
      var item = list[i];

      //      if(item.status == -100) {
      //        break;
      //      }

      var priceCriteria = true;
      var noteCriteria = true;
      var variantCriteria = true;
      var timingCriteria = true; // per controllare se un item è appena inserito
      var statusCriteria = true; // per controllare gli elementi cancellati

      if (params == undefined) {
        if (item.note == undefined && p.note == undefined) {
          noteCriteria = true;
        } else {
          noteCriteria = (item.note == p.note);
        }

        priceCriteria = (item.price == p.price);

        if (item.modifiers == undefined && p.modifiers == undefined) {
          variantCriteria = true;
        } else {
          variantCriteria = utils.arrayCompare(item.modifiers, p.modifiers);
        }
      } else {
        if (params.groupNote != undefined && params.groupNote == true) {
          noteCriteria = (item.note != undefined && p.note != undefined && item.note == p.note);
        }
        if (params.groupVariant != undefined && params.groupVariant == true) {
          variantCriteria = utils.arrayCompare(item.modifiers, p.modifiers);
        }
      }

      if (p.insertTime == undefined) {
        if (item.insertTime == undefined)
          timingCriteria = true;
        else
          timingCriteria = false;
      }

      if (p.status == -100) {
        if (item.status == -100)
          statusCriteria = true
        else
          statusCriteria = false
      } else {
        if (item.status == -100)
          statusCriteria = false
        else
          statusCriteria = true
      }

      if (item.id === p.id &&
        noteCriteria && variantCriteria &&
        timingCriteria && statusCriteria && priceCriteria) {
        item.quantity++;
        item.insertIds.push(p.insertId);
        inserted = true;
        break;
      }
    }
    if (!inserted) {
      p.quantity = 1;
      p.insertIds = [p.insertId];
      list.push(Object.assign({}, p));
    }
  }

  groupByItems(params) {
    //console.log('groupByItems', params);
    var list = [];
    for (var i = 0; i < this.size(); i++) {
      var item = this.orderList[i];
      this.groupItem(item, list, params)
    }

    return list;
  }

  groupByTimestamp(params) {
    var lists = [];
    var prevTimestamp = 0;
    for (var i = 0; i < this.size(); i++) {
      var item = this.orderList[i];
      if (prevTimestamp < item.insertTime) {
        prevTimestamp = item.insertTime;
        lists.push({
          timestamp: prevTimestamp,
          list: []
        });
      }
      this.groupItem(item, lists[lists.length - 1].list, params)
    }

    return lists;
  }

  saveCache() {
    localStorage.setItem('cart', JSON.stringify(this));
  }

  setClosed(status, place, progressivo, chiusura) {
    this.lastModified = new Date();
    this.status = status;
    this.totale = this.getTotale();
    this.progressivoFiscale = progressivo;
    this.chiusuraFiscale = chiusura;

    this.writeDoc(place);
  }

  setOperatorAndTimestamp() {
    var partial = [];
    var tempo = new Date().getTime();
    this.orderList.forEach(item => {
      if (item.insertTime == undefined) {
        item.insertTime = tempo;
        if (item.status != -100)
          item.status = 0;
        item.operator = {
          id: 1000,
          name: 'remote'
        }
        if (item.status != -100)
          partial.push(item);
      }
    });
    return partial;
  }

  hasUnsavedChanges() {
    for (var i = 0; i < this.orderList.length; i++) {
      if (this.orderList[i].insertTime == undefined) {
        return true;
      }
    }
    return false;
  }

  update(place) {
    var partial = this.setOperatorAndTimestamp();
    var now = new Date();

    var partialObj = {
      'timestamp': now.getTime(),
      'comanda': partial,
      'done': false,
      'place': place,
      'operator': {
        id: 1000,
        name: 'remote'
      }
    };
    this.lastModified = now;
    this.getTotale();
    this.saveCache();

    Firebase.db.collection('ordini').add(Object.assign({}, partialObj))
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error)
      })
  }

  fillData(data) {
    var keys = Object.keys(this);
    keys.forEach(element => {
      this[element] = data[element];
    });
  }
}