const path = require("path");
const webpack = require("webpack");
const exec = require("child_process").exec;

module.exports = () => {
  const externals = {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"
    }
  };

  externals["react-native"] = {
    commonjs: "react-native",
    commonjs2: "react-native",
    amd: "react-native",
    root: "react-native"
  };

  return {
    mode: "development",
    devtool: "source-map",
    watch: true,
    entry: "./module.js",
    output: {
      filename: `bundle.js`,
      path: path.resolve(__dirname, "dist"),
      library: "Module",
      libraryTarget: "umd"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            { loader: "babel-loader" },
          ]
        }
      ]
    },
    resolve: {
      alias: {
        react: path.resolve(__dirname, "./node_modules/react"),
        "react-native": path.resolve(__dirname, "../engine/node_modules/react-native")
      },
      extensions: [".js", ".ios.js", ".android.js"]
    },
    externals,
    plugins: [
      {
        apply: compiler => {
            compiler.hooks.afterEmit.tap("AfterEmitPlugin", compilation => {
              exec(
                "cp ./dist/bundle.js ../engine/node_modules/@modules/home/",
                (err, stdout, stderr) => {
                  if (stdout) process.stdout.write(stdout);
                  if (stderr) process.stderr.write(stderr);
                }
              );
            });
        }
      }
    ]
  }
}
