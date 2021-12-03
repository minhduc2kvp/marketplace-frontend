<template>
  <div class="sell-popup" @keydown.esc="$emit('close')">
    <div class="popup-container">
      <img
        src="@/assets/icon/x-black.svg"
        @click="$emit('close')"
        alt=""
        class="icon-close"
      />
      <div class="popup-header">Sell item <span>Tank#001</span></div>
      <div class="popup-content">
        <a-steps :current="current">
          <a-step v-for="item in steps" :key="item.title" :title="item.title" />
        </a-steps>
        <div class="steps-content">
          <div v-if="current == 0" class="step-1">
            <img src="@/assets/icon/coin.png" alt="" class="icon-coin" />
            <div class="text-content">
              <div class="notice-text">
                You need to pay fee to list item on market
              </div>
              <div class="fee-value">Fee <span>17 TANK</span></div>
              <Button>Pay</Button>
            </div>
          </div>
          <div v-if="current == 1" class="step-2">Step 2</div>
          <div v-if="current == 2" class="step-3">
            <Input
              label="Price"
              type="number"
              v-model="price.value"
              :isInvalid="price.isInvalid"
              :msgInvalid="price.msgInvalid"
              :min="0"
              placeholder="Enter price of item"
            />
          </div>
          <div v-if="current == 3" class="step-4">Step 4</div>
        </div>
        <div class="steps-action">
          <a-button
            v-if="current < steps.length - 1"
            type="primary"
            @click="next"
          >
            Next
          </a-button>
          <a-button
            v-if="current == steps.length - 1"
            type="primary"
            @click="$message.success('Processing complete!')"
          >
            Done
          </a-button>
          <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
            Previous
          </a-button>
        </div>
      </div>
      <div class="popup-footer">
        <slot name="footer"></slot>
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
        background-color: $color-gray-1;
      }
      z-index: 1;
    }
    .popup-header {
      margin-top: -32px;
      padding: 16px;
      font-size: 20px;
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
            .notice-text {
              font-size: 24px;
              color: $color-warning-4;
              text-decoration: underline;
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
      }
    }
    .popup-footer {
      padding: 16px;
      margin-top: auto;
    }
  }
}
</style>
