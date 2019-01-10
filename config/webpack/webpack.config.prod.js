const webpack = require('webpack');
const {
    platformLibsDefinitions,
    webpackUtils,
    COMMON_EXTERNALS,
    providePlugin
} = require('platform-common-ui-lib');
const NODE_ENV = process.env.NODE_ENV;
const packageName = 'opensource-google-blockly';
const libraryName = 'OpensourceGoogleBlockly';
// const { packageName, libraryName } = platformLibsDefinitions.PLATFORM_TASKING_UI;
// const cssPlugin = webpackUtils.cssExtractPlugin(packageName);
const { bundleAnalyzerPlugin, buildPath, pkgSrcPath, pkgRootPath, uglifyPlugin } = webpackUtils.baseLibImportsAndVars(packageName, 'src');
const { libraryTarget, library } = webpackUtils.getWebpackLibraryOutputConfig(
    libraryName, packageName
);

module.exports = {
    entry: `${pkgSrcPath}/index.js`,
    output: {
        path: buildPath,
        filename: `opensource-google-blockly.js`,
        library,
        libraryTarget,
        publicPath: webpackUtils.getPublicPath(NODE_ENV, pkgRootPath, packageName),
        chunkFilename: '[name].[chunkhash].js'
    },
    resolve: {
        extensions: ['.js']
    },
    externals: COMMON_EXTERNALS,
    module: {
        rules: [
            {
                test: /\.js$|\.jsx$/,
                include: pkgSrcPath,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.ProvidePlugin(providePlugin),
        // uglifyPlugin,
        // bundleAnalyzerPlugin,
        // cssPlugin
    ]
};
