import Vue from 'vue';
import VueI18n from 'vue-i18n';
import vi from './vi';
import en from './en';

Vue.use(VueI18n);

const messages = {
  vi,
  en,
};

const i18n = new VueI18n({
  globalInjection: true,
  fallbackLocale: 'en',
  messages: messages,
});

export default i18n;
