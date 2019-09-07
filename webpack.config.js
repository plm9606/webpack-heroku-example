var path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: ["./index.js"],
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
        publicPath: "/"
    },
    devServer: {
        contentBase: __dirname,
        inline: true,
        hot: true,
        host: "localhost",
        port: 5500
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};
