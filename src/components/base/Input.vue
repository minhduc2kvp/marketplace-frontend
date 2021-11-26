<template>
  <div class="input">
    <input @input="input" v-model="content" type="text" />
  </div>
</template>

<script>
export default {
  props: {
    value: undefined,
  },
  data() {
    return {
      content: '',
    };
  },
  methods: {
    input() {
      this.$emit('input', this.content);
    },
  },
  watch: {
    value: function () {
      this.content = this.value;
    },
  },
};
</script>

<style></style>
