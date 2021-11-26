<template>
  <Layout>
    <div class="admin-page">
      <h1>Admin Page</h1>

      <div class="form">
        <div class="input-group">
          <div class="input-label">Name</div>
          <Input v-model="name" />
        </div>
        <div class="input-group">
          <div class="input-label">Description</div>
          <Input v-model="description" />
        </div>
        <div class="input-group">
          <div class="input-label">Level</div>
          <input type="number" v-model="level" />
        </div>
        <div class="input-group">
          <div class="input-label">Armor</div>
          <input type="number" v-model="armor" />
        </div>
        <input type="file" @change="onChange($event)" />
        <Button @click="createNFT">Upload</Button>
      </div>
    </div>
  </Layout>
</template>

<script>
import loader from '@/components/mixins/loader';
import { mapState } from 'vuex';
import Web3 from 'web3';
import { uploadFile } from '@/commons/ipfs-services.js';
import { createNFT } from '@/web3/functions.js';

export default {
  mixins: [loader],
  data() {
    return {
      file: undefined,
      name: undefined,
      description: undefined,
      level: undefined,
      armor: undefined,
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
    async createNFT() {
      this.showLoading();
      try {
        const image = await uploadFile(this.file);

        const data = {
          name: this.name,
          description: this.description,
          level: this.level,
          armor: this.armor,
          image,
        };

        console.log(data);
        console.log(this.account);

        await createNFT(JSON.stringify(data), this.account);
      } catch (error) {
        console.log(error);
      }
      this.closeLoading();
    },
  },
};
</script>

<style></style>
