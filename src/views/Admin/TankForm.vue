<template>
  <div class="tank-form">
    <div class="form-container">
      <div class="form-title">Create tank item</div>
      <div class="form-content">
        <div class="col-content">
          <Input
            v-model="name.value"
            :isInvalid="name.isInvalid"
            :msgInvalid="name.msgInvalid"
            label="Name"
            placeholder="Enter name"
          />
          <TextArea
            v-model="description.value"
            :isInvalid="description.isInvalid"
            :msgInvalid="description.msgInvalid"
            label="Description"
            placeholder="Enter description"
          />
        </div>
        <div class="col-content">
          <Dropdown
            label="Level"
            :options="levelOptions"
            @change="levelChange"
          />
          <Range label="Armor" v-model="armor" :min="1" :max="1000" />
        </div>
        <div class="col-content">
          <UploadArea
            :isInvalid="image.isInvalid"
            :msgInvalid="image.msgInvalid"
            @change="imageChange"
            label="Image"
          />
        </div>
      </div>
      <div class="form-footer">
        <Button @click="submitForm">Create item</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { TypeNFT, TankLevel } from '@/commons/enums.js';

export default {
  data() {
    return {
      TypeNFT,
      TankLevel,
      name: {
        value: undefined,
        isInvalid: false,
        msgInvalid: '',
      },
      description: {
        value: undefined,
        isInvalid: false,
        msgInvalid: '',
      },
      level: undefined,
      armor: undefined,
      image: {
        value: undefined,
        isInvalid: false,
        msgInvalid: '',
      },
    };
  },
  computed: {
    levelOptions() {
      const options = [];
      for (const key in this.TankLevel) {
        options.push({
          text: key,
          value: this.TankLevel[key],
        });
      }
      return options;
    },
  },
  methods: {
    levelChange(item) {
      this.level = item.value;
    },
    imageChange(image) {
      this.image.value = image;
      this.image.isInvalid = false;
    },
    submitForm() {
      let formInvalid = true;

      // validate name
      if (!this.name.value) {
        this.name.isInvalid = true;
        this.name.msgInvalid = "Name can't be empty";
        formInvalid = false;
      } else {
        this.name.isInvalid = false;
      }

      // validate description
      if (!this.description.value) {
        this.description.isInvalid = true;
        this.description.msgInvalid = "Description can't be empty";
        formInvalid = false;
      } else {
        this.description.isInvalid = false;
      }

      // validate image
      if (!this.image.value) {
        this.image.isInvalid = true;
        this.image.msgInvalid = "Image can't be empty";
        formInvalid = false;
      } else {
        this.image.isInvalid = false;
      }

      if (formInvalid) {
        const data = {
          name: this.name.value,
          description: this.description.value,
          type: TypeNFT.Tank,
          image: this.image.value,
          properties: {
            level: this.level,
            armor: parseInt(this.armor),
          },
        };
        this.$emit('formSubmit', data);
      }
    },
  },
  watch: {
    name: {
      handler() {
        if (!this.name.value) {
          this.name.isInvalid = true;
          this.name.msgInvalid = "Name can't be empty";
        } else {
          this.name.isInvalid = false;
        }
      },
      deep: true,
    },
    description: {
      handler() {
        if (!this.description.value) {
          this.description.isInvalid = true;
          this.description.msgInvalid = "Description can't be empty";
        } else {
          this.description.isInvalid = false;
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.tank-form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 24px;
  .form-container {
    flex-grow: 1;
    width: 100%;
    border-radius: 8px;
    background-color: $color-gray-3;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.3);
    padding: 16px 24px;
    display: flex;
    flex-direction: column;
    .form-title {
      text-align: left;
      font-size: 16px;
    }
    .form-content {
      margin-top: 12px;
      flex-grow: 1;
      width: 100%;
      display: flex;
      justify-content: space-between;
      .col-content {
        width: 30%;
        .input,
        .textarea,
        .dropdown,
        .range,
        .upload-area {
          width: 100%;
        }
        .textarea,
        .range {
          margin-top: 16px;
        }
      }
    }
    .form-footer {
      .button {
        // margin-left: auto;
      }
    }
  }
}
</style>
