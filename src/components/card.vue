<template>
  <li class="card" @click="s_showMap(item)">
    <div class="card__img"
    :style="{backgroundImage: `url(${item.Picture1})`}">
    </div>
    <div class="card__info">
      <h2 class="title"> {{ item.Name }}</h2>
      <p class="desc">{{ item.Description }}</p>

      <div class="card__info__main">
        <span class="tag" v-if="item.Opentime === '全天候開放'">全天候開放</span>
        <span class="tag" v-if="item.Ticketinfo === '免費參觀'">免費參觀</span>
      </div>

      <div class="card__info__other">
        <span class="city">
          <span class="otherIcon">
            <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
          </span>
          {{ item.Add.length > 30 ? item.Add.slice(0,30)+"..." : item.Add}}
        </span>

        <span class="date" >
          <span class="otherIcon">
            <font-awesome-icon :icon="['far', 'calendar-alt']" />
          </span>
          {{ item.Opentime.length > 30 ? item.Opentime.slice(0,30)+"..." : item.Opentime}}
        </span>
      </div>
    </div>
  </li>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

export default {
  name: 'Card',
  props: ['item'],
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  },
  methods: {
    s_showMap(data) {
      this.$emit('f_showMap', data);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
