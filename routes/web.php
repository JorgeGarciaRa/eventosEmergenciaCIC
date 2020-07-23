<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['middleware'=>['guest']],function(){
    Route::get('/', 'Auth\InicioController@showInicioForm')->name('inicio');

    
    Route::get('/registro', 'Auth\RegistroController@showRegistroForm')->name('registro');
    Route::post('/registro', 'Auth\RegistroController@registro')->name('registrodb');

    Route::get('/login', 'Auth\LoginController@showLoginForm')->name('showlogin');
    Route::post('/login', 'Auth\LoginController@login')->name('login');
    Route::get('/dashboard/datos','DashboardController@datos');

    //rutas ver y enviar el post 
    Route::get('/ForgotPassword', 'Auth\ForgotPasswordController@showForgotForm')->name('showpassword');
    Route::post('/password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
    Route::get('/password/reset/{token}', 'Auth\ResetPasswordController@showResetForma')->name('password.reset');
    Route::post('password/reset' , 'Auth\ResetPasswordController@reset')->name('password.request');

   });






Route::group(['middleware'=>['auth']],function(){
    
   Route::post('/logout','Auth\LoginController@logout')->name('logout');

   Route::get('/dashboard/graficas','DashboardController@graficas');
   Route::post('/notification/get','NotificationController@get');
   Route::get('/datoUser/get','UserController@datosUser');
   
   Route::get('/dashboard/datos','DashboardController@datos');
   
   Route::get('/main', function () {
    return view('contenido2/contenido');
})->name('main');;

    //Route::get('/main', function () {
    //    return view('contenido/contenido');
    //})->name('main');


    Route::group(['middleware'=>['usuario']],function(){

        Route::get('/categoria', 'CategoriaController@index');
        Route::post('/categoria/registrar', 'CategoriaController@store');
        Route::put('/categoria/actualizar', 'CategoriaController@update');
        Route::put('/categoria/desactivar', 'CategoriaController@desactivar');
        Route::put('/categoria/activar', 'CategoriaController@activar');
        Route::get('/categoria/selectCategoria', 'CategoriaController@selectCategoria');


        Route::get('/tweetmovilidad', 'TweetmovilidadController@index');
        Route::post('/tweetmovilidad/registrar', 'TweetmovilidadController@store');
        Route::get('/tweetmovilidad/listarPdf', 'TweetmovilidadController@listarPdf')->name('tweetmovilidad_pdf');

        
        Route::get('/tweetincendio', 'TweetincendioController@index');
        Route::post('/tweetincendio/registrar', 'TweetincendioController@store');
        Route::get('/tweetincendio/listarPdf', 'TweetincendioController@listarPdf')->name('tweetincendio_pdf');

        Route::get('/tweetlluvia', 'TweetlluviaController@index');
        Route::post('/tweetlluvia/registrar', 'TweetlluviaController@store');
        Route::get('/tweetlluvia/listarPdf', 'TweetlluviaController@listarPdf')->name('tweetlluvia_pdf');

        Route::get('/tweetsalud', 'TweetsaludController@index');
        Route::post('/tweetsalud/registrar', 'TweetsaludController@store');
        Route::get('/tweetsalud/listarPdf', 'TweetsaludController@listarPdf')->name('tweetsalud_pdf');
        
        Route::get('/articulo', 'ArticuloController@index');
        Route::post('/articulo/registrar', 'ArticuloController@store');
        Route::put('/articulo/actualizar', 'ArticuloController@update');
        Route::put('/articulo/desactivar', 'ArticuloController@desactivar');
        Route::put('/articulo/activar', 'ArticuloController@activar');

    
        Route::get('/cliente', 'ClienteController@index');
        Route::post('/cliente/registrar', 'ClienteController@store');
        Route::put('/cliente/actualizar', 'ClienteController@update');

    });
 

    Route::group(['middleware'=>['Administrador']],function(){


      
        Route::get('/categoria', 'CategoriaController@index');
        Route::post('/categoria/registrar', 'CategoriaController@store');
        Route::put('/categoria/actualizar', 'CategoriaController@update');
        Route::put('/categoria/desactivar', 'CategoriaController@desactivar');
        Route::put('/categoria/activar', 'CategoriaController@activar');
        Route::get('/categoria/selectCategoria', 'CategoriaController@selectCategoria');
        
        Route::get('/articulo', 'ArticuloController@index');
        Route::post('/articulo/registrar', 'ArticuloController@store');
        Route::put('/articulo/actualizar', 'ArticuloController@update');
        Route::put('/articulo/desactivar', 'ArticuloController@desactivar');
        Route::put('/articulo/activar', 'ArticuloController@activar');
        
        Route::get('/tweetmovilidad', 'TweetmovilidadController@index');
        Route::post('/tweetmovilidad/registrar', 'TweetmovilidadController@store');
        Route::get('/tweetmovilidad/listarPdf', 'TweetmovilidadController@listarPdf')->name('tweetmovilidad_pdf');

        Route::get('/tweetincendio', 'TweetincendioController@index');
        Route::post('/tweetincendio/registrar', 'TweetincendioController@store');
        Route::get('/tweetincendio/listarPdf', 'TweetincendioController@listarPdf')->name('tweetincendio_pdf');
        
        Route::get('/tweetlluvia', 'TweetlluviaController@index');
        Route::post('/tweetlluvia/registrar', 'TweetlluviaController@store');
        Route::get('/tweetlluvia/listarPdf', 'TweetlluviaController@listarPdf')->name('tweetlluvia_pdf');

        Route::get('/tweetsalud', 'TweetsaludController@index');
        Route::post('/tweetsalud/registrar', 'TweetsaludController@store');
        Route::get('/tweetsalud/listarPdf', 'TweetsaludController@listarPdf')->name('tweetsalud_pdf');

        Route::get('/cliente', 'ClienteController@index');
        Route::post('/cliente/registrar', 'ClienteController@store');
        Route::put('/cliente/actualizar', 'ClienteController@update');

        Route::get('/rol', 'RolController@index');
        Route::get('/rol/selectRol', 'RolController@selectRol');
        
        
        Route::get('/user', 'UserController@index');
        Route::post('/user/registrar', 'UserController@store');
        Route::put('/user/actualizar', 'UserController@update');
        Route::put('/user/desactivar', 'UserController@desactivar');
        Route::put('/user/activar', 'UserController@activar');

    });


});