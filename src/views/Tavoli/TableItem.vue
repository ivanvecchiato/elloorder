<template>
  <div class="table-item">
    <div>
      <div class='table-name'>{{data.name}}</div>
      <div>
        <div v-if="tableBusy(data)">
          <div class="table-last-modification">
            <b-icon style="vertical-align: middle;" color="#000000" :size="18" icon="clock"></b-icon>
              {{getLastMod(data.conto)}}
          </div>
            <div class="table-order-amount">
              <b-icon style="vertical-align: middle;" color="#FB8C00" :size="18" icon="wallet2"/>
              {{getAmount(data.conto)}}
            </div>
            <div class="table-order-quantity">
              <b-icon style="vertical-align: middle;" color="#667BCC" :size="18" icon="cart4"/>
              {{getQuantity(data.conto)}} {{$t('product.products')}}
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TableItem',
  props: ['data'],
  data() {
    return {
    }
  },
  methods: {
    tableBusy: function(t) {
      if(t.conto == null) return false;
      else return t.conto.size()>0;
    },
    getLastMod: function(conto) {
      if(conto.size() > 0) {
        var now = new Date();
        var h = 0;
        var d = 0;
        var min = Math.floor((now.getTime()/1000 - conto.lastModified.toDate().getTime()/1000)/60);
        h = Math.floor(min/60);
        if(h > 0) {
          min = min % 60;
        }
        d = Math.floor(h/24);
        if(d > 0) {
          h = h % 24;
        }
        var time = '';
        if(d>0) {
          time = d + " day\u2022";
        }
        if(h>0) {
          time += h + " h\u2022";
        }
        time += min + " min";
        return time;
      } else {
        return '';
      }
    },
    getQuantity: function(conto) {
      return conto.getQuantity();
    },
    getAmount: function(conto) {
      return Number(conto.getTotaleNetto()).toFixed(2) + " €";
    },
  },
  mounted() {
  },
}
</script>
<style scoped>
.table-name {
  text-align: left;
  font-size: 2em;
  z-index: 1000;
  color: var(--secondary-color);
  font-weight: bold;
  letter-spacing: -0.05em;
  line-height: 25px;
}

.table-item {
  background-color: #fff;
  margin-top: 10px;
  padding: 4pt;
  border-radius: 10pt;
  box-shadow: 4px 4px 5px rgba(226, 191, 191, 0.2);
}

.round-price {
  font-size: 12px;
  font-weight: bold;
  margin-top: 5px;
  background: #ffffff;
  padding-right: 5px;
  padding-left: 5px;
  border-radius: 20px;
  color:  var(--primary-color);
  text-align: center;
  max-width: 60px;
}
.price {
  font-size: 12px;
  font-weight: bold;
  margin-top: 5px;
  color:  var(--primary-color);
}
.quantity {
  padding: 0pt;
  font-weight: normal;
  font-size: 26px;
  /*color: white;*/
}
.selector {
  display: inline-block;
  right: 10px;
  bottom: 10px;
  width:35px;
  height: 35px;
  font-weight: 500;
  font-size: 26px;
  margin: auto;
  line-height: 35px;
  text-align: center;
  background: var(--secondary-color);
  color: #fff;
  border-radius: 50%;
  box-shadow: 4px 4px 5px rgba(214, 154, 104, 0.1);
}
.number-selector {
  width:150px; 
  margin:0px auto;
  bottom:0px; 
  margin-bottom: 0px;
  background: var(--tertiary-color);
  color: var(--info-color);
  border-radius: 30pt;
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.1);
}
.card-left {
  display: flex;
  flex-direction: row;
  justify-content: top;
  margin: 10px;
}
.table-last-modification {
  font-size: 0.9em;
  top: 5px;
  left: 10px;
  color: #000;
  font-weight: bold;
}
.table-show-details {
  display: block;
  bottom: 5px;
  right: 15px;
}

</style>