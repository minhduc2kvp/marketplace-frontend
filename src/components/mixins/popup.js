const popup = {
  data() {
    return {
      isShowPopup: false,
      type: '',
      message: '',
      buttons: [],
    };
  },
  methods: {
    /**
     * Setup and Show popup
     * @param {String} type ['info', 'success', 'warning', 'danger']
     * @param {String} message
     * @param {Array} buttons
     */
    showPopup(type, message, buttons) {
      this.type = type;
      this.message = message;
      this.buttons = buttons;
      this.isShowPopup = true;
    },
    closePopup() {
      this.isShowPopup = false;
    },
  },
};

export default popup;
