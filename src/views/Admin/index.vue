<template>
  <Layout>
    <div class="admin-page">
      <div class="sidebar">
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
      <div class="main-content">
        <router-view @formSubmit="createNFT"></router-view>
      </div>
    </div>
  </Layout>
</template>

<script>
import loader from '@/components/mixins/loader';
import toast from '@/components/mixins/toast';
import { mapState } from 'vuex';
import Web3 from 'web3';
import { uploadFile } from '@/commons/ipfs-services.js';
import { createNFT } from '@/web3/functions.js';

export default {
  mixins: [loader, toast],
  data() {
    return {
      file: undefined,
      name: undefined,
      description: undefined,
      level: undefined,
      armor: undefined,
      subRoutes: [
        {
          path: 'tank',
          text: 'Tank',
          icon: require('@/assets/icon/tank.png'),
        },
        {
          path: 'bullet',
          text: 'Bullet',
          icon: require('@/assets/icon/bullet.png'),
        },
        {
          path: 'explosion',
          text: 'Explosion',
          icon: require('@/assets/icon/explosion.png'),
        },
      ],
    };
  },
  computed: {
    ...mapState({
      account: (state) => state.user.account,
      contracts: (state) => state.app.contracts,
    }),
  },
  methods: {
    onChange(event) {
      this.file = event.target.files[0];
    },
    async createNFT(data) {
      this.showLoading();
      try {
        data.image = await uploadFile(data.image);
        await createNFT(JSON.stringify(data), this.account);
        this.success('Create item successfull');
      } catch (error) {
        this.error('Create item failed');
        console.log(error);
      }
      this.closeLoading();
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-page {
  width: 100%;
  height: 100%;
  display: flex;
  .sidebar {
    min-width: 200px;
    width: 200px;
    height: 100%;
    background-color: $color-gray-4;
    padding: 10px;
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
  .main-content {
    flex-grow: 1;
    height: 100%;
  }
}
</style>
