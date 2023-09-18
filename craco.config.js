// const pxToViewport = require("postcss-px-to-viewport");
const path = require("path");

// const vw = pxToViewport({
//   // 视口宽度，一般就是 375（ 设计稿一般采用二倍稿，宽度为 375 ）
//   viewportWidth: 375,
//   selectorBlackList: ["html"], // (Array) 指定不转换为视窗单位的类，可以自定义
// });

module.exports = {
  // 此处省略 webpack 配置
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  }, // 这里补充style配置
  // style: {
  //   postcss: {
  //     mode: "extends",
  //     loaderOptions: {
  //       postcssOptions: {
  //         ident: "postcss",
  //         plugins: [vw],
  //       },
  //     },
  //   },
  // },
};
