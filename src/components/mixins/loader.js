import { mapActions } from 'vuex';

const loader = {
  methods: {
    ...mapActions('app', ['showLoading', 'closeLoading']),
  },
};

export default loader;
