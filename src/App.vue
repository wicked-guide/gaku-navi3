<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view />
</template>

<style>
:root {
  --main-color: #39666c;
  --sub-color: rgb(253, 117, 76);
  --back-color: rgb(255, 252, 240);
}
body {
  height: 100vh;
  overflow: hidden;
  margin: 0;
  background-image: url("@/assets/background/school.jpg");
  background-position: center;
  background-size: cover;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

/* nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
a {
  text-decoration: auto;
}
a:hover {
  text-decoration: revert;
  background: #00000077;
}
/* ヘルパー */
.flex {
  display: flex;
}
.flex-a {
  display: flex;
  justify-content: space-around;
}
.flex-b {
  display: flex;
  justify-content: space-between;
}
.flex-c {
  display: flex;
  justify-content: center;
}
.flex-col {
  display: flex;
  flex-direction: column;
}
</style>
