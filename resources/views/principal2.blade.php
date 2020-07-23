<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="Łukasz Holeczek">
    <meta name="keyword" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Sistema de detección de eventos de emergencia') }}</title>

    <link rel="stylesheet" href="icons/css/all.css">
    <link href="css/style.css" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
        integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
        crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
        integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
        crossorigin="">
        </script>

</head>

<body class="c-app">
    <div id="app">

        <!-- Sidebar template-->
        @if(Auth::check())
        @if(Auth::user()->idrol==1)
        @include('plantilla.sidebaradministrador2')
        @elseif (Auth::user()->idrol==2)
        @include('plantilla.sidebarusuario2')
        @else

        @endif
        @endif
        <!-- Sidebar right template-->

        <div class="c-wrapper">
            <header class="c-header c-header-light c-header-fixed">
                <button class="c-header-toggler c-class-toggler d-lg-none mfe-auto" type="button" data-target="#sidebar"
                    data-class="c-sidebar-show">
                    <div class="c-icon c-icon-lg">
                        <i class="cil-menu"></i>
                    </div>
                </button>
                <button class="c-header-toggler c-class-toggler mfs-3 d-md-down-none" type="button"
                    data-target="#sidebar" data-class="c-sidebar-lg-show" responsive="true">
                    <div class="c-icon c-icon-lg">
                        <i class="cil-menu"></i>
                    </div>
                </button>
              
                <ul class="c-header-nav mfs-auto">
                    <li class="c-header-nav-item px-3 c-d-legacy-none">
                        <button class="c-class-toggler c-header-nav-btn" type="button" id="header-tooltip"
                            data-target="body" data-class="c-dark-theme" data-toggle="c-tooltip" data-placement="bottom"
                            title="Toggle Light/Dark Mode" data-original-title="Toggle Light/Dark Mode">
                            <div class="c-icon c-d-dark-none">
                                <i class="cil-moon"></i>
                            </div>
                            <div class="c-icon c-d-default-none">
                                <i class="cil-sun"></i>
                            </div>
                        </button>
                    </li>
                </ul>
                <ul class="c-header-nav">
                    <li class="c-header-nav-item dropdown mx-2">
                        <a class="c-header-nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                            aria-expanded="false">
                            <notification :notifications="notifications"> </notification>
                        </a>

                    </li>
                    <li class="c-header-nav-item dropdown">
                        <a class="c-header-nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                            aria-expanded="false">
                            <div class="c-avatar">
                                @if(Auth::check())
                                @if(Auth::user()->sexo=='Masculino')
                                <img src="img/avatars/6.png" class="c-avatar-img" alt="admin@bootstrapmaster.com">
                                @elseif (Auth::user()->sexo=='Femenino')
                                <img src="img/avatars/8.jpg" class="c-avatar-img" alt="admin@bootstrapmaster.com">
                                @endif
                                @endif



                            </div>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right pt-0">
                            <div class="dropdown-header bg-light py-2">
                                <strong>Cuenta</strong>
                            </div>
                            <a class="dropdown-item" @click="menu=13">
                                <div class="c-icon mfe-2">
                                    <i class="cil-user"></i>
                                </div>
                                Perfil
                            </a>
                            <a class="dropdown-item" href="{{route('logout')}}"
                                onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                <div class="c-icon mfe-2">
                                    <i class="cil-account-logout"></i>
                                </div>
                                Cerrar sesión
                                <form id="logout-form" action="{{ route('logout') }}" method="POST"
                                    style="display: none;">
                                    {{ csrf_field() }}
                                </form>
                            </a>


                        </div>
                    </li>
                    <span class="d-md-down-none">{{Auth::user()->nombre}} </span>
                </ul>

            </header>

            <div class="c-body">
                @yield('contenido2')


                <footer style="background-color:white">
                    <div class="container justify-content-center text-center" style="background-color:white">

                        <img src="img/pleca-gob.png" alt="" width="300px" height="200px" class="img-fluid img-rounded">

                        <img src="img/logo_ipn.png" alt="" width="300px" height="150px" class="img-fluid img-rounded">
                    </div>
                </footer>
                <footer class="app-footer justify-content-center" style="background-color:rgb(205,164,52);">
                    <div class="container justify-content-center text-center" style="background-color:rgb(205,164,52);">
                        <p> © Centro de Investigación en Computación. Todos los derechos reservados.<br>
                            Av. Juan de Dios Bátiz, Esq. Miguel Othón de Mendizábal | Col. Nueva Industrial Vallejo,
                            Gustavo A. Madero |
                            C.P. 07738 | Ciudad de México
                        </p>
                    </div>
                </footer>
            </div>

        </div>

    </div>
    <script type="text/javascript" src="js/app.js"></script>
    <script src="js/coreui.bundle.min.js"></script>    
    <script>
        /*new coreui.AsyncLoad(document.getElementById('ui-view'));*/
        var tooltipEl = document.getElementById('header-tooltip');
        var tootltip = new coreui.Tooltip(tooltipEl);
       
        /*construir tooltips
        var exampleEl = document.getElementById('xxde')
        var tooltip = new coreui.Tooltip(exampleEl)
        */

        function update_span_name_image(){
            var name_image = document.getElementById('file-upload').files[0].name;
            document.getElementById('infospan').innerHTML = name_image;
            console.log(name_image);
        }
    </script>
    <script type="text/javascript" src="js/coreui-utils.js" class="view-script">
    </script>
    <script type="text/javascript" src="js/coreui-chartjs.bundle.js" class="view-script">
    </script>
    <script type="text/javascript" src="js/leaflet.js" class="view-script">
    </script>
   
    <script  src="js/sweetalert2.all.min.js"></script>

</body>

</html>