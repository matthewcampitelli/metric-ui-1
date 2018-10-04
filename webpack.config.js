var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: ['./src/stepped-progress-control.js','./src/stepped-progress-control-element.js','./src/index.js'],
    output: { filename: 'main.js' }
};