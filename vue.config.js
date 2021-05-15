const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    open: true,
    host: `test${process.env.VUE_APP_DOMAIN}`,
  },
  chainWebpack: (config) => {
    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/plugins/icons/svg"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/plugins/icons/svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
};
