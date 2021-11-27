<template>
  <div class="user-account">
    <div class="account-content">
      <div class="title-content">
        <img src="@/assets/icon/wallet.png" alt="" class="title-icon" />
        <div class="title-text">Wallet</div>
      </div>

      <!-- Information of account -->
      <div class="account-info">
        <div class="account-address">
          <img src="@/assets/icon/link.png" alt="" class="address-icon" />
          <div class="address-title">Address:</div>
          <div class="address-text">{{ account }}</div>
        </div>
        <img
          src="@/assets/icon/copy.png"
          @click="copyAddress"
          alt=""
          class="button-copy"
        />
      </div>

      <!-- Assets of account -->
      <div class="account-assets">
        <div class="asset-info">
          <img src="@/assets/icon/coin.png" alt="" class="asset-icon" />
          <div class="asset-amount">{{ getBalance }} {{ symbol }}</div>
        </div>
        <div class="asset-info">
          <img src="@/assets/icon/tank.png" alt="" class="asset-icon" />
          <div class="asset-amount">{{ getTanks.length }} Tank</div>
        </div>
        <div class="asset-info">
          <img src="@/assets/icon/bullet.png" alt="" class="asset-icon" />
          <div class="asset-amount">{{ getBullets.length }} Bullet</div>
        </div>
        <div class="asset-info">
          <img src="@/assets/icon/explosion.png" alt="" class="asset-icon" />
          <div class="asset-amount">{{ getExplosions.length }} Explosion</div>
        </div>
      </div>

      <!-- List tank item -->
      <div v-if="getTanks.length > 0" class="tank-asset">
        <div class="asset-title">
          <img src="@/assets/icon/tank.png" alt="" class="title-icon" />
          <div class="title-text">Tank</div>
        </div>
        <div class="list-tank">
          <div v-for="(tank, index) in getTanks" :key="index" class="tank-item">
            <img :src="tank.image" alt="" class="tank-image" />
            <div class="tank-info">
              <img
                :src="
                  require(`@/assets/icon/level${tank.properties.level}.png`)
                "
                alt=""
                class="tank-level"
              />
              <div class="tank-name" :title="tank.name">{{ tank.name }}</div>
              <div class="tank-description" :title="tank.description">
                {{ tank.description }}
              </div>
              <div class="tank-armor">
                <img src="@/assets/icon/shield.png" alt="" class="armor-icon" />
                <div class="armor-value">{{ tank.properties.armor }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { utils } from 'web3';
import { TypeNFT } from '@/commons/enums.js';
import toast from '@/components/mixins/toast.js';

export default {
  mixins: [toast],
  computed: {
    ...mapState({
      account: (state) => state.user.account,
      balance: (state) => state.user.balance,
      nfts: (state) => state.user.nfts,
      symbol: (state) => state.app.token?.symbol,
    }),
    getBalance() {
      return this.balance ? utils.fromWei(this.balance) : 0;
    },
    getTanks() {
      return this.nfts.filter((nft) => nft.type == TypeNFT.Tank);
    },
    getBullets() {
      return this.nfts.filter((nft) => nft.type == TypeNFT.Bullet);
    },
    getExplosions() {
      return this.nfts.filter((nft) => nft.type == TypeNFT.Explosion);
    },
  },
  methods: {
    copyAddress() {
      navigator.clipboard.writeText(this.account);
      this.success('Copy address successfull');
    },
  },
};
</script>

<style lang="scss" scoped>
.user-account {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 16px 24px;
  .account-content {
    width: 100%;
    .title-content {
      font-size: 24px;
      display: flex;
      align-items: center;
      img.title-icon {
        width: 32px;
        margin-right: 8px;
      }
    }

    .account-info {
      margin-top: 12px;
      padding: 4px 8px;
      border-radius: 4px;
      background-color: $color-gray-5;
      display: flex;
      align-items: center;
      // width: max-content;
      .account-address {
        display: flex;
        align-items: center;
        .address-icon {
          width: 20px;
        }
        .address-title {
          margin: 0 8px;
        }
      }
      .button-copy {
        margin-left: 4px;
        width: 28px;
        padding: 4px;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
          background-color: $color-gray-3;
        }
      }
    }

    .account-assets {
      display: flex;
      justify-content: space-around;
      padding: 16px 0;
      background-color: $color-gray-5;
      border-radius: 4px;
      margin-top: 12px;
      .asset-info {
        width: 150px;
        height: 150px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: $color-gray-6;
        box-shadow: 0px 0px 8px 0px rgba(107, 113, 133, 0.2);
        border-radius: 8px;
        .asset-icon {
          width: 36px;
          margin-bottom: 16px;
        }
      }
    }

    .tank-asset {
      width: 100%;
      margin-top: 12px;
      background-color: $color-gray-5;
      border-radius: 4px;
      padding: 16px;
      .asset-title {
        font-size: 20px;
        display: flex;
        align-items: center;
        .title-icon {
          width: 32px;
          margin-right: 8px;
        }
      }
      .list-tank {
        min-width: 100%;
        width: 500px;
        overflow-x: auto;
        margin-top: 8px;
        display: flex;
        .tank-item {
          margin-right: 16px;
          display: flex;
          align-items: center;
          padding: 16px;
          min-width: 400px;
          max-width: 400px;
          width: 400px;
          border-radius: 4px;
          background-color: $color-gray-6;
          .tank-image {
            width: 150px;
            min-width: 150px;
            max-height: 150px;
            border-radius: 4px;
          }
          .tank-info {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: 100%;
            margin-left: 12px;
            .tank-level {
              width: 24px;
              margin-left: auto;
            }
            .tank-name {
              max-width: 200px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin-top: 8px;
            }
            .tank-description {
              margin-top: 4px;
              font-size: 12px;
              color: $color-gray-1;
              max-height: 50px;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .tank-armor {
              margin-top: auto;
              margin-bottom: 8px;
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
          }
        }
      }
    }
  }
}
</style>
