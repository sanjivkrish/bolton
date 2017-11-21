const path = require('path')
const webpack = require('webpack')

const config = {
    entry: path.resolve(__dirname, 'public', 'js', 'initiate.js'),
    output: {
        path: path.resolve(__dirname, 'public', 'js'),
        filename: 'index.js'
    }
}

module.exports = config