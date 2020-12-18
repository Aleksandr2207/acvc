const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = (env, args) => {
    const isProduction = args.mode === "production";

    var plugins = [new CleanWebpackPlugin()];

    if (isProduction) {
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    return {
        target: "node",
        entry: {
            main: "./src/index.ts",
        },
        output: {
            path: path.resolve(__dirname, "build"),
            filename: isProduction
                ? "[name].[contenthash].js"
                : "[name].bundle.js",
            library: "main",
        },
        externals: [
            nodeExternals({
                allowlist: isProduction ? undefined : ["webpack/hot/poll?1000"],
            }),
        ],
        optimization: {
            // moduleIds: "hashed",
            minimize: isProduction,
            // runtimeChunk: "single",
            // splitChunks: {
            //     cacheGroups: {
            //         vendor: {
            //             test: /[\\/]node_modules[\\/]/,
            //             name: "vendors",
            //             chunks: "all",
            //         },
            //     },
            // },
        },
        devtool: isProduction ? undefined : "eval-source-map",
        resolve: {
            extensions: [".js", ".json", ".ts"],
            modules: [path.resolve(__dirname, "src"), "node_modules"],
            alias: {
                src: path.resolve(__dirname, "src"),
            },
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: "ts-loader",
                },
                {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader",
                },
            ],
        },
        plugins,
    };
};
