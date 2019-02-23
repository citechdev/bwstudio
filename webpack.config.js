const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        main: "./src/js/main.js",
        objectLoader: "./src/js/3d/object-loader.js",
        projector: "./src/js/3d/projector.js",
        canvasRenderer: "./src/js/3d/canvasrenderer.js"
    },
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "dist")
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
				test: /\.(mp3)$/,
				use: [
				  {
					loader: 'file-loader',
					options: {},
				  }
				]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    name: "images/[name].[hash].[ext]"
                }  
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/main.css",
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
        ])

    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
};
