<!DOCTYPE html>

<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="Sistema Ventas Laravel Vue Js- IncanatoIT">
  <meta name="author" content="Incanatoit.com">

  <meta name="keyword" content="Sistema ventas Laravel Vue Js, Sistema compras Laravel Vue Js">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>Sistema de detección de eventos de emergencia</title>
  

  <link rel="stylesheet" href="{{asset('icons/css/all.css')}}">
    <link href="{{asset('css/style.css')}}" rel="stylesheet">

</head>

<body class="app flex-row align-items-center"  style="background:url({{asset('img/2.jpg')}}) ; background-Repeat:no-repeat;background-Attachment:fixed;background-position: center center" >
  <div class="container" >
       @yield('reestablecer')
   
  </div>

  <!-- Bootstrap and necessary plugins -->
  
  <script src="{{asset('js/plantilla.js')}}"></script>

</body>
</html>