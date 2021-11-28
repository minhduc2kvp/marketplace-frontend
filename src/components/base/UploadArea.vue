<template>
  <div class="upload-area">
    <div v-if="label" class="upload-label">{{ label }}</div>
    <div
      class="upload-container"
      :class="{ invalid: isInvalid }"
      @click="selectFile"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        @change="changeFile($event)"
      />
      <img
        v-if="!file"
        src="@/assets/icon/upload.png"
        alt=""
        class="icon-upload"
      />
      <img v-if="file" ref="imageUpload" src="" alt="" class="image-upload" />
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
    label: String,
    isInvalid: {
      type: Boolean,
      default: false,
    },
    msgInvalid: String,
  },
  data() {
    return {
      file: undefined,
    };
  },
  methods: {
    selectFile() {
      this.$refs.fileInput.click();
    },
    changeFile(event) {
      const self = this;
      const file = event.target.files[0];
      self.file = file;
      self.$emit('change', file);
      const reader = new FileReader();
      reader.onload = function (e) {
        self.$refs.imageUpload.src = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-area {
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  .upload-label {
    margin-bottom: 4px;
  }
  .upload-container {
    width: 100%;
    flex-grow: 1;
    cursor: pointer;
    border-radius: 8px;
    border: 2px dashed $color-gray-1;
    background-color: $color-gray-4;
    display: flex;
    align-items: center;
    justify-content: center;
    &.invalid {
      border-color: $color-danger-4;
    }
    input {
      display: none;
    }
    .icon-upload {
      opacity: 0.9;
    }
    .image-upload {
      width: 90%;
      // max-width: 90%;
      max-height: 90%;
    }
    &:hover {
      border-color: $color-gray-2;
      .icon-upload {
        opacity: 0.7;
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
}
</style>
