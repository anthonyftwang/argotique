const path = require('path');

module.exports = {
  components: 'src/components/**/[A-Z]*.{js,jsx}',
  styleguideDir: 'docs',
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/MuiThemeWrapper'),
  },
};
