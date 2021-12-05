<template>
  <div class="buy-popup" @keydown.esc="$emit('close')">
    <div class="popup-container">
      <img
        src="@/assets/icon/x.svg"
        @click="closePopup"
        alt=""
        class="icon-close"
      />
      <div class="popup-header">
        Buy item <span>{{ item.data.name }}</span>
      </div>
      <div class="popup-content">
        <a-steps :current="current">
          <a-step v-for="step in steps" :key="step.title" :title="step.title" />
        </a-steps>
        <div class="steps-content">
          <div v-if="current == 0" class="step-1">
            <img src="@/assets/icon/coin.png" alt="" class="icon-coin" />
            <div class="text-content">
              <div class="notice">
                <img
                  src="@/assets/icon/passport.png"
                  alt=""
                  class="notice-icon"
                />
                <div class="notice-text">
                  Approve market to tranfer to seller
                </div>
              </div>
              <div class="price-value">
                Price <span>{{ getPrice }} {{ symbol }}</span>
              </div>
              <Button class="button-warning" @click="approve">Approve</Button>
            </div>
          </div>

          <div v-if="current == 1" class="step-2">
            <img :src="item.data.image" alt="" class="item-image" />
            <div class="content">
              <div class="notice">
                <img
                  src="@/assets/icon/confirmation.png"
                  alt=""
                  class="notice-icon"
                />
                <div class="notice-text">
                  Buy <span class="item-name">{{ item.data.name }}</span> with
                  price
                  <span class="price-item">{{ getPrice }} {{ symbol }}</span>
                </div>
              </div>
              <Button @click="confirmBuy">Confirm</Button>
            </div>
          </div>
        </div>
      </div>
      <div class="popup-footer">
        <Button class="button-secondary" @click="closePopup">Close</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { utils } from 'web3';
import toast from '@/components/mixins/toast.js';
import loader from '@/components/mixins/loader.js';
import { approveToken, buyNFT } from '@/web3/functions.js';

export default {
  mixins: [toast, loader],
  props: {
    item: Object,
  },
  computed: {
    ...mapState({
      account: (state) => state.user.account,
      balance: (state) => state.user.balance,
      isOwner: (state) => state.user.isOwner,
      symbol: (state) => state.app.token?.symbol,
    }),
    getPrice() {
      if (this.item.price) {
        return utils.fromWei(this.item.price);
      }
      return 0;
    },
  },
  data() {
    return {
      current: 0,
      steps: [
        {
          title: 'Approve transfer token',
        },
        {
          title: 'Confirm buy item',
        },
      ],
    };
  },
  methods: {
    next() {
      this.current++;
    },
    back() {
      this.current--;
    },
    closePopup() {
      this.$emit('close');
    },

    /**
     * Approve market transfer token to seller
     */
    async approve() {
      this.showLoading();
      try {
        await approveToken(this.item.price, this.account);
        this.next();
        this.success('Approve transfer token success');
      } catch (error) {
        console.log(error);
        this.error('Approve transfer token failed');
      }
      this.closeLoading();
    },

    /**
     * Buy item
     */
    async confirmBuy() {
      this.showLoading();
      try {
        await buyNFT(this.item.itemId, this.account);
        this.$emit('success');
      } catch (error) {
        console.log(error);
        this.error('Buy item fail');
        this.closeLoading();
      }
    },
  },
};
</script>

<style lang="scss">
.buy-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color-gray-3, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  .popup-container {
    color: $color-white;
    min-width: 400px;
    background-color: $color-gray-5;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .icon-close {
      width: 32px;
      padding: 4px;
      border-bottom-left-radius: 8px;
      margin-left: auto;
      cursor: pointer;
      &:hover {
        background-color: $color-gray-2;
      }
      z-index: 1;
    }
    .popup-header {
      margin-top: -32px;
      padding: 16px;
      font-size: 20px;
      span {
        font-family: $font-bold;
      }
    }
    .popup-content {
      width: 800px;
      margin: 0 16px;
      border-radius: 4px;
      .ant-steps {
        width: 500px;
        margin: auto;
        .ant-steps-item {
          &.ant-steps-item-process {
            .ant-steps-item-container {
              .ant-steps-item-icon {
              }
              .ant-steps-item-content {
                .ant-steps-item-title {
                  color: $color-primary-4;
                  &::after {
                    background-color: $color-primary-4;
                  }
                }
              }
            }
          }

          &.ant-steps-item-finish {
            .ant-steps-item-container {
              .ant-steps-item-icon {
                background-color: $color-success-4;
                border-color: $color-success-4;
                .ant-steps-icon {
                  color: $color-white;
                }
              }
              .ant-steps-item-content {
                .ant-steps-item-title {
                  color: $color-success-4;
                  &::after {
                    background-color: $color-success-4;
                  }
                }
              }
            }
          }

          &.ant-steps-item-wait {
            .ant-steps-item-container {
              .ant-steps-item-icon {
                background-color: transparent;
                border-color: $color-white;
                .ant-steps-icon {
                  color: $color-white;
                }
              }
              .ant-steps-item-content {
                .ant-steps-item-title {
                  color: $color-white;
                }
              }
            }
          }
        }
      }
      .steps-content {
        color: $color-white;
        height: 300px;
        display: flex;
        align-items: center;
        background-color: $color-gray-4;
        // background-color: rgba($color-gray-1, 0.1);
        border-radius: 8px;
        margin-top: 16px;
        .step-1 {
          display: flex;
          .icon-coin {
            width: 192px;
            margin: 0 32px;
          }
          .text-content {
            min-height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .notice {
              display: flex;
              align-items: center;
              .notice-icon {
                width: 40px;
                height: 40px;
                margin-right: 16px;
              }
              .notice-text {
                font-size: 24px;
                color: $color-white;
              }
            }
            .price-value {
              font-size: 32px;
              margin-left: 32px;
              color: $color-gray-2;
              span {
                color: $color-warning-4;
              }
            }
          }
        }
        .step-2 {
          display: flex;
          .item-image {
            width: 192px;
            margin: 0 32px;
          }
          .content {
            display: flex;
            flex-direction: column;
            .notice {
              display: flex;
              align-items: center;
              .notice-icon {
                width: 64px;
                margin-right: 32px;
              }
              .notice-text {
                font-size: 24px;
                color: $color-white;
                padding-right: 32px;
                span {
                  font-family: $font-bold;
                  color: $color-success-4;
                }
                span.price-item {
                  color: $color-warning-4;
                }
              }
            }
            .button {
              margin-top: auto;
            }
          }
        }
      }
    }
    .popup-footer {
      padding: 16px;
      margin-top: auto;
      .button {
        margin-left: auto;
      }
    }
  }
}
</style>
