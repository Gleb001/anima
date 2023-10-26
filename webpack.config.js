// imports ===================================================== //
const path = require('path');

// main ======================================================== //
module.exports = {
  mode: "production",
  entry: {
    main: "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: "index.min.js",
    library: {
      type: "module",
    },
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ]
  },
  experiments: {
    outputModule: true,
  },
};