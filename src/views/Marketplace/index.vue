<template>
  <Layout>
    <div class="marketplace">
      <div class="market-items-container">
        <!-- Nav bar -->
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
          <div class="button-refresh" @click="refresh">
            <img src="@/assets/icon/refresh.png" class="refresh-icon" alt="" />
          </div>
        </div>

        <!-- List items -->
        <div class="list-items">
          <!-- No content notice -->
          <div
            class="no-content-notice"
            v-if="
              (navItemSelected.type == TypeNFT.Tank &&
                getTanks &&
                getTanks.length == 0) ||
              (navItemSelected.type == TypeNFT.Bullet &&
                getBullets &&
                getBullets.length == 0) ||
              (navItemSelected.type == TypeNFT.Explosion &&
                getExplosions &&
                getExplosions.length == 0)
            "
          >
            <img
              src="@/assets/icon/no-content.png"
              alt=""
              class="icon-no-content"
            />
            <div class="msg-no-content">No items found</div>
          </div>

          <!-- List tank item -->
          <div v-show="navItemSelected.type == TypeNFT.Tank" class="list-tank">
            <div
              v-for="(tank, index) in getTanks"
              :key="index"
              class="tank-item"
            >
              <img
                :src="tank.data.image"
                @loadstart="imageIsLoad($event)"
                @load="imageIsLoaded($event)"
                alt=""
                class="tank-image"
              />
              <div class="tank-info">
                <div class="tank-name" :title="tank.data.name">
                  {{ tank.data.name }}
                </div>
                <div class="tank-description" :title="tank.data.description">
                  {{ tank.data.description }}
                </div>
                <div class="tank-properties">
                  <div class="tank-armor">
                    <img
                      src="@/assets/icon/shield.png"
                      alt=""
                      class="armor-icon"
                    />
                    <div class="armor-value">
                      {{ tank.data.properties.armor }}
                    </div>
                  </div>
                  <img
                    :src="
                      require(`@/assets/icon/level${tank.data.properties.level}.png`)
                    "
                    alt=""
                    class="tank-level"
                  />
                </div>
              </div>
              <div class="action-container">
                <div class="price">
                  <img src="@/assets/icon/coin.png" alt="" class="icon-coin" />
                  <div class="price-value">
                    {{ formatToken(tank.price) }} {{ symbol }}
                  </div>
                </div>
                <Button class="button-success" @click="onBuyItem(tank)">
                  Buy
                </Button>
              </div>
            </div>
          </div>

          <!-- List bullet item -->
          <div
            v-show="navItemSelected.type == TypeNFT.Bullet"
            class="list-bullet"
          >
            <div
              v-for="(bullet, index) in getBullets"
              :key="index"
              class="bullet-item"
            >
              <img
                :src="bullet.data.image"
                @loadstart="imageIsLoad($event)"
                @load="imageIsLoaded($event)"
                alt=""
                class="bullet-image"
              />
              <div class="bullet-info">
                <div class="bullet-name" :title="bullet.data.name">
                  {{ bullet.data.name }}
                </div>
                <div
                  class="bullet-description"
                  :title="bullet.data.description"
                >
                  {{ bullet.data.description }}
                </div>
                <div class="bullet-damage">
                  <img
                    src="@/assets/icon/swords.png"
                    alt=""
                    class="damage-icon"
                  />
                  <div class="damage-value">
                    {{ bullet.data.properties.damage }}
                  </div>
                </div>
              </div>
              <div class="action-container">
                <div class="price">
                  <img src="@/assets/icon/coin.png" alt="" class="icon-coin" />
                  <div class="price-value">
                    {{ formatToken(bullet.price) }} {{ symbol }}
                  </div>
                </div>
                <Button class="button-success" @click="onBuyItem(bullet)">
                  Buy
                </Button>
              </div>
            </div>
          </div>

          <!-- List explosion item -->
          <div
            v-show="navItemSelected.type == TypeNFT.Explosion"
            class="list-explosion"
          >
            <div
              v-for="(explosion, index) in getExplosions"
              :key="index"
              class="explosion-item"
            >
              <img
                :src="explosion.data.image"
                @loadstart="imageIsLoad($event)"
                @load="imageIsLoaded($event)"
                alt=""
                class="explosion-image"
              />
              <div class="explosion-info">
                <div class="explosion-name" :title="explosion.data.name">
                  {{ explosion.data.name }}
                </div>
                <div
                  class="explosion-description"
                  :title="explosion.data.description"
                >
                  {{ explosion.data.description }}
                </div>
              </div>
              <div class="action-container">
                <div class="price">
                  <img src="@/assets/icon/coin.png" alt="" class="icon-coin" />
                  <div class="price-value">
                    {{ formatToken(explosion.price) }} {{ symbol }}
                  </div>
                </div>
                <Button class="button-success" @click="onBuyItem(explosion)">
                  Buy
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Buy popup -->
      <BuyPopup
        v-if="isShowBuyPopup"
        @close="closeBuyPopup"
        @success="buySuccess"
        :item="itemSelected"
      />
    </div>
  </Layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { TypeNFT } from '@/commons/enums.js';
import Web3 from 'web3';
import toast from '@/components/mixins/toast.js';
import loader from '@/components/mixins/loader.js';
import BuyPopup from './BuyPopup.vue';

export default {
  mixins: [loader, toast],
  components: { BuyPopup },
  data() {
    return {
      navItemSelected: {},
      navItems: [],
      TypeNFT,
      isShowBuyPopup: false,
      itemSelected: {},
    };
  },
  computed: {
    ...mapState({
      marketItems: (state) => state.app?.market?.items,
      symbol: (state) => state.app?.token?.symbol,
      account: (state) => state.user.account,
    }),
    getTanks() {
      return this.marketItems?.filter((nft) => nft.data.type == TypeNFT.Tank);
    },
    getBullets() {
      return this.marketItems?.filter((nft) => nft.data.type == TypeNFT.Bullet);
    },
    getExplosions() {
      return this.marketItems?.filter(
        (nft) => nft.data.type == TypeNFT.Explosion
      );
    },
  },
  methods: {
    ...mapActions('app', ['init']),
    changeNavItemSelected(item) {
      this.navItemSelected = item;
    },
    formatToken(value) {
      const web3 = new Web3();
      return web3.utils.fromWei(value);
    },

    /**
     *
     */
    async refresh() {
      this.showLoading();
      try {
        await this.init();
      } catch (error) {
        console.log(error);
        this.error('Something went wrong');
      }
      this.closeLoading();
    },

    /**
     *
     */
    onBuyItem(item) {
      if (!this.account) {
        this.warning('You are not login');
        return;
      }
      this.itemSelected = item;
      this.showBuyPopup();
    },

    /**
     *
     */
    async buySuccess() {
      this.closeBuyPopup();
      try {
        await this.init();
        this.success('Buy item success');
      } catch (error) {
        console.log(error);
        this.error('Something went wrong');
      }
      this.closeLoading();
    },

    /**
     * Control Buy Popup
     */
    showBuyPopup() {
      this.isShowBuyPopup = true;
    },
    closeBuyPopup() {
      this.isShowBuyPopup = false;
    },

    /**
     * Show and hide loading image
     */
    imageIsLoad(event) {
      event.target.classList.add('on-load');
    },
    imageIsLoaded(event) {
      event.target.classList.remove('on-load');
    },
  },
  async created() {
    this.navItems = [];
    for (const key in TypeNFT) {
      this.navItems.push({
        text: key,
        icon: require(`@/assets/icon/${key.toLowerCase()}.png`),
        type: TypeNFT[key],
      });
    }
    this.navItemSelected = this.navItems[0];

    // load asset
    await this.refresh();
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
    display: flex;
    flex-direction: column;
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
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
      }
      .button-refresh {
        cursor: pointer;
        margin-left: auto;
        margin-right: 16px;
        padding: 8px;
        border-radius: 50%;
        &:hover {
          background-color: $color-gray-3;
        }
        img.refresh-icon {
          width: 24px;
          height: 24px;
        }
      }
    }

    .list-items {
      padding: 16px;
      overflow-y: auto;
      flex-grow: 1;
      display: flex;
      align-items: center;
      position: relative;

      .no-content-notice {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: auto;
        .icon-no-content {
          width: 128px;
        }
        .msg-no-content {
          color: $color-warning-4;
          margin-top: 16px;
          font-size: 24px;
        }
      }

      .list-tank,
      .list-bullet,
      .list-explosion {
        width: 100%;
        height: max-content;
        max-height: 100%;
        max-width: 100%;
        overflow-x: auto;
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        flex-wrap: wrap;
      }

      .tank-item {
        display: flex;
        padding: 16px;
        min-width: 400px;
        max-width: 400px;
        width: 400px;
        height: max-content;
        border-radius: 4px;
        background-color: $color-gray-6;
        position: relative;
        margin: 8px;
        .tank-image {
          width: 150px;
          min-width: 150px;
          max-height: 150px;
          border-radius: 4px;
          &.on-load {
            height: 150px;
            background-image: url('../../assets/icon/spinner.gif');
            background-position: center;
            background-repeat: no-repeat;
            background-size: 64px;
          }
        }
        .tank-info {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          margin-left: 12px;
          .tank-name {
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .tank-description {
            margin-top: 4px;
            font-size: 12px;
            color: $color-gray-1;
            max-height: 50px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .tank-properties {
            margin-top: auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .tank-armor {
              display: flex;
              align-items: center;
              .armor-icon {
                width: 24px;
                margin-right: 4px;
              }
              .armor-value {
                font-size: 16px;
              }
            }
            .tank-level {
              width: 24px;
              margin-left: auto;
            }
          }
        }

        &:hover {
          .action-container {
            opacity: 1;
          }
        }
        .action-container {
          position: absolute;
          top: 50%;
          left: 50%;
          width: calc(100% - 16px);
          height: calc(100% - 16px);
          transform: translate(-50%, -50%);
          border-radius: 4px;
          background-color: $color-gray-3;
          display: flex;
          flex-direction: column;
          opacity: 0;
          align-items: center;
          padding: 16px;
          justify-content: center;
          transition: 0.3s;
          color: $color-white;
          .price {
            margin-bottom: 16px;
            width: max-content;
            display: flex;
            align-items: center;
            .icon-coin {
              width: 32px;
            }
            .price-value {
              margin-left: 8px;
              font-size: 24px;
            }
          }
        }
      }

      .bullet-item {
        display: flex;
        padding: 16px;
        min-width: 400px;
        max-width: 400px;
        width: 400px;
        height: max-content;
        border-radius: 4px;
        background-color: $color-gray-6;
        position: relative;
        margin: 8px;
        .bullet-image {
          width: 150px;
          min-width: 150px;
          max-height: 150px;
          border-radius: 4px;
          &.on-load {
            height: 150px;
            background-image: url('../../assets/icon/spinner.gif');
            background-position: center;
            background-repeat: no-repeat;
            background-size: 64px;
          }
        }
        .bullet-info {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          margin-left: 12px;
          .bullet-name {
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .bullet-description {
            margin-top: 4px;
            font-size: 12px;
            color: $color-gray-1;
            max-height: 50px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .bullet-damage {
            margin-top: auto;
            display: flex;
            align-items: center;
            .damage-icon {
              width: 24px;
              margin-right: 4px;
            }
            .damage-value {
              font-size: 16px;
            }
          }
        }

        &:hover {
          .action-container {
            opacity: 1;
          }
        }
        .action-container {
          position: absolute;
          top: 50%;
          left: 50%;
          width: calc(100% - 16px);
          height: calc(100% - 16px);
          transform: translate(-50%, -50%);
          border-radius: 4px;
          background-color: $color-gray-3;
          display: flex;
          flex-direction: column;
          opacity: 0;
          align-items: center;
          padding: 16px;
          justify-content: center;
          transition: 0.3s;
          color: $color-white;
          .price {
            margin-bottom: 16px;
            width: max-content;
            display: flex;
            align-items: center;
            .icon-coin {
              width: 32px;
            }
            .price-value {
              margin-left: 8px;
              font-size: 24px;
            }
          }
        }
      }

      .explosion-item {
        display: flex;
        padding: 16px;
        min-width: 400px;
        max-width: 400px;
        width: 400px;
        height: max-content;
        border-radius: 4px;
        background-color: $color-gray-6;
        position: relative;
        margin: 8px;
        .explosion-image {
          width: 150px;
          min-width: 150px;
          max-height: 150px;
          border-radius: 4px;
          &.on-load {
            height: 150px;
            background-image: url('../../assets/icon/spinner.gif');
            background-position: center;
            background-repeat: no-repeat;
            background-size: 64px;
          }
        }
        .explosion-info {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          margin-left: 12px;
          .explosion-name {
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .explosion-description {
            margin-top: 4px;
            font-size: 12px;
            color: $color-gray-1;
            max-height: 50px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        &:hover {
          .action-container {
            opacity: 1;
          }
        }
        .action-container {
          position: absolute;
          top: 50%;
          left: 50%;
          width: calc(100% - 16px);
          height: calc(100% - 16px);
          transform: translate(-50%, -50%);
          border-radius: 4px;
          background-color: $color-gray-3;
          display: flex;
          flex-direction: column;
          opacity: 0;
          align-items: center;
          padding: 16px;
          justify-content: center;
          transition: 0.3s;
          color: $color-white;
          .price {
            margin-bottom: 16px;
            width: max-content;
            display: flex;
            align-items: center;
            .icon-coin {
              width: 32px;
            }
            .price-value {
              margin-left: 8px;
              font-size: 24px;
            }
          }
        }
      }
    }
  }
}
</style>
