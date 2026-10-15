// Owner: Haroldo Paulino
const path = require('path');

module.exports = {
  project: {
    android: {
      sourceDir: path.join(__dirname, 'android'),
      appName: 'app',
      packageName: 'com.audivix',
    },
    ios: {
      sourceDir: path.join(__dirname, 'ios'),
    },
  },
};
