<template>
  <div class="textarea">
    <div v-if="label" class="textarea-label">{{ label }}</div>
    <div class="textarea-container">
      <textarea @input="input" :placeholder="placeholder" v-model="content" />
    </div>
    <div v-if="isInvalid && msgInvalid" class="textarea-message">
      <img src="@/assets/icon/alert-circle.svg" alt="" class="icon-invalid" />
      <div class="text-message">{{ msgInvalid }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: undefined,
    placeholder: String,
    msgInvalid: String,
    label: String,
    isInvalid: {
      type: Boolean,
      default: false,
    },
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

<style lang="scss" scoped>
.textarea {
  width: 300px;
  font-size: 14px;
  font-family: $font-regular;
  .textarea-label {
    margin-bottom: 4px;
  }
  .textarea-container {
    width: 100%;
    height: 100px;
    background-color: $color-gray-4;
    border-radius: 4px;
    padding: 4px 8px;
    textarea {
      width: 100%;
      height: 100% !important;
      border: none;
      background-color: transparent;
      resize: none;
      &:focus {
        border: none;
        outline: none;
      }
    }
  }
  .textarea-message {
    margin-top: 4px;
    font-size: 12px;
    color: $color-danger-4;
    display: flex;
    align-items: center;
    .icon-invalid {
      width: 16px;
      margin-right: 4px;
    }
  }
}
</style>
