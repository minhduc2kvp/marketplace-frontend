<template>
  <Layout>
    <div class="marketplace">
      <div class="market-items-container">
        <div class="nav-bar">
          <div
            v-for="(item, index) in navItems"
            :key="index"
            class="nav-item"
            :class="{ active: navItemSelected.type == item.type }"
            @click="changeNavItemSelected(item)"
          >
            <img :src="item.icon" alt="" class="nav-item-icon" />
            <div class="nav-item-text">{{ item.text }}</div>
          </div>
        </div>
        <div class="list-items">.</div>
      </div>
    </div>
  </Layout>
</template>

<script>
import { mapState } from 'vuex';
import { TypeNFT } from '@/commons/enums.js';

export default {
  data() {
    return {
      navItemSelected: {},
      navItems: [],
    };
  },
  computed: {
    ...mapState({
      marketItems: (state) => state.app.market.items,
    }),
  },
  methods: {
    changeNavItemSelected(item) {
      this.navItemSelected = item;
    },
  },
  created() {
    this.navItems = [];
    for (const key in TypeNFT) {
      this.navItems.push({
        text: key,
        icon: require(`@/assets/icon/${key.toLowerCase()}.png`),
        type: TypeNFT[key],
      });
    }
    this.navItemSelected = this.navItems[0];
  },
};
</script>
<style lang="scss" scoped>
.marketplace {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .market-items-container {
    width: 98%;
    height: 95%;
    border-radius: 8px;
    background-color: $color-gray-4;
    .nav-bar {
      border-bottom: 1px solid $color-gray-2;
      display: flex;
      align-items: center;
      .nav-item {
        display: flex;
        align-items: center;
        padding: 8px 24px;
        border-bottom: 3px solid transparent;
        cursor: pointer;
        .nav-item-icon {
          width: 28px;
        }
        .nav-item-text {
          margin-left: 12px;
          font-size: 16px;
        }
        &.active {
          background-color: $color-gray-5;
          border-color: $color-primary-3;
        }
        &:nth-child(1) {
          border-radius: 8px 0 0 0;
        }
      }
    }
  }
}
</style>
