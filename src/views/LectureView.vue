<template>
  <section class="gridlayout">
    <!-- もくじ -->
    <section class="coursearea">
      <div>
        <router-link
          :to="{
            name: 'course',
            params: { course: course },
          }"
        >
          <button class="btn" @click="reset">
            <img src="../assets/img/left.svg" alt="戻る" class="icon" />
          </button>
        </router-link>
      </div>
      <button class="btn" @click="isCourseIndex = !isCourseIndex">
        <!-- &equiv; -->
        <img src="../assets/img/menu.svg" alt="メニュー" class="icon" />
      </button>

      <div class="courseIndex" v-show="isCourseIndex">
        <template v-for="item in courseIndex" :key="item">
          <div class="part">{{ item.part }}</div>
          <ul>
            <li
              v-for="item in item.chapter"
              :key="item"
              :class="[{ istrue: item.href == id }]"
              v-show="item.href != '#'"
            >
              <router-link
                :to="{
                  name: 'lecture',
                  params: { course: course, id: item.href },
                }"
                :class="[{ istrue: item.href == id }]"
                @click="courseJump(item.href)"
              >
                {{ item.title }}
              </router-link>
            </li>
          </ul>
        </template>
      </div>
    </section>

    <!-- スライド -->
    <section class="slide">
      <img :src="slideImage" alt="slide" />
    </section>

    <!-- メッセージ -->
    <section class="message flex">
      <!-- アクター -->
      <img
        :src="actorImage"
        alt="アクター"
        v-show="isActor && isText"
        class="actorimg"
      />

      <section class="flex-col w100">
        <!-- 操作メニュー -->
        <section class="flex">
          <button
            :class="['btn', 'nowrap', isActor ? 'istrue' : 'isfalse']"
            @click="isActor = !isActor"
          >
            ・ω・
          </button>
          <span class="actorname">{{ actorName }}</span>
          <!-- <button
            :class="['btn', 'mlauto', isText ? 'istrue' : 'isfalse']"
            @click="isText = !isText"
          >
            字
          </button> -->
          <button
            :class="['btn', 'mlauto', isVoice ? 'istrue' : 'isfalse']"
            @click="
              isVoice = !isVoice;
              voiceStop();
            "
          >
            <!-- &#9835; -->
            <img src="../assets/img/voice.svg" alt="メーター" class="icon" />
          </button>
          <button
            :class="['btn', isSkip ? 'istrue' : 'isfalse']"
            @click="isSkip = !isSkip"
          >
            <!-- &#8635; -->
            <img src="../assets/img/repeat.svg" alt="メーター" class="icon" />
          </button>
          <button :class="['btn']" @click="voiceStop">
            <!-- &#9632; -->
            <img src="../assets/img/stop.svg" alt="メーター" class="icon" />
          </button>
          <button :class="['btn']" @click="voicePlay">
            <!-- &#9654; -->
            <img src="../assets/img/play.svg" alt="メーター" class="icon" />
          </button>
          <div class="voiceSpeed">
            <img src="../assets/img/meter.svg" alt="メーター" class="icon" />
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
        <div class="messageWindow" @click="next" v-show="isText">
          {{ messageText }}
        </div>
      </section>
    </section>

    <!-- ページ -->
    <section class="pagearea">
      <button class="btn" @click="isPageIndex = !isPageIndex">
        <!-- &equiv; -->
        <img src="../assets/img/menu.svg" alt="メニュー" class="icon" />
      </button>
      <ul class="pageIndex" v-show="isPageIndex">
        <li
          v-for="(item, index) in scenario"
          :key="index"
          :class="{ istrue: index == pageIndex }"
          @click="pageJump(index)"
        >
          {{ ("00" + (index + 1)).slice(-2) }}：{{ item.title }}
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      course: "01", // パスパラメータ：course
      id: "01", // パスパラメータ：id
      courseIndex: [], // コースもくじ
      scenario: "", // シナリオ

      // コントロール
      isCourseIndex: false, // コースもくじ
      isPageIndex: true, // ぺーじもくじ
      isText: true, // 字幕表示
      isActor: true, // キャラ表示
      isVoice: true, // 音声再生
      isSkip: true, // オートスキップ

      // シナリオ制御
      pageIndex: 0, // スライドの現在地
      messageIndex: 0, // メッセージの現在地
      messageVoice: new Audio(""), //表示メッセージ音声
      voiceSpeed: 1, // 再生速度
    };
  },
  async mounted() {
    this.course = this.$route.params.course; // パスパラメータ：course
    this.id = this.$route.params.id; // パスパラメータ：id
    await this.getCourse();
    await this.getScenario();
  },
  computed: {
    // スライドイメージ
    slideImage() {
      try {
        if (!this.scenario[this.pageIndex].message[this.messageIndex].slide) {
          return require("../assets/background/school.jpg");
        } else {
          return require("../assets/" +
            this.course +
            "/" +
            this.id +
            "/img/" +
            this.scenario[this.pageIndex].message[this.messageIndex].slide);
        }
      } catch {
        return { mes: "制作中です" };
      }
    },

    // 字幕
    messageText() {
      try {
        return this.scenario[this.pageIndex].message[this.messageIndex].text;
      } catch {
        return "LAST";
      }
    },

    // アクター
    actorName() {
      try {
        return this.scenario[this.pageIndex].message[this.messageIndex].actor;
      } catch {
        return "";
      }
    },
    actorImage() {
      try {
        if (
          !this.scenario[this.pageIndex].message[this.messageIndex].actorImg
        ) {
          return require("../assets/actor/Tsumugi-01.png");
        } else {
          return require("../assets/actor/" +
            this.scenario[this.pageIndex].message[this.messageIndex].actorImg);
        }
      } catch {
        return require("../assets/actor/Tsumugi-01.png");
      }
    },
  },
  methods: {
    // courseを取得
    getCourse() {
      const url = "../" + this.course + "/index.json";
      axios
        .get(url)
        .then((response) => (this.courseIndex = response.data))
        .catch((error) => {
          console.log("course制作中です", error);
          this.courseIndex = [{ part: "制作中" }];
        });
    },

    // scenarioを取得
    getScenario() {
      const scenariourl = "../" + this.course + "/" + this.id + ".json";
      axios
        .get(scenariourl)
        .then((response) => (this.scenario = response.data))
        .catch((error) => {
          console.log("scenario制作中です", error);
          this.scenario = [{ part: "制作中" }];
        });
    },

    // 画面を戻る時にリセット
    reset() {
      this.messageVoice.pause();
      this.pageIndex = 0;
      this.messageIndex = 0;
    },

    // 進む
    next() {
      this.messageIndex++;
      // 各スライドの最終メッセージ⇒次のスライド
      if (this.messageText == "LAST") {
        if (this.scenario.length == this.pageIndex + 1) {
          this.messageIndex--;
          return;
        } else {
          this.pageIndex++;
          this.messageIndex = 0;
        }
      }

      if (this.isVoice) {
        this.voicePlay();
      }
    },

    // 音声中断
    voiceStop() {
      this.messageVoice.pause();
    },

    // 音声再生
    voicePlay() {
      // 再生中なら一旦停止
      this.messageVoice.pause();
      // ボイスの有無を判断してセット
      let voice =
        this.scenario[this.pageIndex].message[this.messageIndex].voice;
      if (voice) {
        this.messageVoice = new Audio(
          require("../assets/" +
            this.course +
            "/" +
            this.id +
            "/voice/" +
            voice)
        );
        this.messageVoice.playbackRate = this.voiceSpeed;
        this.messageVoice.play();
        // ボイス終了⇒オートスキップ
        this.messageVoice.addEventListener("ended", () => {
          if (this.isSkip) {
            this.next();
          }
        });
      }
    },

    // 移動：もくじジャンプ
    pageJump(index) {
      this.pageIndex = index;
      this.messageIndex = 0;
      if (this.isVoice) {
        this.voicePlay();
      }
    },

    // 移動：シナリオジャンプ
    courseJump(href) {
      this.messageVoice.pause();
      this.id = href;
      this.getScenario();
      this.pageIndex = 0;
      this.messageIndex = 0;
    },
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
  grid-template-rows: 1fr 12.5rem;
  color: white;
}
a {
  color: unset;
}
.coursearea {
  grid-area: coursearea;
}
.coursearea .btn {
  width: 2rem;
  display: flex;
  padding: 0.2rem;
  border-radius: 0.2rem;
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
  margin: 0;
  padding: 0 0.5rem 0rem 1rem;
  font-size: large;
  list-style: none;
}
.courseIndex ul li,
.pageIndex li {
  cursor: pointer;
}
.courseIndex a {
  display: block;
}
.courseIndex a.router-link-exact-active {
  color: #000;
}
.courseIndex ul li a:hover,
.pageIndex li:hover {
  color: black;
  background-color: white;
  border-radius: unset;
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
  border-radius: 0.5rem;
}

/* 字幕エリア */
.message {
  grid-area: message;
  margin: 0.5rem 0;
}
.message .btn {
  margin-right: 0.2rem;
  padding: 0.2rem;
  display: flex;
  border-radius: 0.5rem;
}
.istrue {
  color: #000000;
  background-color: ghostwhite;
}
.isfalse {
  background: var(--disable);
}
.actorimg {
  max-height: 100%;
  background-color: var(--dark);
  border-radius: 0.5rem;
}
.messageWindow {
  flex: 1;
  background-color: var(--dark);
  border-radius: 0.5rem;
  display: block;
  overflow: auto;
  font-size: 1.8rem;
  padding: 0.5rem;
  white-space: break-spaces;
  cursor: pointer;
}
.actorname {
  font-size: x-large;
  padding: 0 0.5rem;
  background-color: var(--dark);
  border-radius: 0.5rem;
}
.voiceSpeed {
  padding: 0.2rem;
  display: flex;
  align-items: center;
  color: black;
  background-color: ghostwhite;
  border-radius: 0.5rem;
}
.voiceSpeed input {
  width: 3rem;
  accent-color: var(--dark);
}
.voiceSpeed div {
  width: 2rem;
  text-align: center;
}
.messageWindow::after {
  content: "▼";
  animation: blink 1s ease-in-out infinite alternate;
}

@keyframes blink {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
/* ページ */
.pagearea {
  grid-area: pagearea;
}
.pagearea .btn {
  margin-left: auto;
  width: 2rem;
  padding: 0.2rem;
  display: flex;
  border-radius: 0.2rem;
}
.pageIndex {
  padding: 0.5rem;
}

.btn {
  font-size: larger;
  cursor: pointer;
}
.icon {
  width: 2rem;
}
</style>
