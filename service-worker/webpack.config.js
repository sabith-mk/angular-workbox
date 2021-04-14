const path = require("path");

module.exports = {
    target: "node",
    mode: "production",
    entry: {
        index: path.join(__dirname, "..", "service-worker", "service-worker.ts"),
    },
    resolve: { extensions: [".js", ".ts"] },
    output: {
        path: path.join(__dirname, "..", "dist"),
        filename: "sw.js",
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                options: {
                    onlyCompileBundledFiles: true,
                },
            },
        ],
    },
    plugins: [],
};