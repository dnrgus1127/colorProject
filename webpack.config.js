const path = require("path");

module.exports = {
    entry: ['@babel/polyfill', './src/script.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "js/bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src/js')
                ],
                exclude: /node_module/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],

                    }
                }
            }
        ]
    },
    devtool: 'source-map',
    mode: "development",
};