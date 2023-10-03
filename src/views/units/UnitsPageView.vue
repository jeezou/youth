<template>
  <main class="units-page container">
    <div class="units-page__inner-wrapper transparent-page-wrapper">
      <bread-crumbs ref="breadcrumbs" />
      <div class="page-title">Региональные отделения</div>
      <span class="units-page__search-wrapper">
        <div class="units-page__search-icon" />
        <!-- <input type="text" class="units-page__search" placeholder="Укажите отделение" /> -->
        <multi-select
          class="units-page__search"
          :options="orderedUnits.map((a) => a.title)"
          :placeholder="`Укажите отделение`"
          :searchable="true"
          @select="handleSearch"
        ></multi-select>
      </span>

      <div class="map-wrapper" :key="key">
        <div id="russia-map"></div>
      </div>
    </div>
    <div class="units-page__list-wrapper">
      <div class="units-page__list-title">Список отделений</div>
      <div class="units-page__list">
        <b-table-simple class="units-page__table" bordered hover striped>
          <b-tbody>
            <b-tr
              v-for="row in Math.ceil(orderedUnits.length / colCount)"
              :key="`units-table_row-${row}`"
              class="units-page__table-row"
            >
              <b-td
                class="units-page__table-row-item"
                v-for="cell in colCount"
                :key="`units-table_cell-${cell}`"
              >
                <router-link
                  class="units-page__table-link"
                  :to="`/units/${orderedUnits[(row - 1) * colCount + cell - 1].id}`"
                  v-if="orderedUnits[(row - 1) * colCount + cell - 1]"
                >
                  {{ orderedUnits[(row - 1) * colCount + cell - 1].title }}
                </router-link>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </div>
    </div>
    <partners-block />
  </main>
</template>

<script>
/*eslint-disable*/
import PartnersBlock from '@/blocks/PartnersBlock.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

import jsVectorMap from 'jsvectormap';
import '@/assets/map/russia_gen';
import 'jsvectormap/dist/css/jsvectormap.min.css';

import MultiSelect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';

import debounce from 'debounce';

export default {
  name: 'UnitsPageView',
  components: {
    PartnersBlock,
    MultiSelect,
    BreadCrumbs,
  },
  data() {
    return {
      map: {},
      units: [],
      key: 0,

      windowWidth: window.innerWidth,
      colCount: 3,

      searchableUnits: {},
    };
  },
  mounted() {
    document.title = `${process.env.VUE_APP_TITLE} - Региональные отделения`;
    window.addEventListener(
      'resize',
      debounce(() => {
        this.windowWidth = window.innerWidth;
      }, 200)
    );

    // document.addEventListener('mousemove', (e) => {
    //   // eslint-disable-next-line
    //   let n = document.elementsFromPoint(e.clientX, e.clientY);
    //   if (n.filter((el) => el.nodeName === 'circle' || el.nodeName === 'path').length > 1) {
    //     n.filter((el) => el.nodeName === 'path')[0].classList.add('manualActive');
    //   } else {
    //     document.querySelectorAll('.jvm-region.manualActive').forEach((o) => {
    //       o.classList.remove('manualActive');
    //     });
    //   }
    // });

    setTimeout(() => {
      document.querySelectorAll('#russia-map circle').forEach((circle) => {
        const coords = circle.getBoundingClientRect();
        let n = document.elementsFromPoint(
          coords.x + coords.width / 2,
          coords.y + coords.height / 2
        );
        const filtered = n.filter((el) => el.nodeName === 'path');
        if (filtered.length) filtered[0].classList.add('manualActive');
      });
    }, 1500);

    document.addEventListener('scroll', (e) => {
      document.querySelectorAll('#russia-map circle').forEach((circle) => {
        const coords = circle.getBoundingClientRect();
        let n = document.elementsFromPoint(
          coords.x + coords.width / 2,
          coords.y + coords.height / 2
        );
        const filtered = n.filter((el) => el.nodeName === 'path');
        if (filtered.length) filtered[0].classList.add('manualActive');
      });
    });

    let mapregions = [];
    let _this = this;
    this.$axios
      .get(
        'https://sportunros.ru/wp-json/wp/v2/posts?categories=5&per_page=99&page=1&order_by=created'
      )
      .then((response) => {
        const units = response.data;
        units.forEach((u) => {
          mapregions.push([
            u.title.rendered.split(' ')[0],
            u.acf['широта'],
            u.acf['долгота'],
            u.id,
          ]);
          _this.units.push(u.id);
          _this.searchableUnits[u.title.rendered] = u.id;
        });

        this.map = new jsVectorMap({
          selector: '#russia-map',
          map: 'russia_gen',
          labels: {
            regions: {
              render(code) {
                return ['EG', 'CN'].indexOf(code) > -1 ? `Hello${code}` : null;
              },
            },
          },
          regionStyle: {
            initial: {
              fill: '#ffffff',
              fillOpacity: 1,
              strokeWidth: 0.04,
              stroke: '#d4d4d4',
            },
            hover: {
              fillOpacity: 1,
              fill: '#FF6617',
              stroke: '#FF6617',
            },
          },
          onMarkerTooltipShow: (e, tooltip, code) => {
            tooltip.text(`${mapregions[code][0]} отделение`);
          },
          onMarkerTooltipHide: () => {},
          onMarkerClick: (e, label) => {
            _this.map.tooltip._tooltip.classList.add('hidden');
            _this.$router.push('/units/' + _this.units[label]);
          },
        });

        const markers = [];
        for (let i = 0; i < mapregions.length; i++) {
          markers.push({
            name: mapregions[i][0],
            coords: [mapregions[i][1], mapregions[i][2]],
            id: mapregions[i][3],
          });
        }
        _this.map.addMarkers(markers);
      });
  },
  methods: {
    handleSearch(value) {
      this.$router.push(`/units/${this.orderedUnits.filter((e) => e.title === value)[0].id}`);
    },
  },
  computed: {
    orderedUnits() {
      const ordered = [];
      Object.keys(this.searchableUnits).forEach((unit) => {
        ordered.push({
          title: unit,
          id: this.searchableUnits[unit],
        });
      });
      return ordered.sort((a, b) => a.title.localeCompare(b.title));
    },
  },
  watch: {
    '$route.path': {
      handler() {
        this.key += 1;
      },
    },
    windowWidth: {
      handler(val) {
        if (val > 768) this.colCount = 3;
        if (val <= 768) this.colCount = 2;
        if (val <= 576) this.colCount = 1;
      },
    },
  },
};
</script>

<style lang="scss">
.units-page {
  #russia-map {
    min-height: 751px;
  }

  &__search {
    width: 100%;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;

    border: none;

    input {
      padding-left: 8px !important;
    }

    &.is-active {
      box-shadow: none;
    }

    .multiselect-placeholder {
      padding-left: 8px;
    }

    &-wrapper {
      width: 100%;
      padding: 12px 16px 12px 48px;
      border-radius: 8px;
      background: $white;
      display: flex;
      margin: 40px 0;
      position: relative;
      align-items: center;
      height: 48px;
    }

    &-icon {
      position: absolute;
      top: 12px;
      left: 16px;
      width: 24px;
      height: 24px;
      background: url('@/assets/images/icons/search-gray.svg');
    }

    &::placeholder {
      color: $gray-1;
    }
  }

  &__list {
    &-wrapper {
      margin-top: 0px;
      padding-top: 40px;
      border-top: 1px solid rgba($gray-2, 0.8);
    }

    &-title {
      font-weight: 700;
      font-size: 24px;
      line-height: 23px;
      text-transform: uppercase;
      text-align: left;
      margin-bottom: 32px;
    }
  }

  &__table {
    &-head {
      font-weight: 600;
      padding: 12px 18px !important;
    }

    &-row-item {
      padding: 0 !important;
    }

    &-link {
      text-decoration: none;
      padding: 12px 18px !important;
      width: 100%;
      display: block;

      color: $black;

      &:hover {
        color: $black;
        text-decoration: underline;
      }
    }
  }
}

.jvm-tooltip {
  background: $black;
  color: $white;
  padding: 12px;
  border-radius: 5px;

  font-family: 'Manrope';
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;

  &.hidden {
    display: none;
  }
}

.jvm-element {
  transition: $hover;
}

.jvm-region {
  fill: #d0d0d0;

  &:hover {
    fill: $orange !important;
  }
}

.jvm-region.manualActive {
  fill: $orange;
}

.jvm-marker {
  transition: none;
  fill: $orange;
  stroke-opacity: 0.8;
  stroke-width: 2px;
  fill-opacity: 1;
}

@media screen and (max-width: 768px) {
  .units-page {
    #russia-map {
      min-height: 500px;
    }
  }
}

@media screen and (max-width: 576px) {
  .units-page {
    #russia-map {
      min-height: 300px;
    }
  }
}
</style>
