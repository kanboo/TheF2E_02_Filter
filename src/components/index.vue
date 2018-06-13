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
            <input type="text"
              class="searchInput"
              v-model="searchText"
              @keyup="updateFilter"
              placeholder="Explore your own activities">
          </div>
        </div>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <section class="filters">
          <div class="filter">
            <div class="filter__header">
              <span class="subtitle">地區</span>
              <div class="headerIcon">
                <font-awesome-icon :icon="['fas', 'plus']" />
              </div>
            </div>
            <div class="filter__body">
              <el-select
                v-model="selectLocation"
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
              <span class="subtitle">分類</span>
              <div class="headerIcon">
                <font-awesome-icon :icon="['fas', 'plus']" />
              </div>
            </div>
            <div class="filter__body">
              <el-checkbox-group v-model="selectCategories">
                <el-checkbox
                  v-for="item in categories"
                  :label="item.filterName"
                  :key="item.filterValue"
                  @change="updateFilter">
                {{item.filterValue}}
                </el-checkbox>
              </el-checkbox-group>

            </div>
          </div>

          <div class="filter" v-if="false">
            <div class="filter__header">
              <span class="subtitle">最後更新日期</span>
              <div class="headerIcon">
                <font-awesome-icon :icon="['fas', 'plus']" />
              </div>
            </div>
            <div class="filter__body">
              <div class="dateBlock">
                <span class="demonstration">from</span>
                <el-date-picker
                  v-model="selectDateStart"
                  type="date"
                  class="dateSelect"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <div class="dateBlock">
                <span class="demonstration">to</span>
                <el-date-picker
                  v-model="selectDateEnd"
                  type="date"
                  class="dateSelect"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </div>
          </div>
        </section>

        <section class="content">
          <div class="resultInfo hidden-mobile">
            <h3>
              Showing <span class="resultInfo--count">{{filterCount}}</span> results by…
            </h3>
            <span class="resultInfo--tag"
              v-for="(item, index) in getTag" :key="index"
              @click="cleanFilterCondition(item)"
              >
              {{item.tagValue}}
              <font-awesome-icon :icon="['far', 'times-circle']" />
            </span>
          </div>
          <ol class="resultList">
            <li class="card" v-for="(item, index) in currPageDatas" :key="index">
              <div class="card__img"
              :style="{backgroundImage: `url(${item.Picture1})`}">
              </div>
              <div class="card__info">
                <h2 class="title"> {{ item.Name }}</h2>
                <p class="desc">{{ item.Description }}</p>
                <div class="card__info__main">
                  <!-- <span class="location">{{ item.Zone }}</span> -->
                  <span class="tag" v-if="item.Opentime === '全天候開放'">全天候開放</span>
                  <span class="tag" v-if="item.Ticketinfo === '免費參觀'">免費參觀</span>
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

          <el-pagination
            background
            small
            :current-page.sync="currentPage"
            layout="prev, pager, next"
            :total="filterCount">
          </el-pagination>
        </section>
      </div>
    </main>


  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

export default {
  name: 'index',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      // 篩選後資料
      filterCount: 0,
      filterDatas: [],
      // 分頁資料
      currentPage: 0,
      pageDatas: [],
      // 過濾條件
      searchText: '',
      selectLocation: '',
      selectDateStart: '',
      selectDateEnd: '',
      selectCategories: [],
      // 全部地區
      zoneList: [],
      // 分類
      categories: [
        {
          filterName: 'Opentime',
          filterValue: '全天候開放'
        },
        {
          filterName: 'Ticketinfo',
          filterValue: '免費參觀'
        }
      ]
    };
  },
  mounted() {
    const apiUrl = 'https://data.kcg.gov.tw/api/action/datastore_search';
    /* eslint-disable */

    const params = {
      resource_id: '92290ee5-6e61-456f-80c0-249eae2fcc97',
      limit: 999
    };

    this.$http
      .get(apiUrl, {
        params: params
      })
      .then(response => {
        /* eslint-disable no-console */
        // console.log(response.data);

        this.filterDatas = response.data.result.records || {};
        this.filterCount = response.data.result.total || 0;

        this.computedPageDatas();

        // 篩選出 地區
        const zoneArr = response.data.result.records.map(item => item.Zone);
        const zoneArrUnique = [...new Set(zoneArr)];

        this.zoneList = zoneArrUnique.map(item => {
          return {
            label: item,
            value: item
          };
        });
        /* eslint-enable no-console */
      });
  },
  methods: {
    updateFilter() {
      // 過濾條件----------------------------------------Start
      const filterCondition = {};

      // 地區
      if (this.selectLocation) filterCondition.Zone = this.selectLocation;

      // 分類
      this.categories.map(item => {
        if (this.selectCategories.find(value => item.filterName === value))
          filterCondition[item.filterName] = item.filterValue;
      });

      /* eslint-disable no-console */
      // console.log('filterCondition', filterCondition);
      /* eslint-enable no-console */
      // 過濾條件-------------------------------------------End

      // API+過濾條件
      const apiUrl = 'https://data.kcg.gov.tw/api/action/datastore_search';
      const params = {
        resource_id: '92290ee5-6e61-456f-80c0-249eae2fcc97',
        limit: 999,
        q: this.searchText,
        filters: JSON.stringify(filterCondition)
      };

      this.$http
        .get(apiUrl, {
          params: params
        })
        .then(response => {
          /* eslint-disable no-console */
          // console.log(response.data);
          this.filterDatas = response.data.result.records || {};
          this.filterCount = response.data.result.total || 0;
          this.computedPageDatas();
          /* eslint-enable no-console */
        });
    },
    cleanFilterCondition(obj) {
      /* eslint-disable no-console */

      // 清除地區
      if (obj.tagName === 'Zone') this.selectLocation = '';

      // 清除分類
      var newArr = this.selectCategories.filter(function(value) {
        return value !== obj.tagName;
      });

      this.selectCategories = newArr;
      this.updateFilter();
    },
    computedPageDatas() {
      const sourceData = this.filterDatas;
      const newData = [];
      const count = 10; // 每頁儲放幾筆

      sourceData.forEach((item, i) => {
        // 每 n 筆後，產生新頁
        if (i % count === 0) {
          newData.push([]);
        }

        // 計算資料屬於第幾頁
        const page = parseInt(i / count);
        newData[page].push(item);
      });

      this.pageDatas = newData;
    }
  },
  computed: {
    getTag() {
      const tag = [];
      // 地區
      if (this.selectLocation) {
        tag.push({
          tagName: 'Zone',
          tagValue: this.selectLocation
        });
      }

      // 分類
      this.categories.map(item => {
        if (this.selectCategories.find(value => item.filterName === value))
          tag.push({
            tagName: item.filterName,
            tagValue: item.filterValue
          });
      });

      // console.log('tag', tag);

      return tag;
    },
    currPageDatas() {
      return this.pageDatas[this.currentPage - 1];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
