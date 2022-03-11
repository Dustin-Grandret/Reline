const path = require("path");

module.exports = {
    mode: process.env.NODE_ENV,
    target: "electron-renderer",
    entry: "./src/index.jsx",
    output: {
        path: path.resolve(__dirname, "../../build/lib"),
        filename: "renderer.js",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
            },
            {
                test: /\.ts$/,
                loader: "ts-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: [
            ".js",
            ".json",
            ".jsx",
            ".css",
            ".ts",
        ],
    },
};
