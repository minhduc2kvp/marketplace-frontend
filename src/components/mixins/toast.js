const toastOptions = { duration: 5000 };

const toast = {
  methods: {
    success(message) {
      this.$toast.success(message, toastOptions);
    },
    warning(message) {
      this.$toast.warning(message, toastOptions);
    },
    error(message = 'Something went wrong') {
      this.$toast.error(message, toastOptions);
    },
  },
};

export default toast;
