<template>
  <div class="table-item">
    <div>
      <div class="card-left">
        <div class='table-name'>{{data.name}}</div>
      </div>

      <div class="card-right">
        <div v-if="tableBusy(data)">
          <div class="table-last-modification">
            <b-icon style="vertical-align: middle;" color="#000000" :size="18" icon="clock"></b-icon>
              {{getLastMod(data.conto)}}
          </div>
          <div class="table-show-details">
            <span class="table-order-amount">
              <b-icon color="#6f788d" :size="18" icon="wallet2"/>
              {{getAmount(data.conto)}}
            </span>
            <span class="table-order-quantity">
              <b-icon color="#ff6b6b" :size="18" icon="cart4"/>
              {{getQuantity(data.conto)}} {{$t('product.products')}}
            </span>
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
.card-left {
  float: left;
  text-align: center;
  width: 30%;
}
.card-right {
  float: left;
  text-align: right;
}
.table-name {
  text-align: left;
  font-size: 2em;
  z-index: 100;
  color: var(--secondary-color);
  font-weight: bold;
  letter-spacing: -0.05em;
  line-height: 25px;
}
.table-item {
  background-color: rgb(255, 248, 241);
  margin-top: 10px;
  padding: 8px;
  min-height: 90px;
  border-radius: 10pt;
  border: solid 1px rgb(248, 222, 216);
  box-shadow: 4px 4px 5px rgba(226, 191, 191, 0.4);
}

.table-order-amount {
  padding-right: 5px;
  padding-left: 5px;
  border-radius: 20px;
  border: solid 1px var(--info-color);
  vertical-align: middle;
  color:  var(--info-color);
  text-align: center;
}
.table-order-quantity {
  padding-right: 5px;
  padding-left: 5px;
  border-radius: 20px;
  margin-left: 10px;
  vertical-align: middle;
  border: solid 1px var(--danger-color);
  color:  var(--danger-color);
  text-align: center;
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
  margin-top: 10px;
  font-size: 1.1em;
  color: var(--info-color);
}

</style>