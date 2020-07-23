let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.styles([
    'resources/assets/plantilla/css/font-awesome.min.css',
    'resources/assets/plantilla/css/simple-line-icons.min.css',
    'resources/assets/plantilla/css/icon.min.css',
    'resources/assets/plantilla/css/style.css',
    'resources/assets/plantilla/css/coreui-chartjs.css'
], 'public/css/plantilla.css')
.scripts([
    'resources/assets/plantilla/js/coreui.bundle.js',
    'resources/assets/plantilla/js/coreui-utils.js',
    'resources/assets/plantilla/js/coreui-chartjs.bundle.js',
    'resources/assets/plantilla/js/sweetalert2.all.js',
    
    
], 'public/js/plantilla.js')
.js(['resources/assets/js/app.js'],'public/js/app.js');