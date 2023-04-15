<template>
  <HeaderNav></HeaderNav>
  <section class="wapper">
    <!-- <h1>{{ course }}</h1> -->

    <!-- サムネイル -->
    <img
      :src="require('@/assets/thumbnail/' + course + '.png')"
      alt="thumbnail"
      class="thumbnail"
    />

    <!-- もくじ -->
    <section class="courseIndex">
      <div v-for="(part, index) in courseIndex" :key="index">
        <div class="part">{{ part.part }}</div>
        <!-- チャプター -->
        <ol>
          <li v-for="(chapter, index) in part.chapter" :key="index">
            <router-link
              v-if="chapter.href != '#'"
              :to="{
                name: 'lecture',
                params: { course: course, id: chapter.href },
              }"
            >
              {{ chapter.title }}: {{ chapter.href }}
            </router-link>
            <div v-else class="making">
              <span>制作中</span>
              {{ chapter.title }}
            </div>
          </li>
        </ol>
      </div>
    </section>
  </section>
</template>

<script>
import HeaderNav from "@/components/HeaderNav.vue";

export default {
  name: "CourseIndex",
  components: {
    HeaderNav,
  },
  data() {
    return {
      course: this.$route.params.course, // パスパラメータ
      courseIndex: [],
    };
  },
  async mounted() {
    const url = "../" + this.course + "/index.json";
    const data = await fetch(url);
    const json = await data.json();
    this.courseIndex = json;
  },
};
</script>

<style scoped>
.wapper {
  padding: 0 2rem;
}

@media (min-width: 800px) {
  .wapper {
    display: grid;
    grid-template-columns: 2fr 3fr;
    gap: 1rem;
  }
}
.thumbnail {
  max-width: 100%;
}

/* もくじ */
.courseIndex {
  max-height: calc(100vh - 120px);
  overflow: auto;
  background-color: var(--back-color-a);
  color: white;
  font-size: x-large;
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.courseIndex::-webkit-scrollbar {
  display: none;
}

.courseIndex .part {
  padding-left: 0.5rem;
  /*  font-size: large;
  font-weight: bold;
  border-left: var(--main-color) solid 5px;
  border-bottom: solid var(--main-color) thin; */
  background-color: #ffffff66;
  border-radius: 0.5rem;
}

.courseIndex ol {
  margin: 0 0 1rem;
  list-style: decimal;
  font-size: larger;
}

.courseIndex ol li {
  margin: 0.2rem 0;
}

.courseIndex ol li a {
  display: block;
  color: white;
  text-decoration: auto;
}

.courseIndex ol li a:hover {
  color: black;
  background-color: white;
  box-shadow: 3px 3px 5px;
}
.making {
  color: #ffffff66;
}
</style>
