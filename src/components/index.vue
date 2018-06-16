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
                <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
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

        </section>

        <section class="content">
          <!-- 表頭資訊 -->
          <div class="resultInfo hidden-mobile">
            <h3>
              目前顯示結果：共 <span class="resultInfo--count">{{filterCount}}</span> 筆
            </h3>

            <span class="resultInfo--tag"
              v-for="(item, index) in currFilterTag" :key="index"
              @click="cleanFilterCondition(item)"
              >
              {{item.tagValue}}
              <font-awesome-icon :icon="['far', 'times-circle']" />
            </span>
          </div>

          <!-- 內容 -->
          <transition-group name="list" tag="ol" class="resultList" mode="in-out">
            <li is="card"
              @f_showMap="initMap"
              :item="item"
              class="card"
              v-for="item in currPageDatas"
              :key="item.Id">
            </li>
          </transition-group>

          <!-- 分頁 -->
          <el-pagination
            background
            :current-page.sync="currentPage"
            layout="prev, pager, next"
            :total="filterCount"
            :pager-count="5"
            v-if="filterCount">
          </el-pagination>
        </section>
      </div>
    </main>


    <transition name="fade">

      <div class="map__block" v-show="show" >
        <div class="map__block__info">
          <h2 class="title">
            <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
            {{ mapInfo.Name }}
          </h2>
          <span class="add"> {{ mapInfo.Add }}</span>
          <a href="javascript:;" class="bt-closeMap" @click="closeMap">
            ×
          </a>
        </div>

        <div id="map" class="map__block__location"></div>
      </div>

    </transition>

    <div is='Footer'></div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { _ } from 'vue-underscore';
import card from './card';
import Footer from './Footer';

export default {
  name: 'index',
  components: {
    FontAwesomeIcon,
    card,
    Footer
  },
  data() {
    return {
      // 全部旅遊資訊、地區資訊、分類選項
      KSdatas: [],
      zoneList: [],
      categories: [
        {
          filterName: 'Opentime',
          filterValue: '全天候開放'
        },
        {
          filterName: 'Ticketinfo',
          filterValue: '免費參觀'
        }
      ],
      // 篩選後資料
      filterCount: 0,
      filterDatas: [],
      // 分頁資料
      currentPage: 0,
      pageDatas: [],
      // 過濾條件
      searchText: '',
      selectLocation: '',
      selectCategories: [],
      // 地圖開關及資訊
      show: false,
      mapInfo: ''
    };
  },
  mounted() {
    /* eslint-disable */
    const apiUrl = 'https://data.kcg.gov.tw/api/action/datastore_search';

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

        this.KSdatas = response.data.result.records || {};

        this.filterDatas = this.KSdatas;
        this.filterCount = this.KSdatas.length;

        // 篩選出 地區資訊
        const zoneArr = response.data.result.records.map(item => item.Zone);
        const zoneArrUnique = [...new Set(zoneArr)];

        this.zoneList = zoneArrUnique.map(item => {
          return {
            label: item,
            value: item
          };
        });

        // 計算分頁資料
        this.computedPageDatas();
        /* eslint-enable no-console */
      });
  },
  methods: {
    // 更新搜尋結果
    updateFilter: _.debounce(function() {
      // 取得 選擇分類的資訊
      const filterCondition = {};

      this.categories.map(item => {
        if (this.selectCategories.find(value => item.filterName === value))
          filterCondition[item.filterName] = item.filterValue;
      });

      // 開始篩選資料
      this.filterDatas = this.KSdatas.filter(item => {
        return (
          this.isMatchLocation(item, this.selectLocation) &&
          this.isMatchInput(item, this.searchText) &&
          this.isMatchCategories(item, filterCondition)
        );
      });

      this.filterCount = this.filterDatas.length || 0;

      this.computedPageDatas(); // 計算分頁資料
    }, 1000),
    // 計算分頁資料
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

      this.currentPage = 0;
      this.pageDatas = newData;
    },
    // 清除搜尋條件
    cleanFilterCondition(obj) {
      /* eslint-disable no-console */

      // 清除搜尋文件
      if (obj.tagName === 'searchText') this.searchText = '';

      // 清除地區
      if (obj.tagName === 'Zone') this.selectLocation = '';

      // 清除分類
      var newArr = this.selectCategories.filter(value => {
        return value !== obj.tagName;
      });

      this.selectCategories = newArr;
      this.updateFilter();
    },
    isMatchLocation(SearchData, SearchString) {
      return SearchString === '' || SearchData.Zone === SearchString;
    },
    isMatchInput(SearchData, SearchString) {
      const regex = new RegExp(SearchString, 'gi');
      return (
        SearchData.Name.match(regex) || SearchData.Description.match(regex)
      );
    },
    isMatchCategories(SearchData, SearchItems) {
      if (Object.keys(SearchItems).length === 0) return true;

      let isMatch = true;

      Object.keys(SearchItems).forEach(key => {
        if (SearchData[key] !== SearchItems[key]) isMatch = false;
      });

      return isMatch;
    },
    // 顯示地圖
    initMap(data) {
      this.show = true;
      this.mapInfo = JSON.parse(JSON.stringify(data));

      const uluru = { lat: +data.Py, lng: +data.Px };
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: uluru
      });
      const marker = new google.maps.Marker({
        position: uluru,
        map: map
      });
    },
    closeMap() {
      this.show = false;
      this.mapInfo = '';
    }
  },
  computed: {
    currFilterTag() {
      const tag = [];

      // 搜尋文字
      if (this.searchText) {
        tag.push({
          tagName: 'searchText',
          tagValue: this.searchText
        });
      }

      // 地區
      if (this.selectLocation) {
        tag.push({
          tagName: 'Zone',
          tagValue: this.selectLocation
        });
      }

      // 分類
      this.categories.map(item => {
        if (this.selectCategories.find(value => item.filterName === value)) {
          tag.push({
            tagName: item.filterName,
            tagValue: item.filterValue
          });
        }
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
<style scoped lan="scss">
</style>
