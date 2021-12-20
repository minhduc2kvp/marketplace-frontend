<template>
  <div class="popup" v-if="isShowPopup">
    <div class="popup-container">
      <img
        src="@/assets/icon/x.svg"
        alt=""
        class="icon-close"
        @click="$emit('close')"
      />
      <div class="popup-content">
        <img
          :src="require(`@/assets/icon/popup-${type}.png`)"
          alt=""
          class="icon"
        />
        <div class="message">{{ message }}</div>
      </div>
      <div class="popup-footer">
        <Button
          @click="button.function"
          :class="button.class"
          v-for="(button, index) in buttons"
          :key="index"
          >{{ button.text }}</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShowPopup: Boolean,
    type: String,
    message: String,
    buttons: [],
  },
};
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color-white, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  .popup-container {
    width: 600px;
    background-color: $color-gray-3;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    position: relative;

    .icon-close {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
      width: 32px;
      height: 32px;
      padding: 4px;
      border-radius: 0 8px 0 8px;
      &:hover {
        background-color: $color-gray-2;
      }
    }
    .popup-content {
      padding: 0 24px;
      flex-grow: 1;
      display: flex;
      min-height: 200px;
      align-items: center;
      .icon {
        width: 128px;
        height: 128px;
        margin-right: 24px;
      }
      .message {
        font-size: 24px;
      }
    }
    .popup-footer {
      padding: 8px 16px;
      border-top: 1px solid $color-gray-2;
      display: flex;
      justify-content: end;
      .button {
        margin-left: 8px;
      }
    }
  }
}
</style>
