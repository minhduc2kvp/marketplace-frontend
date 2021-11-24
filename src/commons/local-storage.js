const key = {
  language: 'language',
  user: 'user',
};

export default {
  setLanguage(value) {
    localStorage.setItem(key.language, value);
  },
  getLanguage() {
    return localStorage.getItem(key.language);
  },

  setUser(value) {
    localStorage.setItem(key.user, value);
  },
  getUser() {
    return localStorage.getItem(key.user);
  },
  logout() {
    localStorage.removeItem(key.user);
  },
};
