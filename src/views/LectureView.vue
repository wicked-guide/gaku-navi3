<template>
  <section class="gridlayout">
    <!-- もくじ -->
    <section class="coursearea">
      <button class="btn">&Lt;</button>
      <button class="btn">&equiv;</button>
      <div class="courseIndex">
        <template v-for="item in courseIndex" :key="item">
          <div class="part">{{ item.part }}</div>
          <ul>
            <li v-for="item in item.chapter" :key="item">{{ item.title }}</li>
          </ul>
        </template>
      </div>
    </section>

    <!-- スライド -->
    <section class="slide">
      <img src="../assets/jh_mathematics/01/img/01-01.png" alt="slide" />
    </section>

    <!-- メッセージ -->
    <section class="message flex">
      <img src="../assets/actor/Adam.jpg" alt="" />
      <section class="flex-col">
        <!-- 操作メニュー -->
        <section class="flex">
          <button class="btn">^^♪</button>
          <span class="actorname">name</span>
          <button class="btn mlauto">字</button>
          <button class="btn">&#9835;</button>
          <button class="btn">&#8635;</button>
          <button class="btn">&#9632;</button>
          <button class="btn">&#9654;</button>
          <div class="voiceSpeed">
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              v-model="voiceSpeed"
            />
            <div>
              {{ voiceSpeed }}
            </div>
          </div>
        </section>

        <!-- 字幕 -->
        <section class="messageWindow">
          <div>{{ message }}</div>
        </section>
      </section>
    </section>

    <!-- ページ -->
    <section class="pagearea">
      <button class="btn">&equiv;</button>
      <ul class="pageIndex">
        <li v-for="(item, index) in scenario" :key="index">
          {{ ("00" + (index + 1)).slice(-2) }}：{{ item.title }}
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      course: this.$route.params.course, // パスパラメータ
      id: this.$route.params.id,
      courseIndex: [],
      scenario: "",

      voiceSpeed: 1, //
    };
  },
  async mounted() {
    const url = "../" + this.course + "/index.json";
    const data = await fetch(url);
    const json = await data.json();
    this.courseIndex = json;

    const scenariourl = "../" + this.course + "/" + this.id + ".json";
    const scenariodata = await fetch(scenariourl);
    const scenariojson = await scenariodata.json();
    this.scenario = scenariojson;
  },
  computed: {
    message() {
      let text = this.scenario[0];
      return text;
    },
    // actorImage(){

    // }
  },
};
</script>

<style scoped>
.gridlayout {
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-areas:
    "coursearea slide pagearea"
    "coursearea message pagearea";
  grid-template-columns: auto 1fr auto;
  grid-template-rows: 1fr 12rem;
}
.coursearea {
  grid-area: coursearea;
}
.courseIndex,
.pageIndex {
  max-height: calc(100vh - 3rem);
  overflow: auto;
}
.courseIndex .part {
  padding: 0.5rem 0.5rem 0;
  color: wheat;
  font-weight: bold;
  background-color: var(--back-color-a);
}
.courseIndex ul,
.pageIndex {
  background-color: var(--back-color-a);
  color: white;
  margin: 0;
  padding: 0 0.5rem 0rem 1rem;
  font-size: large;
  list-style: none;
}
.courseIndex ul li,
.pageIndex li {
  cursor: pointer;
}
.courseIndex ul li:hover,
.pageIndex li:hover {
  color: black;
  background-color: white;
}
/* スライドエリア */
.slide {
  grid-area: slide;
  max-height: calc(100vh - 12rem);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.slide img {
  max-width: 100%;
  max-height: 100%;
  margin: auto;
}

/* 字幕エリア */
.message {
  grid-area: message;
  margin: 0.5rem 0;
}
.message .btn {
  border-radius: 0.5rem;
  margin-right: 0.2rem;
}
.messageWindow {
  background-color: var(--back-color-a);
  color: white;
  display: flex;
  overflow: auto;
  font-size: 1.8rem;
  padding: 0.5rem;
}
/* .messageWindow img {
  max-width: 100%;
  max-height: 8rem;
  margin: auto;
} */
.actorname {
  color: white;
  font-size: x-large;
  padding: 0 0.5rem;
  background-color: var(--back-color-a);
  border-radius: 0.5rem;
}
.voiceSpeed {
  display: flex;
  align-items: center;
}
.voiceSpeed input {
  width: 3rem;
  accent-color: var(--back-color);
}
.voiceSpeed div {
  width: 2rem;
  color: var(--back-color);
}
/* ページ */
.pagearea {
  grid-area: pagearea;
}
.pagearea .btn {
  display: block;
  margin-left: auto;
}
.pageIndex {
  padding: 0.5rem;
}

.btn {
  font-size: larger;
}
</style>
