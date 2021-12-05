<template>
  <Layout>
    <div class="user-profile">
      <div class="sidebar">
        <div class="bar-content">
          <router-link
            v-for="(item, index) in subRoutes"
            :key="index"
            class="bar-item"
            :to="item.path"
          >
            <img :src="item.icon" alt="" class="item-icon" />
            <div class="item-text">{{ item.text }}</div>
          </router-link>
        </div>
        <div class="bar-footer">
          <router-link v-if="isOwner" class="admin-link" to="/admin">
            <img src="@/assets/icon/admin.png" alt="" class="item-icon" />
            <div class="item-text">Admin</div>
          </router-link>
          <Button @click="handleLogout" class="button-danger">
            <img src="@/assets/icon/logout.png" alt="" class="icon-button" />
            <div class="text-button">Logout</div>
          </Button>
        </div>
      </div>
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
  </Layout>
</template>

<script>
import { mapState } from 'vuex';
import { utils } from 'web3';
import { TypeNFT } from '@/commons/enums.js';
import user from '@/components/mixins/user.js';

export default {
  mixins: [user],
  data() {
    return {
      subRoutes: [
        {
          path: 'account',
          text: 'Account',
          icon: require('@/assets/icon/card.png'),
        },
        {
          path: 'history',
          text: 'History',
          icon: require('@/assets/icon/history.png'),
        },
      ],
    };
  },
  computed: {
    ...mapState({
      account: (state) => state.user.account,
      balance: (state) => state.user.balance,
      nfts: (state) => state.user.nfts,
      isOwner: (state) => state.user.isOwner,
      tokenSymbol: (state) => state.app.token?.symbol,
    }),
    getBalance() {
      return this.balance ? utils.fromWei(this.balance) : 0;
    },
    getAmountTank() {
      return this.nfts.filter((nft) => nft.type == TypeNFT.Tank).length;
    },
    getAmountBullet() {
      return this.nfts.filter((nft) => nft.type == TypeNFT.Bullet).length;
    },
    getAmountExposion() {
      return this.nfts.filter((nft) => nft.type == TypeNFT.Exposion).length;
    },
  },
  methods: {
    handleLogout() {
      this.logout();
      // redirect to dashboard
      this.$router.replace('/dashboard');
    },
  },
};
</script>

<style lang="scss" scoped>
.user-profile {
  width: 100%;
  height: 100%;
  display: flex;
  .sidebar {
    min-width: 200px;
    width: 200px;
    height: 100%;
    background-color: $color-gray-4;
    padding: 10px;
    display: flex;
    flex-direction: column;
    .bar-content {
      width: 100%;
      flex-grow: 1;
      .bar-item {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        padding: 0 16px;
        border-radius: 4px;
        margin: 5px 0;
        &:hover {
          background-color: $color-gray-3;
        }
        &.active {
          background-color: $color-gray-3;
        }
        .item-icon {
          height: 28px;
        }
        .item-text {
          color: $color-white;
          margin-left: 12px;
          font-size: 16px;
        }
      }
    }
    .bar-footer {
      .admin-link {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 16px;
        border-radius: 4px;
        margin: 5px 0;
        background-color: $color-primary-4;
        &:hover {
          background-color: $color-primary-3;
        }
        .item-icon {
          height: 28px;
        }
        .item-text {
          color: $color-white;
          margin-left: 12px;
          font-size: 16px;
        }
      }
      .button {
        width: 100%;
        .icon-button {
          height: 30px;
          margin-right: 8px;
        }
      }
    }
  }
  .main-content {
    flex-grow: 1;
    height: 100%;
  }
}
</style>
