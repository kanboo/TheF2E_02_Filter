<template>
  <footer class="footer">
    <div class="footer__text">
      <span>Filter - The F2E 前端修練精神時光屋</span>
      <span>|</span>

      <span class="author">
        Designed by Kanboo Wang
      </span>
    </div>
    <a href="https://github.com/kanboo/TheF2E_02_Filter" target="_blank" class="footer__link">
      <font-awesome-icon :icon="['fab', 'github']" />
    </a>
  </footer>

</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

export default {
  name: 'HelloWorld',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.footer {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45px;
  padding: 5px 0;
  background-color: #323232;

  // flex-flow: row wrap;
  &__text {
    margin-right: 10px;
    letter-spacing: 1px;
    color: #ffffff;
    font-size: 14px;
    font-weight: 300;

    @media screen and (max-width: 414px) {
      padding-left: 16px;
    }
  }
  .author {
    font-size: 16px;
    // font-weight: 900;
  }
  &__link {
    // width: 100px;
    transition: transform .4s;
    text-align: center;
    color: #ffffff;
    font-size: 24px;

    &:hover {
      transform: rotate(400deg) scale(1.4);
      color: #f4e5c2;
    }

    @media screen and (max-width: 414px) {
      width: 100px;
      text-align: center;
    }
  }
}

</style>
