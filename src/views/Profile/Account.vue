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
              <div class="tank-name" :title="tank.name">{{ tank.name }}</div>
              <div class="tank-description" :title="tank.description">
                {{ tank.description }}
              </div>
              <div class="tank-properties">
                <div class="tank-armor">
                  <img
                    src="@/assets/icon/shield.png"
                    alt=""
                    class="armor-icon"
                  />
                  <div class="armor-value">{{ tank.properties.armor }}</div>
                </div>
                <img
                  :src="
                    require(`@/assets/icon/level${tank.properties.level}.png`)
                  "
                  alt=""
                  class="tank-level"
                />
              </div>
            </div>
            <div class="action-container">
              <Button
                @click="sellItem(tank)"
                class="button-sell button-danger-v2"
              >
                Sell
              </Button>
              <Button
                @click="burnItem(tank.tokenId)"
                class="button-burn button-warning"
              >
                Burn
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- List bullet item -->
      <div v-if="getBullets.length > 0" class="bullet-asset">
        <div class="asset-title">
          <img src="@/assets/icon/bullet.png" alt="" class="title-icon" />
          <div class="title-text">Bullet</div>
        </div>
        <div class="list-bullet">
          <div
            v-for="(bullet, index) in getBullets"
            :key="index"
            class="bullet-item"
          >
            <img :src="bullet.image" alt="" class="bullet-image" />
            <div class="bullet-info">
              <div class="bullet-name" :title="bullet.name">
                {{ bullet.name }}
              </div>
              <div class="bullet-description" :title="bullet.description">
                {{ bullet.description }}
              </div>
              <div class="bullet-damage">
                <img
                  src="@/assets/icon/swords.png"
                  alt=""
                  class="damage-icon"
                />
                <div class="damage-value">{{ bullet.properties.damage }}</div>
              </div>
            </div>
            <div class="action-container">
              <Button
                @click="sellItem(bullet)"
                class="button-sell button-danger-v2"
              >
                Sell
              </Button>
              <Button
                @click="burnItem(bullet.tokenId)"
                class="button-burn button-warning"
              >
                Burn
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- List explosion item -->
      <div v-if="getExplosions.length > 0" class="explosion-asset">
        <div class="asset-title">
          <img src="@/assets/icon/explosion.png" alt="" class="title-icon" />
          <div class="title-text">Explosion</div>
        </div>
        <div class="list-explosion">
          <div
            v-for="(explosion, index) in getExplosions"
            :key="index"
            class="explosion-item"
          >
            <img :src="explosion.image" alt="" class="explosion-image" />
            <div class="explosion-info">
              <div class="explosion-name" :title="explosion.name">
                {{ explosion.name }}
              </div>
              <div class="explosion-description" :title="explosion.description">
                {{ explosion.description }}
              </div>
            </div>
            <div class="action-container">
              <Button
                @click="sellItem(explosion)"
                class="button-sell button-danger-v2"
              >
                Sell
              </Button>
              <Button
                @click="burnItem(explosion.tokenId)"
                class="button-burn button-warning"
              >
                Burn
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dialog sell item -->
    <Dialog
      v-if="isShowDialogSI"
      @close="closeDialogSI"
      class="dialog-sell-item"
    >
      <template slot="header">Sell item {{ itemSelected.name }}</template>
      <template slot="content">
        <Input
          label="Price"
          type="number"
          v-model="price.value"
          :isInvalid="price.isInvalid"
          :msgInvalid="price.msgInvalid"
          :min="0"
          placeholder="Enter price of item"
        />
      </template>
      <template slot="footer">
        <Button @click="closeDialogSI" class="button-secondary">Cancel</Button>
        <Button @click="confirmSell" class="button-danger-v2">Sell</Button>
      </template>
    </Dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { utils } from 'web3';
import { TypeNFT } from '@/commons/enums.js';
import toast from '@/components/mixins/toast.js';
import user from '@/components/mixins/user.js';
import loader from '@/components/mixins/loader.js';
import { burnNFT, sellNFT } from '@/web3/functions.js';

export default {
  mixins: [toast, user, loader],
  data() {
    return {
      isShowDialogSI: false,
      price: {
        value: undefined,
        isInvalid: false,
        msgInvalid: '',
      },
      itemSelected: {},
    };
  },
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
    closeDialogSI() {
      this.isShowDialogSI = false;
    },
    showDialogSI() {
      this.isShowDialogSI = true;
    },

    sellItem(item) {
      this.itemSelected = item;
      this.showDialogSI();
    },

    validatePriceValue() {
      let valid = true;
      if (this.price.value == undefined || this.price.value == '') {
        valid = false;
        this.price.isInvalid = true;
        this.price.msgInvalid = "Price can't be empty";
      } else if (this.price.value <= 0) {
        valid = false;
        this.price.isInvalid = true;
        this.price.msgInvalid = 'Price must be great than 0';
      } else {
        this.price.isInvalid = false;
      }
      return valid;
    },

    async confirmSell() {
      if (this.validatePriceValue()) {
        this.closeDialogSI();
        this.showLoading();
        try {
          await sellNFT(
            this.itemSelected.tokenId,
            this.price.value,
            this.account
          );
          await this.loadAssetAccount(this.account);
          this.itemSelected = {};
          this.price = {
            value: undefined,
            isInvalid: false,
            msgInvalid: '',
          };
          this.success('Item is on sale');
        } catch (error) {
          console.log(error);
          this.error('Something went wrong');
        }
        this.closeLoading();
      }
    },

    async burnItem(tokenId) {
      this.showLoading();
      try {
        await burnNFT(tokenId, this.account);
        await this.loadAssetAccount(this.account);
        this.success('Burn item success');
      } catch (error) {
        console.log(error);
        this.error('Something went wrong');
      }
      this.closeLoading();
    },
  },
  watch: {
    price: {
      handler() {
        this.validatePriceValue();
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
.user-account .dialog-sell-item {
  .dialog-container {
    .dialog-header {
      padding: 8px 16px;
      font-size: 20px;
    }
    .dialog-content {
      padding: 0 16px;
      .input {
        width: 100%;
      }
    }
    .dialog-footer {
      display: flex;
      margin-top: 8px;
      padding: 12px 16px;
      justify-content: right;
      .button:nth-child(1) {
        margin-right: 12px;
      }
    }
  }
}
</style>

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
          position: relative;
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
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 4px;
            background-color: rgba($color-white, 0.3);
            display: flex;
            opacity: 0;
            align-items: center;
            justify-content: center;
            transition: 0.3s;
            .button-sell {
              margin-right: 16px;
            }
          }
        }
      }
    }

    .bullet-asset {
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
      .list-bullet {
        min-width: 100%;
        width: 500px;
        overflow-x: auto;
        margin-top: 8px;
        display: flex;
        .bullet-item {
          margin-right: 16px;
          display: flex;
          align-items: center;
          padding: 16px;
          min-width: 400px;
          max-width: 400px;
          width: 400px;
          border-radius: 4px;
          background-color: $color-gray-6;
          position: relative;
          .bullet-image {
            width: 150px;
            min-width: 150px;
            max-height: 150px;
            border-radius: 4px;
          }
          .bullet-info {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: 100%;
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
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 4px;
            background-color: rgba($color-white, 0.3);
            display: flex;
            opacity: 0;
            align-items: center;
            justify-content: center;
            transition: 0.3s;
            .button-sell {
              margin-right: 16px;
            }
          }
        }
      }
    }

    .explosion-asset {
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
      .list-explosion {
        min-width: 100%;
        width: 500px;
        overflow-x: auto;
        margin-top: 8px;
        display: flex;
        .explosion-item {
          margin-right: 16px;
          display: flex;
          align-items: center;
          padding: 16px;
          min-width: 400px;
          max-width: 400px;
          width: 400px;
          border-radius: 4px;
          background-color: $color-gray-6;
          position: relative;
          .explosion-image {
            width: 150px;
            min-width: 150px;
            max-height: 150px;
            border-radius: 4px;
          }
          .explosion-info {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: 100%;
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
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 4px;
            background-color: rgba($color-white, 0.3);
            display: flex;
            opacity: 0;
            align-items: center;
            justify-content: center;
            transition: 0.3s;
            .button-sell {
              margin-right: 16px;
            }
          }
        }
      }
    }
  }
}
</style>
