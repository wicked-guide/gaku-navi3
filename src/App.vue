<template>
  <router-view />
</template>

<style>
:root {
  --main-color: #39666c;
  --main-color-a: #39666c55;
  --sub-color: rgb(253, 117, 76);
  --back-color: rgb(255, 252, 240);
  --back-color-a: #00000077;
}
body {
  height: 100vh;
  overflow: hidden;
  margin: 0;
  background-image: url("@/assets/background/school.jpg");
  background-position: center;
  background-size: cover;
  caret-color: transparent;
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
  /* padding: 0.5rem; */
  border-radius: 0.5rem;
  text-decoration: auto;
  transition: 0.5s;
}
a:hover {
  text-decoration: revert;
  background-color: #00000077;
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
input {
  caret-color: var(--main-color);
}
</style>
