<template>
  <header>
    <router-link to="/" class="logo">がくなび</router-link>
  </header>
</template>

<script>
export default {
  name: "HeaderNav",
};
</script>

<style>
header {
  padding: 0.5rem 1rem;
}
.logo {
  font-size: xx-large;
  font-weight: bold;
  color: white;
}
</style>
