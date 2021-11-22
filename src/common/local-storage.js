const key = {
  language: 'language',
};

export default {
  setLanguage(value) {
    localStorage.setItem(key.language, value);
  },
  getLanguage() {
    return localStorage.getItem(key.language);
  },
};
