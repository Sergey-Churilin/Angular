 var webpack = require("webpack");

module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
           // { test: /\.css$/, loader: "style!css" },
            {test: /\.html$/, loaders: ['html-loader']}
        ],
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            })
        ]
    }
};