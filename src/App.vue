<template>
  <div id="app">
    <div class="nav">
      <router-link class="nav-item" to="/calc">Calculator</router-link>
      <router-link class="nav-item" to="/comments">Comments</router-link>
    </div>
    <div class="wrapper">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
.wrapper {
  padding-top: 60px;
  max-width: 960px;
  margin: 0 auto;
}

.nav {
  text-align: center;
}

.nav-item {
  display: inline-block;
  text-decoration: none;
  color: #000;
  text-transform: uppercase;

  &:first-child {
    margin-right: 16px;
  }
}

.router-link-active {
  text-decoration: underline;
}

.v-toaster {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  min-width: 0;
  min-height: 0;
}
</style>
