const writeFile = require('./write-file');

let file = {
    "name": "",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "init": "webpack --progress --config webpack.dev.config.js",
        "dev": "webpack-dev-server --content-base ./ --open --inline --hot --compress --history-api-fallback --config webpack.dev.config.js",
        "build": "webpack --progress --hide-modules --config webpack.prod.config.js",
        "lint": "eslint --fix --ext .js,.vue src"
    },
    "repository": {
        "type": "git",
        "url": ""
    },
    "author": "",
    "license": "MIT",
    "dependencies": {
        "vue": "^2.2.6",
        "vue-router": "^2.3.1"
    },
    "devDependencies": {
        "autoprefixer-loader": "^2.0.0",
        "babel": "^6.23.0",
        "babel-core": "^6.23.1",
        "babel-loader": "^6.2.4",
        "babel-plugin-transform-runtime": "^6.12.0",
        "babel-preset-es2015": "^6.9.0",
        "babel-runtime": "^6.11.6",
        "css-loader": "^0.23.1",
        "extract-text-webpack-plugin": "^2.0.0",
        "file-loader": "^0.8.5",
        "html-loader": "^0.3.0",
        "html-webpack-plugin": "^2.28.0",
        "style-loader": "^0.13.1",
        "url-loader": "^0.5.7",
        "vue-hot-reload-api": "^1.3.3",
        "vue-html-loader": "^1.2.3",
        "vue-loader": "^11.0.0",
        "vue-style-loader": "^1.0.0",
        "vue-template-compiler": "^2.2.1",
        "webpack": "^2.2.1",
        "webpack-dev-server": "^2.4.1",
        "webpack-merge": "^3.0.0"
    }
};




module.exports = function (opts) {
    const data = opts.data;

    if (data.name) file.name = data.name;
    if (data.version) file.version = data.version;
    if (data.desc) file.description = data.desc;
    if (data.git) file.repository.url = data.git;

    if(data.ui.indexOf("elementUI")>-1){
        file.dependencies['element-ui']="^1.3.5";
    }
    if(data.ui.indexOf("iview")>-1){

        file.dependencies['iview']="^2.0.0-rc.13";
    }

    if(data.ui.indexOf("none")>-1){

    }

    if (data.css.indexOf('less') > -1) {
        file.devDependencies['less'] = '^2.7.1';
        file.devDependencies['less-loader'] = '^2.2.3';
    }

    if (data.css.indexOf('sass') > -1) {
        file.devDependencies['node-sass'] = '^3.10.1';
        file.devDependencies['sass-loader'] = '^4.0.2';
    }

    if (data.ajax) file.dependencies['axios'] = '^0.15.3';
    if (data.i18n) file.dependencies['vue-i18n'] = '^5.0.3';
    if (data.store.indexOf('vuex') > -1)  file.dependencies['vuex'] = '^2.2.1';
    if (data.chart.indexOf('echarts') > -1) file.dependencies['echarts'] = '^3.4.0';
    if (data.eslint) {
        file.devDependencies['eslint'] = '^3.12.2';
        file.devDependencies['eslint-plugin-html'] = '^1.7.0';
    }

    if (data.funs.indexOf('cookies') > -1) file.dependencies['js-cookie'] = '^2.1.3';
    if (data.funs.indexOf('clipboard') > -1) file.dependencies['clipboard'] = '^1.5.12';
    if (data.funs.indexOf('html2canvas') > -1) file.dependencies['html2canvas'] = '^0.5.0-beta4';
    if (data.funs.indexOf('rasterizehtml') > -1) file.dependencies['rasterizehtml'] = '^1.2.4';

    writeFile({
        directory: opts.directory,
        fileName: 'package.json',
        data: JSON.stringify(file),
        codeFormat: {
            indent_size: 2
        },
        success () {
            opts.success();
        },
        error () {
            opts.error();
        }
    });
};