<template>
  <HeaderNav></HeaderNav>
  <section class="wapper">
    <b>お借りした素材</b>

    <section class="materials">
      <div v-for="(item, index) in credit" :key="index">
        <b>{{ item.type }}</b>
        <ul>
          <li v-for="(name, index) in item.names" :key="index">{{ name }}</li>
        </ul>
      </div>
    </section>
  </section>
</template>

<script>
import HeaderNav from "@/components/HeaderNav.vue";

export default {
  name: "CreditinfoView",
  components: {
    HeaderNav,
  },
  data() {
    return {
      credit: [
        { type: "キャラボイス", names: ["VOICEVOX"] },
        {
          type: "画像",
          names: [
            "icon-rainbow",
            "illust8",
            "Stable diffusion",
            "PAKUTASO",
            "Topecon Heroes",
            "イラストAC",
            "イラストパーク",
            "いらすとや",
            "パブリックドメインQ",
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.wapper {
  margin: 2rem;
  padding: 2rem;
  color: white;
  background: #00000077;
  font-size: x-large;
}

b {
  font-size: larger;
}

.materials {
  padding: 1rem;
}

.materials ul {
  margin: 0 0 1rem;
}
</style>
