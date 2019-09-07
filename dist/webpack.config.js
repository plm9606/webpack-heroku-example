var path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: ["./src/index.js"],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/"
    },
    devServer: {
        contentBase: __dirname + "/dist/",
        inline: true,
        hot: true,
        host: "localhost",
        port: 5500
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};
