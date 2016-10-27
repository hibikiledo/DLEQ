 module.exports = {
   entry: {
    app: './index.js',
   },
   output: {
     path: 'public/',
     filename: 'bundle.js',
     publicPath: '/'
   },
   module: {
     loaders: [{
       test: /\.js$/,
       exclude: /node_modules/,
       loader: 'babel-loader'
     }]
   }
 };