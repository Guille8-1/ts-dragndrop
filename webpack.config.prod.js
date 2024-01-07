const path = require('path');
const CleanPlugin = require('clean-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: './src/app.ts',
    devServer : {
        static: [
            {
                directory: path.join(__dirname)
            },
        ],
    },
    output:{
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'none',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new CleanPlugin.CleanWebpackPlugin(),
    ]
};