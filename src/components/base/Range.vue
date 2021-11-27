<template>
  <div class="range">
    <div v-if="label" class="input-label">{{ label }}</div>
    <div class="input-container">
      <input
        class="slider"
        @input="input"
        v-model="content"
        type="range"
        :min="min"
        :max="max"
      />
      <div class="input-value">{{ content }}</div>
    </div>
    <div v-if="isInvalid && msgInvalid" class="input-message">
      <img src="@/assets/icon/alert-circle.svg" alt="" class="icon-invalid" />
      <div class="text-message">{{ msgInvalid }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: undefined,
    min: Number,
    max: Number,
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
  created() {
    this.content = this.min;
    this.$emit('input', this.content);
  },
};
</script>

<style lang="scss" scoped>
.range {
  width: 300px;
  .input-label {
    margin-bottom: 4px;
  }
  .input-container {
    width: 100%;
    .slider {
      width: 100%;
      height: 100%;
      background-color: transparent;
    }
    .input-value {
      text-align: center;
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
}
</style>
