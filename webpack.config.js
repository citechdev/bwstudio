const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: "./src/js/main.js",
    output: {
        filename: "js/main.js",
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
				  },
				],
			  },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/index.css",
            chunkFilename: "id.css"
        }),
        // new OptimizeCSSAssetsPlugin({}),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, "src/views/index.html"),
            title: "CA",
            devMode: devMode,
            minify: false
      }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname,"src/js/plugins/"),
                to: path.resolve(__dirname, "dist/js/plugins/"),
                toType: "folder"
            }
        ]),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname,"src/js/materialize.min.js"),
                to: path.resolve(__dirname, "dist/js/materialize.min.js"),
                toType: "file"
            }
        ]),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname,"src/audio/daftpunkmix.mp3"),
                to: path.resolve(__dirname, "dist/audio/daftpunkmix.mp3"),
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
