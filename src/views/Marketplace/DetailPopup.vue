<template>
  <div class="detail-popup">
    <div class="popup-container">
      <img
        src="@/assets/icon/x.svg"
        @click="closePopup"
        alt=""
        class="icon-close"
      />
      <div
        class="popup-header"
        v-html="$t('marketplace.historyTransaction', [item.data.name])"
      ></div>
      <div class="popup-content">
        <img
          v-show="isLoading"
          src="@/assets/icon/spinner.gif"
          alt=""
          class="icon-loading"
        />
        <div v-show="!isLoading && data.length > 0" class="list-transaction">
          <table v-for="(item, index) in data" :key="index" class="transaction">
            <tr class="seller">
              <th>{{ $t('marketplace.seller') }}</th>
              <td>{{ item.seller }}</td>
            </tr>
            <tr class="buyer">
              <th>{{ $t('marketplace.buyer') }}</th>
              <td>{{ item.buyer }}</td>
            </tr>
            <tr class="price">
              <th>{{ $t('marketplace.price') }}</th>
              <td>{{ getPrice(item.price) }} {{ symbol }}</td>
            </tr>
          </table>
        </div>
        <div v-show="!isLoading && data.length == 0" class="list-empty">
          {{ $t('marketplace.notransactions') }}
        </div>
      </div>
      <div class="popup-footer">
        <Button class="button-secondary" @click="closePopup">{{
          $t('button.close')
        }}</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { utils } from 'web3';
import toast from '@/components/mixins/toast.js';
import { getItemHistory } from '@/web3/functions.js';

export default {
  mixins: [toast],
  props: {
    item: Object,
  },
  data() {
    return {
      data: [],
      isLoading: true,
    };
  },
  computed: {
    ...mapState({
      account: (state) => state.user.account,
      balance: (state) => state.user.balance,
      isOwner: (state) => state.user.isOwner,
      listingCost: (state) => state.app.market?.listingCost,
      symbol: (state) => state.app.token?.symbol,
    }),
  },
  async created() {
    this.isLoading = true;
    try {
      this.data = await getItemHistory(this.item.tokenId);
    } catch (error) {
      console.log(error);
      this.error();
    }
    this.isLoading = false;
  },
  methods: {
    closePopup() {
      this.$emit('close');
    },
    getPrice(price) {
      return utils.fromWei(price);
    },
  },
};
</script>

<style lang="scss">
.detail-popup {
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
      height: 300px;
      margin: 0 16px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      .list-transaction {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background-color: $color-gray-4;
        padding: 16px;
        .transaction {
          width: 100%;
          padding: 8px;
          background-color: $color-gray-3;
          border-radius: 4px;
          margin-bottom: 8px;
          &:nth-last-child(1) {
            margin-bottom: 0;
          }
          tr {
            td,
            th {
              padding: 4px 8px;
            }
            &.seller {
              color: $color-danger-3;
            }
            &.buyer {
              color: $color-success-3;
            }
            &.price {
              color: $color-warning-3;
            }
          }
        }
      }
      .list-empty {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $color-gray-4;
        font-size: 20px;
        font-style: italic;
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
