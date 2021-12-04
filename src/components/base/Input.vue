<template>
  <div class="input">
    <div v-if="label" class="input-label">{{ label }}</div>
    <div class="input-container">
      <input
        @input="input"
        :placeholder="placeholder"
        v-model="content"
        :min="min"
        :max="max"
        :type="type"
      />
    </div>
    <div v-if="isInvalid && msgInvalid" class="input-message">
      <img
        src="@/assets/icon/alert-circle-danger.svg"
        alt=""
        class="icon-invalid"
      />
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
    min: Number,
    max: Number,
    type: {
      type: String,
      default: 'text',
    },
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
  created() {
    if (this.value) {
      this.content = this.value;
    }
  },
};
</script>

<style lang="scss" scoped>
.input {
  width: 300px;
  font-size: 14px;
  font-family: $font-regular;
  .input-label {
    margin-bottom: 4px;
  }
  .input-container {
    width: 100%;
    height: 40px;
    background-color: $color-gray-4;
    border-radius: 4px;
    padding: 0 8px;
    input {
      width: 100%;
      height: 100%;
      border: none;
      background-color: transparent;
      &:focus {
        border: none;
        outline: none;
      }
    }
  }
  .input-message {
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

  &.input-secondary {
    .input-container {
      background-color: $color-gray-3;
    }
  }
}
</style>
