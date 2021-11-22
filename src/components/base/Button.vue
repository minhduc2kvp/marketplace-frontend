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
  height: 40px;
  width: max-content;
  padding: 4px 16px;
  border-radius: 4px;
  background-color: $color-primary-4;
  cursor: pointer;
  color: $color-white;
  font-family: $font-regular;
  font-size: 14px;
  &:hover {
    background-color: $color-primary-3;
  }
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}
</style>
