<template>
  <div class="home">
    <HeaderNav></HeaderNav>
    <!-- <header>
      <div><router-link to="/" class="logo">がくなび</router-link></div>
    </header> -->
    <section class="overflow">
      <main>
        <!-- 検索 -->
        <input type="search" class="search" />
        course:{{ course }}
        <!-- コース一覧 -->
        <section class="grid">
          <router-lin to="/" class="card" v-for="item in 5" :key="item">
            <div>im-ge</div>
            <div class="tag">たぐ</div>
            <div class="title">たいとる</div>
            <div class="date">yyyy/mm/dd</div>
          </router-lin>
        </section>
      </main>

      <footer>
        <div class="flex-a">
          <div></div>
          <div><router-link to="/credit">お借りした素材</router-link></div>
        </div>
        <div class="flex-c">witsip</div>
      </footer>
    </section>
  </div>
</template>

<script>
import HeaderNav from "@/components/HeaderNav.vue";

export default {
  name: "HomeView",
  components: {
    HeaderNav,
  },
  data() {
    return {
      course: [],
      search: "",
      games: [],
    };
  },
  mounted() {
    const coursejson = "@/assets/course.json";
    console.log(coursejson);
  },
};
</script>

<style scoped>
.home {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.overflow {
  overflow: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
main {
  padding: 0.5rem 1rem;
}
.search {
  margin-bottom: 0.5rem;
  padding: 0.2rem;
  font-size: larger;
  border: solid 1px var(--main-color);
  border-radius: 5px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
.card {
  color: white;
  background-color: #00000077;
  /* background-color: white; */
  cursor: pointer;
  transition: 0.5s;
  border-radius: 0.5rem;
}

.card:hover {
  color: black;
  background-color: white;
  box-shadow: 3px 3px 5px;
}
.title {
  padding: 0.5rem;
  font-size: x-large;
}
footer {
  margin-top: auto;
  padding: 1rem;
  font-size: large;
  font-weight: bold;
  color: white;
}
a {
  color: white;
}
</style>
