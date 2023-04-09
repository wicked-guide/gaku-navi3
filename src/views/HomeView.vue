<template>
  <div class="home">
    <!-- <HeaderNav></HeaderNav> -->
    <header class="flex-b">
      <div><router-link to="/" class="logo">がくなび</router-link></div>
      <!-- 検索 -->
      <input type="search" v-model="search" class="search" placeholder="検索" />
      <div></div>
    </header>
    <section class="overflow">
      <main>
        <!-- コース一覧 -->
        <section class="grid">
          <router-lin
            to="/"
            class="card"
            v-for="item in searchCourse"
            :key="item.id"
          >
            <img
              :src="require('@/assets/thumbnail/' + item.id + '.png')"
              alt="thumbnail"
            />
            <div class="tag">
              <span v-for="(tag, index) in item.tag" :key="index">
                {{ tag }}
              </span>
            </div>

            <div class="title">{{ item.name }}</div>
            <div class="date">{{ item.date }}</div>
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
// import HeaderNav from "@/components/HeaderNav.vue";

export default {
  name: "HomeView",
  // components: {
  //   HeaderNav,
  // },
  data() {
    return {
      course: [],
      search: "",
      games: [],
    };
  },

  async mounted() {
    // const data = await fetch("~@/assets/course.json");
    const data = await fetch("../course.json");
    const json = await data.json();
    this.course = json;
    console.log(this.course[0]);
  },

  computed: {
    searchCourse() {
      return this.course.filter((e) => {
        return e.name.includes(this.search) || e.tag.includes(this.search);
      });
    },
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
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
.card {
  color: white;
  background-color: #00000077;
  /* background-color: white; */
  cursor: pointer;
  transition: 0.5s;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
}

.card:hover {
  color: black;
  background-color: white;
  box-shadow: 3px 3px 5px;
}
.card img {
  width: 100%;
  border-radius: 0.5rem;
}
.card .title {
  padding: 0.5rem;
  font-size: x-large;
}
.card .tag {
  margin: 0.2rem;
}
.card .tag span {
  margin-left: 0.3rem;
  padding: 0.2rem;
  font-size: small;
  background-color: var(--main-color);
  color: white;
  border-radius: 5px;
}
.card .date {
  margin-top: auto;
  padding: 0 1rem 0.5rem;
  text-align: end;
}

footer {
  margin-top: auto;
  padding: 1rem;
  font-size: large;
  font-weight: bold;
  color: white;
  background-color: #00000077;
}
a {
  color: white;
}
</style>
