57;p0gbram
<template>
  <div id="app">
    <h1>CryptoCurrency</h1>
    <img src="./assets/logo.png">

    <form >
      <select v-model="cryptocurrencyInput">
        <option v-for="cryptocurrency in cryptocurrencies" :value="cryptocurrency.id">{{ cryptocurrency.name }}</option>
      </select>

      <select v-model="currencyInput">
        <option v-for="currency in currencies" :value="currency.id">{{ currency.name }}</option>
      </select>
    </form>

    <h2>1 {{ cryptocurrencyInput | upperCase }}: {{ roundedPrice }} {{ currencyInput | upperCase }}</h2>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data() {
    return {
      price: '',
      errors: [],
      cryptocurrencyInput: 'btc',
      currencyInput: 'eur',
      cryptocurrencies: [
        {name: 'Bitcoin', id: 'btc'},
        {name: 'Ethereum', id: 'eth'},
        {name: 'Ripple', id: 'xrp'},
        {name: 'Bitcoin Cash', id: 'bch'},
        {name: 'Cardano', id: 'ada'},
        {name: 'Litecoin', id: 'ltc'}
      ],
      currencies: [
        {name: 'Dollar', id: 'usd', selected: true},
        {name: 'Euro', id: 'eur', selected: false},
      ]
    }
  },

  filters: {
    upperCase(value) {
      return value.toUpperCase();
    }
  },

  methods: {
    fetchData() {
      axios.get('https://api.cryptonator.com/api/ticker/' + this.cryptocurrencyInput + '-' + this.currencyInput)
        .then(response => {
          this.price = response.data.ticker.price
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  },

  watch: {
    cryptocurrencyInput() {this.fetchData()},
    currencyInput() {this.fetchData()}
  },

  computed: {
    roundedPrice() {
      return Math.round(this.price)
    }
  },

  created() {
    this.fetchData()
  }
}
</script>

<style>
body {
  background: #2c3e50;
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  font-family: sans-serif;
  color: white;
}

select {
  display: block;
  margin: 10px auto;
  width: 95%;
  max-width: 750px;
  padding: 10px;
}

h2 {
  margin-top: 50px;
  background-color: rgb(247, 88, 88);
  padding: 30px 0;
}
</style>
