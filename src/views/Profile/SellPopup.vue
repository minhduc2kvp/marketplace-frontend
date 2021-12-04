<template>
  <div class="sell-popup" @keydown.esc="$emit('close')">
    <div class="popup-container">
      <img
        src="@/assets/icon/x-black.svg"
        @click="$emit('close')"
        alt=""
        class="icon-close"
      />
      <div class="popup-header">
        On sell item <span>{{ item.name }}</span>
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
                  src="@/assets/icon/information.png"
                  alt=""
                  class="notice-icon"
                />
                <div class="notice-text">Pay fee to list item on market</div>
              </div>
              <div class="fee-value">Fee <span>17 TANK</span></div>
              <Button>Pay</Button>
            </div>
          </div>
          <div v-if="current == 1" class="step-2">
            <img :src="item.image" alt="" class="item-image" />
            <div class="content">
              <div class="notice">
                <img
                  src="@/assets/icon/passport.png"
                  alt=""
                  class="notice-icon"
                />
                <div class="notice-text">
                  Approve market to tranfer <span>{{ item.name }}</span> on
                  market
                </div>
              </div>
              <Button class="button-warning">Approve</Button>
            </div>
          </div>
          <div v-if="current == 2" class="step-3">
            <img src="@/assets/icon/tag.png" alt="" class="icon-price" />
            <div class="content">
              <div class="content-title">
                <img src="@/assets/icon/salary.png" alt="" class="title-icon" />
                <div class="title-text">Set price of item</div>
              </div>
              <div class="input-group">
                <Input
                  type="number"
                  v-model="price.value"
                  :isInvalid="price.isInvalid"
                  :msgInvalid="price.msgInvalid"
                  :min="0"
                  placeholder="Enter price of item"
                  class="input-secondary"
                />
                <div class="symboy">TANK</div>
              </div>
              <Button>Next</Button>
            </div>
          </div>
          <div v-if="current == 3" class="step-4">
            <img
              src="@/assets/icon/marketplace.png"
              alt=""
              class="icon-marketplace"
            />
            <div class="content">
              <div class="content-title">
                Sell item <span class="item-name">{{ item.name }}</span> for
                <span class="item-price">{{ price.value }} TANK</span>
              </div>
              <div class="action-group">
                <Button class="button-secondary">Back</Button>
                <Button>Confirm</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="popup-footer">
        <Button class="button-secondary">Close</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    item: Object,
  },
  data() {
    return {
      current: 0,
      steps: [
        {
          title: 'Pay fee',
        },
        {
          title: 'Approve NFT',
        },
        {
          title: 'Price',
        },
        {
          title: 'On Sell',
        },
      ],
      price: {
        value: undefined,
        isInvalid: false,
        msgInvalid: '',
      },
    };
  },
  methods: {
    next() {
      this.current++;
    },
    prev() {
      this.current--;
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
.sell-popup {
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
    color: $color-black;
    min-width: 400px;
    background-color: $color-white;
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
        background-color: rgba($color-gray-1, 0.5);
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
      background-color: $color-white;
      border-radius: 4px;
      .ant-steps {
        .ant-steps-item {
          .ant-steps-item-container {
          }
        }
      }
      .steps-content {
        color: $color-black;
        height: 300px;
        display: flex;
        align-items: center;
        background-color: rgba($color-gray-1, 0.1);
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
                width: 32px;
                height: 32px;
                margin-right: 16px;
              }
              .notice-text {
                font-size: 24px;
                color: $color-primary-4;
              }
            }
            .fee-value {
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
                color: $color-warning-4;
                padding-right: 32px;
                span {
                  font-family: $font-bold;
                }
              }
            }
            .button {
              margin-top: auto;
            }
          }
        }
        .step-3 {
          display: flex;
          .icon-price {
            width: 192px;
            margin: 0 32px;
          }
          .content {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .content-title {
              display: flex;
              align-items: center;
              .title-icon {
                width: 36px;
                margin-right: 16px;
              }
              .title-text {
                color: $color-primary-4;
                font-size: 24px;
              }
            }
            .input-group {
              display: flex;
              align-items: center;
              .symboy {
                margin-left: 16px;
                font-size: 32px;
                color: $color-warning-4;
              }
            }
          }
        }
        .step-4 {
          display: flex;
          .icon-marketplace {
            width: 192px;
            margin: 0 32px;
          }
          .content {
            display: flex;
            flex-direction: column;
            .content-title {
              font-size: 42px;
              color: $color-primary-4;
              .item-name {
                font-family: $font-bold;
              }
              .item-price {
                color: $color-warning-4;
              }
            }
            .action-group {
              margin-top: auto;
              display: flex;
              align-items: center;
              .button-secondary {
                margin-right: 16px;
              }
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
