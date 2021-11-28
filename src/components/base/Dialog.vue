<template>
  <div class="dialog" @keydown.esc="$emit('close')">
    <div class="dialog-container">
      <img
        src="@/assets/icon/x.svg"
        @click="$emit('close')"
        alt=""
        class="icon-close"
      />
      <div class="dialog-header">
        <slot name="header"></slot>
      </div>
      <div class="dialog-content">
        <slot name="content"></slot>
      </div>
      <div class="dialog-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.dialog {
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
  .dialog-container {
    min-width: 400px;
    background-color: $color-gray-3;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    .icon-close {
      width: 28px;
      padding: 4px;
      border-radius: 0 8px 0 8px;
      margin-left: auto;
      cursor: pointer;
      &:hover {
        background-color: $color-gray-2;
      }
      z-index: 1;
    }
    .dialog-header {
      margin-top: -28px;
    }
    .dialog-footer {
      margin-top: auto;
    }
  }
}
</style>
