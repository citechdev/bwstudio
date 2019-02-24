const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const devMode = process.env.NODE_ENV !== 'production';

let pathsToClean = [
    "dist"
];

module.exports = {
    entry: {
        "projector": "./src/js/3d/projector.js",
        "canvasrenderer": "./src/js/3d/canvasrenderer.js",
        "object-loader": "./src/js/3d/object-loader.js",
        "jquery-downCount": "./src/js/jquery.downCount.js",
        "form_script" : "./src/js/form_script.js",
        "main": "./src/js/main.js"
    },
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader", 
                    "sass-loader" 
                ]
			},
			{
				test: /\.(mp3|obj)$/,
				use: [
				  {
                    loader: 'file-loader',
                    options: {
                        name: "3d/[name].[ext]"
                    }
				  }
				]
            },
            {
                test: /\.(gif|png|jpe?g|svg|woff|eot|ttf)$/i,
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    name: "img/[name].[ext]"
                }  
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(pathsToClean),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "id.css"
        }),
        // new OptimizeCSSAssetsPlugin({}),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, "src/views/index.html"),
            title: "BWStudio",
            devMode: devMode,
            minify: false
      }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname,"src/js/plugins/"),
                to: path.resolve(__dirname, "dist/js/plugins/"),
                toType: "dir"
            }
        ]),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname,"src/js/libraries/"),
                to: path.resolve(__dirname, "dist/js/libraries/"),
                toType: "dir"
            }
        ]),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname,"src/fonts/"),
                to: path.resolve(__dirname, "dist/fonts/"),
                toType: "dir"
            }
        ]),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname,"src/css/plugins/bootstrap.min.css"),
                to: path.resolve(__dirname, "dist/css/bootstrap.min.css"),
                toType: "file"
            }
        ]),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname,"src/css/plugins/pageloader.css"),
                to: path.resolve(__dirname, "dist/css/pageloader.css"),
                toType: "file"
            }
        ]),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname,"src/css/plugins/style-default.css"),
                to: path.resolve(__dirname, "dist/css/style-default.css"),
                toType: "file"
            }
        ]),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname,"src/css/plugins/style-color2.css"),
                to: path.resolve(__dirname, "dist/css/style-color2.css"),
                toType: "file"
            }
        ])

    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
};
