<template>
  <div class="dropdown">
    <div v-if="label" class="dropdown-label">{{ label }}</div>
    <AntDropdown :trigger="['click']">
      <div class="dropdown-control">
        <div class="current-value">
          {{ currentSelection.text }}
        </div>
        <img src="@/assets/icon/chevron-down.svg" class="icon-arrow" alt="" />
      </div>
      <Menu class="dropdown-menu" @click="handleChangeSelection" slot="overlay">
        <MenuItem v-for="(option, index) in options" :key="index">
          <div class="option">{{ option.text }}</div>
          <img
            v-if="currentSelection.value == option.value"
            src="@/assets/icon/check.svg"
            class="icon-check"
            alt=""
          />
        </MenuItem>
      </Menu>
    </AntDropdown>
  </div>
</template>

<script>
import AntDropdown from 'ant-design-vue/lib/dropdown';
import Menu from 'ant-design-vue/lib/menu';
import MenuItem from 'ant-design-vue/lib/menu/MenuItem';

export default {
  components: {
    AntDropdown,
    Menu,
    MenuItem,
  },
  props: {
    label: String,
    options: Array,
  },
  data() {
    return {
      currentSelection: undefined,
    };
  },
  methods: {
    handleChangeSelection({ key }) {
      this.currentSelection = this.options[key];
      this.$emit('change', this.currentSelection);
    },
  },
  created() {
    this.currentSelection = this.options[0];
    this.$emit('change', this.currentSelection);
  },
};
</script>

<style lang="scss">
.dropdown {
  width: 300px;
  .dropdown-label {
    margin-bottom: 4px;
  }
  .dropdown-control {
    width: 100%;
    cursor: pointer;
    padding: 0 10px;
    height: 100%;
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    border-radius: 4px;
    background-color: $color-gray-6;
    img.icon-arrow {
      width: 20px;
      height: 20px;
    }
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
  }
}

.dropdown-menu {
  // border-radius: 0 !important;
  background-color: $color-gray-6 !important;
  border-radius: 4px;
  .ant-dropdown-menu-item {
    display: flex;
    align-items: center;
    color: $color-white;
    font-family: $font-regular;
    font-size: 12px;
    &.ant-dropdown-menu-item-active {
      background-color: $color-gray-5;
    }
    .option {
      margin-left: 8px;
    }
    .icon-check {
      width: 16px;
      height: 16px;
      margin-left: auto;
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

<style lang="scss" scoped></style>
