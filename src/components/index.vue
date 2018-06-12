<template>
  <div class="wrapper">

    <header class="header">
      <div class="container">
        <div class="searchBlock">
          <img src="../assets/logo.png" class="logo" alt="HaveFun">
          <div class="searchBlock__search">
            <div class="searchIcon">
              <font-awesome-icon :icon="['fas', 'search']" />
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
                <font-awesome-icon :icon="['fas', 'plus']" />
              </div>
            </div>
            <div class="filter__body">
              <el-select
                v-model="filterLocation"
                clearable
                @change="updateFilter"
                placeholder="請選擇地區">

                <el-option
                  v-for="item in zoneList"
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
                <font-awesome-icon :icon="['fas', 'plus']" />
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
                <font-awesome-icon :icon="['fas', 'plus']" />
              </div>
            </div>
            <div class="filter__body">
              <el-checkbox-group v-model="filterCategories">
                <el-checkbox
                  v-for="item in categories"
                  :label="item[0]"
                  :key="item[0]"
                  @change="updateFilter">
                {{item[1]}}
                </el-checkbox>
              </el-checkbox-group>

            </div>
          </div>
        </section>

        <section class="content">
          <div class="resultInfo">
            <h3>
              Showing <span class="resultInfo--count">{{filterCount}}</span> results by…
            </h3>

            <span class="resultInfo--tag"
              v-if="filterCategories.find(item => item === 'opentime')">
              全天候開放
              <font-awesome-icon :icon="['far', 'times-circle']" />
            </span>
            <span class="resultInfo--tag"
              v-if="filterCategories.find(item => item === 'ticketinfo')">
              免費參觀
              <font-awesome-icon :icon="['far', 'times-circle']" />
            </span>
          </div>
          <ol class="resultList">
            <li class="card" v-for="(item, index) in filterDatas" :key="index">
              <div class="card__img"
              :style="{backgroundImage: `url(${item.Picture1})`}">
              </div>
              <div class="card__info">
                <h2 class="title"> {{ item.Name }}</h2>
                <p class="desc">{{ item.Description }}</p>
                <div class="card__info__main">
                  <span class="location">{{ item.Zone }}</span>
                  <span class="tag" v-if="item.Opentime">全天候開放</span>
                  <span class="tag" v-if="item.Ticketinfo">免費參觀</span>
                </div>
                <div class="card__info__other">
                  <span class="otherIcon">
                    <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
                  </span>
                  <span class="city">{{ item.Zone }}</span>
                  <span class="otherIcon">
                    <font-awesome-icon :icon="['far', 'calendar-alt']" />
                  </span>
                  <span class="date">
                    {{item.Changetime.slice(0, 10)}}
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
      filterDatas: {},
      filterCount: 0,
      filterLocation: '',
      filterDateStart: '',
      filterDateEnd: '',
      filterCategories: [],
      zoneList: [],
      categories: [['opentime', '全天候開放'], ['ticketinfo', '免費參觀']]
    };
  },
  created() {
    const apiUrl =
      'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97';
    /* eslint-disable */

    this.$http.get(apiUrl).then(response => {
      /* eslint-disable no-console */
      // console.log(response.data);

      this.filterDatas = response.data.result.records || {};
      this.filterCount = response.data.result.total || 0;

      const zoneArr = response.data.result.records.map(item => item.Zone);

      const zoneArrUnique = [...new Set(zoneArr)];

      this.zoneList = zoneArrUnique.map(item => {
        return {
          value: item,
          label: item
        };
      });
      /* eslint-enable no-console */
    });
  },
  methods: {
    updateFilter() {
      const apiUrl =
        'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97';

      const params = {};

      if (this.filterLocation) params.Zone = this.filterLocation;
      if (this.filterCategories.find(item => item === 'ticketinfo'))
        params.Ticketinfo = '免費參觀';
      if (this.filterCategories.find(item => item === 'opentime'))
        params.Opentime = '全天候開放';

      /* eslint-disable */
      console.log('params', params);

      this.$http
        .get(apiUrl, {
          params: {
            q: JSON.stringify(params)
          }
        })
        .then(response => {
          /* eslint-disable no-console */
          console.log(response.data);
          this.filterDatas = response.data.result.records || {};
          this.filterCount = response.data.result.total || 0;
          /* eslint-enable no-console */
        });
    }
  },
  components: {
    FontAwesomeIcon
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
