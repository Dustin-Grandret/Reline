const path = require("path");

module.exports = {
    mode: process.env.NODE_ENV,
    target: "electron-main",
    entry: "./electron/index.js",
    output: {
        path: path.resolve(__dirname, "../../build/lib"),
        filename: "index.js",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
            },
        ],
    },
    resolve: {
        extensions: [
            ".js",
            ".json",
            ".jsx",
            ".css",
        ],
    },
};
