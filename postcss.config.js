const variables = require("./vars.config");

module.exports = {
  plugins: [
    require("postcss-simple-vars")({ variables }),
    require("autoprefixer"),
    require("postcss-nested"),
  ],
};
