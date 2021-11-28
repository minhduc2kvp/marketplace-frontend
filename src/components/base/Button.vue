<template>
  <div class="button" @click="$emit('click')">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.button {
  min-width: 100px;
  height: 40px;
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border-radius: 4px;
  background-color: $color-primary-4;
  cursor: pointer;
  color: $color-white;
  font-family: $font-regular;
  font-size: 14px;
  &:hover {
    background-color: $color-primary-3;
  }

  // button danger
  &.button-danger {
    background-color: $color-gray-6;
    color: $color-danger-3;
    &:hover {
      background-color: $color-black;
    }
  }

  // button danger v2
  &.button-danger-v2 {
    background-color: $color-danger-4;
    color: $color-white;
    &:hover {
      background-color: $color-danger-3;
    }
  }

  // button warning
  &.button-warning {
    background-color: $color-warning-4;
    color: $color-white;
    &:hover {
      background-color: $color-warning-3;
    }
  }

  // button secondary
  &.button-secondary {
    background-color: $color-gray-3;
    color: $color-white;
    &:hover {
      background-color: $color-gray-2;
    }
  }

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}
</style>
