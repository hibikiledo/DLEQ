 module.exports = {
     entry: {
     	quiz_maker_app: './public/javascripts/quiz_maker_app.js',
     	quiz_app: './public/javascripts/quiz_app.js'
     },
     output: {
         path: './public/javascripts',
         filename: '[name].bundle.js'
     },
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }]
     }
 };