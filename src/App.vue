<template>
  <div id="app">
    <keep-alive include="Products">
      <router-view/>
    </keep-alive>

  </div>
</template>

<script>
import "./assets/css/minireset.min.css"
import "./assets/css/fonts.css"

export default {
  data() {
    return {
      currentDrawer: 0,
      toolbar_active: true,
    };
  },
  methods: {
    getIconUrl: function (pic) {
      if (pic.length === 0) return require('./assets/img/po.png')
      return require('./assets/icons/' + pic)
    }
  }
}
</script>

<style>

@font-face {
  font-family: "ProductSans";
  src: local("Montserrat"),   url(./assets/fonts/ProductSans-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "ProductSans";
  src: local("ProductSans-Black"),   url(./assets/fonts/ProductSans-Black.ttf) format("truetype");
  font-weight: 900;
}
@font-face {
  font-family: "Montserrat";
  src: local("ProductSans-Bold"),   url(./assets/fonts/ProductSans-Bold.ttf) format("truetype");
  font-weight: bold;
}


html, body {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
  background-color: #EFEBE9;
}
:root {
  --primary-color: #102A68!important;
  --secondary-color: #FE9D34!important;
  --tertiary-color: rgb(201, 219, 251)!important;
  --light-main-color: rgba(148, 163, 236, 0.2)!important;
  --success-color: #FF5621!important;
  --warning-color: #FFC108!important;
  --error-color: #ef4d4d!important;
  --danger-color: #ff6b6b!important;
  --info-color: #6f788d!important;
}
#app {
  font-family: "ProductSans";
  /*font-family: "Poppins", "Helvetica Neue", Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  letter-spacing: -0.2px;
  font-weight: normal;
  background-color: #fff;
}

#nav {
  /* padding: 4px;*/
  position: fixed;
  bottom: 0;
  width: 100%;
  /*background-color: rgb(255, 255, 255);*/
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: var(--main-color);
}
.bottom-navigation {
  background-color: #fdfdfd;
  padding: 5pt;
  border-top-left-radius: 10pt;
  border-top-right-radius: 10pt;
  /*
  background-color: #e7e7e7;
  padding: 5pt;
  border-radius: 30pt;
  */
}
</style>
