<template>
  <div class="wrapper">

    <header class="header">
      <div class="container">
        <div class="searchBlock">
          <img src="../assets/logo.png" class="logo" alt="HaveFun">
          <div class="searchBlock__search">
            <div class="searchIcon">
              <font-awesome-icon :icon="['far', 'star']" />
            </div>
            <input type="text" class="searchInput" placeholder="Explore your own activities">
          </div>
        </div>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <section class="filters">
          <div class="filter">
            <div class="filter__header">
              <span class="subtitle">Location</span>
              <div class="headerIcon">
                <font-awesome-icon :icon="['far', 'star']" />
              </div>
            </div>
            <div class="filter__body">
              <el-select
                v-model="filterLocation"
                clearable
                placeholder="請選擇地區">

                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>

              </el-select>
            </div>
          </div>

          <div class="filter">
            <div class="filter__header">
              <span class="subtitle">Date</span>
              <div class="headerIcon">
                <font-awesome-icon :icon="['far', 'star']" />
              </div>
            </div>
            <div class="filter__body">
              <div class="dateBlock">
                <span class="demonstration">from</span>
                <el-date-picker
                  v-model="filterDateStart"
                  type="date"
                  class="dateSelect"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <div class="dateBlock">
                <span class="demonstration">to</span>
                <el-date-picker
                  v-model="filterDateEnd"
                  type="date"
                  class="dateSelect"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </div>
          </div>

          <div class="filter">
            <div class="filter__header">
              <span class="subtitle">Categories</span>
              <div class="headerIcon">
                <font-awesome-icon :icon="['far', 'star']" />
              </div>
            </div>
            <div class="filter__body">
              <el-checkbox-group v-model="filterCategories">
                <el-checkbox label="复选框 A"></el-checkbox>
                <el-checkbox label="复选框 B"></el-checkbox>
                <el-checkbox label="复选框 C"></el-checkbox>
              </el-checkbox-group>

            </div>
          </div>
        </section>

        <section class="content">
          <div class="resultInfo">
            <h3>
              Showing <span class="resultInfo--count">15</span> results by…
            </h3>

            <span class="resultInfo--tag">
              Koahsiung
              <font-awesome-icon :icon="['far', 'star']" />
            </span>
          </div>
          <ol class="resultList">
            <li class="card" v-for="(item, index) in 3" :key="index">
              <div class="card__img" style="background: url(https://picsum.photos/644/352/?random)">
              </div>
              <div class="card__info">
                <h2 class="title">Kogi Cosby</h2>
                <p class="desc">Donec euismod scelerisque ligula. Maecenas eu varius risus, eu aliquet arcu. Curabitur fermentum suscipit est, tincidunt mattis lorem luctus id. Donec eget massa a diam condimentum pretium. Aliquam erat volutpat. Integer ut tincidunt orci. Etiam tristique, elit ut consectetur iaculis, metus lectus mattis justo, vel mollis eros neque quis augue. Sed lobortis ultrices lacus, a placerat metus rutrum sit amet. Aenean ut suscipit justo.</p>
                <div class="card__info__main">
                  <span class="location">Ethan Foster</span>
                  <span class="tag">Entertainment</span>
                </div>
                <div class="card__info__other">
                  <span class="otherIcon">
                    <font-awesome-icon :icon="['far', 'star']" />
                  </span>
                  <span class="city">Taipei</span>
                  <span class="otherIcon">
                    <font-awesome-icon :icon="['far', 'star']" />
                  </span>
                  <span class="date">
                    2018/05/2132131
                  </span>
                </div>
              </div>
            </li>
          </ol>
        </section>
      </div>
    </main>


  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

export default {
  name: 'index',
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      filterLocation: '',
      filterDateStart: '',
      filterDateEnd: '',
      filterCategories: []
    };
  },
  components: {
    FontAwesomeIcon
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
