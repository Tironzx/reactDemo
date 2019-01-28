module.exports = {
    rules: [{
      test: /\.less$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader', // translates CSS into CommonJS
      }, {
        loader: 'less-loader', // compiles Less to CSS
        options: {
        modifyVars: {
        'primary-color': '#ff0000',
        'link-color': '#ff0000',
        'border-radius-base': '4px',
       },
       javascriptEnabled: true,
      },
      }],
      // ...other rules
    }],
    // ...other config
  }