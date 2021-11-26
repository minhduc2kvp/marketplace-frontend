const key = {
  language: 'language',
  user: 'user',
  owner: 'owner',
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

  setOwner(value) {
    localStorage.setItem(key.owner, value);
  },
  getOwner() {
    return localStorage.getItem(key.owner);
  },

  logout() {
    localStorage.removeItem(key.user);
  },
};
