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
    
    <link rel="stylesheet" href="css/icons.min.css">
    <link href="css/style.css" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
        integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
        crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
        integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
        crossorigin="">
    </script>
        
    <style type="text/css">
        
        @keyframes chartjs-render-animation {
            from {
                opacity: 0.99;
            }
            to {
                opacity: 1;
            }
        }
        
        .chartjs-render-monitor {
            animation: chartjs-render-animation 0.001s;
        }

        .bg-background-cic{
            background-color: #0a2a50;
        }

        #btn-coreui {
            color: rgba(255,255,255,.8);
            border-color: #0a2a50;
        }

        #btn-coreui:hover {
            background: #1a569c;
        }

        .btn-coreui-home {
            color: #fff;
            background-color: #0a2a50;
            border-color: #0a2a50;
        }

        .btn-coreui-home:hover {
            color: #fff;
            background-color: #1a569c;
            border-color: #1a569c;
        }

        .nav-link.active {
            color: #fff;
            background-color: #1a569c !important;
            border-color: #1a569c;
        }

        #nav-link-map.active {
            color: #fff;
            background-color: #636f83 !important;
            
        }

        #nav-link-historical-data.active{
            color: #768192;
            background-color: #ebedef!important;
            border-color: #c4c9d0 #c4c9d0 #ebedef;
        }
        
        #btn-profile {
            color: #4f5d73;
        }

        #btn-profile:active {
            color: rgba(255,255,255,.8);
            background: #1a569c;
        }

        .img-contaminants {
            width: 100px ;
            height: 100px;
        }

        .table-separate{
            border-collapse: separate;
            border-spacing: 0px 5px;
            border: #fff;
        
        }

        .badge-table{
            display: initial;
            padding: .80em .40em;
            font-size: 75%;
            font-weight: 700;
            line-height: 1;
            text-align: center;
            white-space: nowrap;
            vertical-align: baseline;
            border-radius: .25rem;
            transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        }
        
        .table-separate th, .table-separate td {
            padding: 1.2rem .2rem .3rem .2rem;
            vertical-align: top;
            /* border-top: 1px solid; */
            border-top-color: #d8dbe0;
        }

        .table-separate tr td:first-child { border-top-left-radius: 10px;  border-bottom-left-radius: 10px; }
        .table-separate tr td:last-child { border-top-right-radius: 10px;  border-bottom-right-radius: 10px;}
        .table-separate tr td:first-child { border-bottom-left-radius: 10px;  border-top-left-radius: 10px}
        .table-separate tr td:last-child { border-bottom-right-radius: 10px; border-top-right-radius: 10px; }
        
        @media screen and (min-width:1200px){
            .img-profile {
                align-items: center;
                justify-content: center;
                width: 160px ;
                height: 160px;
            }                       

        }
        
        @media screen and (max-width:600px){
            .img-profile {
                align-items: center;
                justify-content: center;
                width: 90px ;
                height: 90px;
            }                       

        }

        @media screen and (max-width:320px){
            .img-profile {
                align-items: center;
                justify-content: center;
                width: 50px ;
                height: 50px;
            }                       

        }

        .bg-primary-cic {
            background-color:  #0F4C81!important;
            color: white !important;
        }
        /*
        * DOM element resizing detection
        * https://github.com/marcj/css-element-queries
        */
        
        .chartjs-size-monitor,
        .chartjs-size-monitor-expand,
        .chartjs-size-monitor-shrink {
            position: absolute;
            direction: ltr;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
            pointer-events: none;
            visibility: hidden;
            z-index: -1;
        }
        
        .chartjs-size-monitor-expand > div {
            position: absolute;
            width: 1000000px;
            height: 1000000px;
            left: 0;
            top: 0;
        }
        
        .chartjs-size-monitor-shrink > div {
            position: absolute;
            width: 200%;
            height: 200%;
            left: 0 ;
            top: 0;
        }


        .inputfile {
            width: 0.1px;
            height: 0.1px;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            z-index: -1;
        }

        .inputfile + label {
            max-width: 80%;
            font-size: 0.65rem;
            font-weight: 700;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            display: inline-block;
            overflow: hidden;
            padding: 0.625rem 0.625rem;
        }

        .inputfile + label svg {
            width: 1em;
            height: 1em;
            vertical-align: middle;
            fill: currentColor;
            margin-top: -0.25em;
            margin-right: 0.25em;
        }

        .iborrainputfile {
            font-size:16px; 
            font-weight:normal;
            font-family: 'Lato';
        }

        /* style 5 */

        .inputfile-5 + label {
            color: #f9b115;
        }

        .inputfile-5:focus + label,
        .inputfile-5.has-focus + label,
        .inputfile-5 + label:hover {
            color: #e29c06;
        }

        .inputfile-5 + label figure {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #f9b115;
            display: block;
            padding: 5px;
            margin: 0 auto 10px;
        }

        .inputfile-5:focus + label figure,
        .inputfile-5.has-focus + label figure,
        .inputfile-5 + label:hover figure {
            background-color: #e29c06;
        }

        .inputfile-5 + label svg {
            width: 100%;
            height: 100%;
            fill: #f1e5e6;
        }


        .bg-aqi-good{
            background-color: rgb(0, 228, 0);
            color: #713636;
        }

        
        .bg-aqi-moderate{
            background: #ffde33;
            color: #713636;
        }
        
        .bg-aqi-unhealthy-sensitive-groups{
            background: rgb( 255, 126, 0);
        }
        
        .bg-aqi-unhealthy{
            background: rgb(255, 0, 0);
        }
        
        .bg-aqi-very-unhealthy{
            background: rgb(143, 63, 151);
            color: white;
        }

        .bg-aqi-hazardous{
            background-color: rgb(126, 0, 35);
            color: white;
        }
        
    </style>
</head>

<body class="c-app">
    <div id="app">  

        <!-- Sidebar template-->
        @if(Auth::check())
            @if(Auth::user()->idrol==1)
                @include('plantilla.sidebaradministrador')
             @elseif (Auth::user()->idrol==2)
                 @include('plantilla.sidebarusuario')
                @else

            @endif
        @endif

        <!-- Sidebar right template-->
        <div class="c-sidebar c-sidebar-lg c-sidebar-light c-sidebar-right
            c-sidebar-overlaid" id="aside">
            <button class="c-sidebar-close c-class-toggler" type="button"
                data-target="_parent" data-class="c-sidebar-show" responsive="true">
                <div class="c-icon">
                    <i class="cil-x:before"></i>
                </div>
            </button>
            <ul class="nav nav-tabs nav-underline nav-underline-primary" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab"
                        href="#timeline" role="tab" aria-selected="true">
                        <div class="c-icon">
                            <i class="cil-list"></i>
                        </div>
                    </a>
                </li>
                <li class="nav-item"><a class="nav-link" data-toggle="tab"
                        href="#messages" role="tab" aria-selected="false">
                        <div class="c-icon">
                            <i class="cil-speech"></i>
                        </div></a>
                </li>
                <li class="nav-item"><a class="nav-link" data-toggle="tab"
                        href="#settings" role="tab" aria-selected="false">
                        <div class="c-icon">
                            <i class="cil-settings"></i>
                        </div></a>
                </li>
            </ul>

            <div class="tab-content">
                <div class="tab-pane active" id="timeline" role="tabpanel">
                    <div class="list-group list-group-accent">
                        <div class="list-group-item list-group-item-accent-secondary
                            bg-light text-center font-weight-bold text-muted
                            text-uppercase c-small">Today
                        </div>
                        <div class="list-group-item list-group-item-accent-warning
                            list-group-item-divider">
                            <div class="c-avatar float-right"><img class="c-avatar-img"
                                    src="assets/img/avatars/7.jpg" alt="user@email.com"></div>
                            <div>Meeting with <strong>Lucas</strong></div><small
                                class="text-muted mr-3">
                                <div class="c-icon">
                                    <i class="cil-calendar"></i>
                                </div>
                                &nbsp; 1 - 3pm</small><small class="text-muted">
                                <div class="c-icon">
                                    <i class="cil-location-pin"></i>
                                </div>
                                &nbsp; Palo Alto, CA</small>
                        </div>
                        <div class="list-group-item list-group-item-accent-info">
                            <div class="c-avatar float-right"><img class="c-avatar-img"
                                    src="assets/img/avatars/4.jpg" alt="user@email.com"></div>
                            <div>Skype with <strong>Megan</strong></div><small
                                class="text-muted mr-3">
                                <div class="c-icon">
                                    <i class="cil-calendar"></i>
                                </div>
                                &nbsp; 4 - 5pm</small><small class="text-muted">
                                <div class="c-icon">
                                    <i class="cil-skype"></i>
                                </div>
                                &nbsp; On-line</small>
                        </div>
                        <div class="list-group-item list-group-item-accent-secondary
                            bg-light text-center font-weight-bold text-muted
                            text-uppercase c-small">Tomorrow
                        </div>
                        <div class="list-group-item list-group-item-accent-danger
                            list-group-item-divider">
                            <div>New UI Project - <strong>deadline</strong></div><small
                                class="text-muted mr-3">
                                <div class="c-icon">
                                    <i class="cil-calendar"></i>
                                </div>
                                &nbsp; 10 - 11pm</small><small class="text-muted">
                                <div class="c-icon">
                                    <i class="cil-home"></i>
                                </div>
                                &nbsp; creativeLabs HQ</small>
                            <div class="c-avatars-stack mt-2">
                                <div class="c-avatar c-avatar-xs"><img
                                        class="c-avatar-img"
                                        src="assets/img/avatars/2.jpg"
                                        alt="user@email.com"></div>
                                <div class="c-avatar c-avatar-xs"><img
                                        class="c-avatar-img"
                                        src="assets/img/avatars/3.jpg"
                                        alt="user@email.com"></div>
                                <div class="c-avatar c-avatar-xs"><img
                                        class="c-avatar-img"
                                        src="assets/img/avatars/4.jpg"
                                        alt="user@email.com"></div>
                                <div class="c-avatar c-avatar-xs"><img
                                        class="c-avatar-img"
                                        src="assets/img/avatars/5.jpg"
                                        alt="user@email.com"></div>
                                <div class="c-avatar c-avatar-xs"><img
                                        class="c-avatar-img"
                                        src="assets/img/avatars/6.jpg"
                                        alt="user@email.com"></div>
                            </div>
                        </div>
                        <div class="list-group-item list-group-item-accent-success
                            list-group-item-divider">
                            <div><strong>#10 Startups.Garden</strong> Meetup</div><small
                                class="text-muted mr-3">
                                <div class="c-icon">
                                    <i class="cil-calendar"></i>
                                </div>
                                &nbsp; 1 - 3pm</small><small class="text-muted">
                                <div class="c-icon">
                                    <i class="cil-home"></i>
                                </div>
                                &nbsp; Palo Alto, CA</small>
                        </div>
                        <div class="list-group-item list-group-item-accent-primary
                            list-group-item-divider">
                            <div><strong>Team meeting</strong>
                            </div>
                            <small
                                class="text-muted mr-3">
                                <div class="c-icon">
                                    <i class="cil-calendar"></i>
                                </div>
                                &nbsp; 4 - 6pm</small><small class="text-muted">
                                <div class="c-icon">
                                    <i class="cil-home"></i>
                                </div>
                                &nbsp; creativeLabs HQ
                            </small>
                            <div class="c-avatars-stack mt-2">
                                <div class="c-avatar c-avatar-xs"><img
                                        class="c-avatar-img"
                                        src="assets/img/avatars/2.jpg"
                                        alt="user@email.com"></div>
                                <div class="c-avatar c-avatar-xs"><img
                                        class="c-avatar-img"
                                        src="assets/img/avatars/3.jpg"
                                        alt="user@email.com"></div>
                                <div class="c-avatar c-avatar-xs"><img
                                        class="c-avatar-img"
                                        src="assets/img/avatars/4.jpg"
                                        alt="user@email.com"></div>
                                <div class="c-avatar c-avatar-xs"><img
                                        class="c-avatar-img"
                                        src="assets/img/avatars/5.jpg"
                                        alt="user@email.com"></div>
                                <div class="c-avatar c-avatar-xs"><img
                                        class="c-avatar-img"
                                        src="assets/img/avatars/6.jpg"
                                        alt="user@email.com"></div>
                                <div class="c-avatar c-avatar-xs"><img
                                        class="c-avatar-img"
                                        src="assets/img/avatars/7.jpg"
                                        alt="user@email.com"></div>
                                <div class="c-avatar c-avatar-xs"><img
                                        class="c-avatar-img"
                                        src="assets/img/avatars/8.jpg"
                                        alt="user@email.com"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane p-3" id="messages" role="tabpanel">
                    <div class="message">
                        <div class="py-3 pb-5 mr-3 float-left">
                            <div class="c-avatar">
                                <img class="c-avatar-img"
                                    src="assets/img/avatars/7.jpg" alt="user@email.com">
                                <span class="c-avatar-status bg-success"></span>
                            </div>
                        </div>
                        <div><small class="text-muted">Lukasz Holeczek</small><small
                                class="text-muted float-right mt-1">1:52 PM</small></div>
                        <div class="text-truncate font-weight-bold">Lorem ipsum dolor
                            sit amet</div><small class="text-muted">Lorem ipsum dolor
                            sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt...</small>
                    </div>
                    <hr>
                    <div class="message">
                        <div class="py-3 pb-5 mr-3 float-left">
                            <div class="c-avatar"><img class="c-avatar-img"
                                    src="assets/img/avatars/7.jpg" alt="user@email.com"><span
                                    class="c-avatar-status bg-success"></span></div>
                        </div>
                        <div><small class="text-muted">Lukasz Holeczek</small><small
                                class="text-muted float-right mt-1">1:52 PM</small></div>
                        <div class="text-truncate font-weight-bold">Lorem ipsum dolor
                            sit amet</div><small class="text-muted">Lorem ipsum dolor
                            sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt...</small>
                    </div>
                    <hr>
                    <div class="message">
                        <div class="py-3 pb-5 mr-3 float-left">
                            <div class="c-avatar"><img class="c-avatar-img"
                                    src="assets/img/avatars/7.jpg" alt="user@email.com"><span
                                    class="c-avatar-status bg-success"></span></div>
                        </div>
                        <div><small class="text-muted">Lukasz Holeczek</small><small
                                class="text-muted float-right mt-1">1:52 PM</small></div>
                        <div class="text-truncate font-weight-bold">Lorem ipsum dolor
                            sit amet</div><small class="text-muted">Lorem ipsum dolor
                            sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt...</small>
                    </div>
                    <hr>
                    <div class="message">
                        <div class="py-3 pb-5 mr-3 float-left">
                            <div class="c-avatar"><img class="c-avatar-img"
                                    src="assets/img/avatars/7.jpg" alt="user@email.com"><span
                                    class="c-avatar-status bg-success"></span></div>
                        </div>
                        <div><small class="text-muted">Lukasz Holeczek</small><small
                                class="text-muted float-right mt-1">1:52 PM</small></div>
                        <div class="text-truncate font-weight-bold">Lorem ipsum dolor
                            sit amet</div><small class="text-muted">Lorem ipsum dolor
                            sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt...</small>
                    </div>
                    <hr>
                    <div class="message">
                        <div class="py-3 pb-5 mr-3 float-left">
                            <div class="c-avatar"><img class="c-avatar-img"
                                    src="assets/img/avatars/7.jpg" alt="user@email.com"><span
                                    class="c-avatar-status bg-success"></span></div>
                        </div>
                        <div><small class="text-muted">Lukasz Holeczek</small><small
                                class="text-muted float-right mt-1">1:52 PM</small></div>
                        <div class="text-truncate font-weight-bold">Lorem ipsum dolor
                            sit amet</div><small class="text-muted">Lorem ipsum dolor
                            sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt...</small>
                    </div>
                </div>
                <div class="tab-pane p-3" id="settings" role="tabpanel">
                    <h6>Settings</h6>
                    <div class="c-aside-options">
                        <div class="clearfix mt-4"><small><b>Option 1</b></small>
                            <label class="c-switch c-switch-label c-switch-pill
                                c-switch-success c-switch-sm float-right">
                                <input class="c-switch-input" type="checkbox"
                                    checked=""><span class="c-switch-slider"
                                    data-checked="On" data-unchecked="Off"></span>
                            </label>
                        </div>
                        <div><small class="text-muted">Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.</small>
                        </div>
                    </div>
                    <div class="c-aside-options">
                        <div class="clearfix mt-3"><small><b>Option 2</b></small>
                            <label class="c-switch c-switch-label c-switch-pill
                                c-switch-success c-switch-sm float-right">
                                <input class="c-switch-input" type="checkbox"><span
                                    class="c-switch-slider" data-checked="On"
                                    data-unchecked="Off"></span>
                            </label>
                        </div>
                        <div><small class="text-muted">Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.</small>
                        </div>
                    </div>
                    <div class="c-aside-options">
                        <div class="clearfix mt-3"><small><b>Option 3</b></small>
                            <label class="c-switch c-switch-label c-switch-pill
                                c-switch-success c-switch-sm float-right">
                                <input class="c-switch-input" type="checkbox"><span
                                    class="c-switch-slider" data-checked="On"
                                    data-unchecked="Off"></span>
                            </label>
                        </div>
                    </div>
                    <div class="c-aside-options">
                        <div class="clearfix mt-3"><small><b>Option 4</b></small>
                            <label class="c-switch c-switch-label c-switch-pill
                                c-switch-success c-switch-sm float-right">
                                <input class="c-switch-input" type="checkbox"
                                    checked=""><span class="c-switch-slider"
                                    data-checked="On" data-unchecked="Off"></span>
                            </label>
                        </div>
                    </div>
                    <hr>
                    <h6>System Utilization</h6>
                    <div class="text-uppercase mb-1 mt-4"><small><b>CPU Usage</b></small>
                    </div>
                    <div class="progress progress-xs">
                        <div class="progress-bar bg-info" role="progressbar"
                            style="width: 25%" aria-valuenow="25" aria-valuemin="0"
                            aria-valuemax="100">
                    </div>
                    </div>
                    <small class="text-muted">348 Processes. 1/4 Cores.</small>
                    <div class="text-uppercase mb-1 mt-2"><small><b>Memory Usage</b></small>
                    </div>
                    <div class="progress progress-xs">
                        <div class="progress-bar bg-warning" role="progressbar"
                            style="width: 70%" aria-valuenow="70" aria-valuemin="0"
                            aria-valuemax="100"></div>
                    </div>
                    <small class="text-muted">11444GB/16384MB</small>
                    <div class="text-uppercase mb-1 mt-2"><small><b>SSD 1 Usage</b></small>
                    </div>
                    <div class="progress progress-xs">
                        <div class="progress-bar bg-danger" role="progressbar"
                            style="width: 95%" aria-valuenow="95" aria-valuemin="0"
                            aria-valuemax="100"></div>
                    </div>
                    <small class="text-muted">243GB/256GB</small>
                    <div class="text-uppercase mb-1 mt-2"><small><b>SSD 2 Usage</b></small>
                    </div>
                    <div class="progress progress-xs">
                        <div class="progress-bar bg-success" role="progressbar"
                            style="width: 10%" aria-valuenow="10" aria-valuemin="0"
                            aria-valuemax="100"></div>
                    </div>
                    <small class="text-muted">25GB/256GB</small>
                </div>
            </div>
        </div>
        
        <div class="c-wrapper">
            <header class="c-header c-header-light c-header-fixed">
                <button class="c-header-toggler c-class-toggler d-lg-none mfe-auto" type="button" data-target="#sidebar" data-class="c-sidebar-show">
                    <div class="c-icon c-icon-lg">
                        <i class="cil-menu"></i>
                    </div>
                </button>
                <button class="c-header-toggler c-class-toggler mfs-3 d-md-down-none" type="button" data-target="#sidebar" data-class="c-sidebar-lg-show" responsive="true">
                    <div class="c-icon c-icon-lg">
                        <i class="cil-menu"></i>
                    </div>
                </button>
                <ul class="c-header-nav d-md-down-none">
                    <li class="c-header-nav-item px-3"><a class="c-header-nav-link" href="#">Dashboard</a></li>
                    <li class="c-header-nav-item px-3"><a class="c-header-nav-link" href="#">Usuarios</a></li>
                    <li class="c-header-nav-item px-3"><a class="c-header-nav-link" href="#">Settings</a></li>
                </ul>
                <ul class="c-header-nav mfs-auto">
                    <li class="c-header-nav-item px-3 c-d-legacy-none">
                        <button class="c-class-toggler c-header-nav-btn" type="button" id="header-tooltip" data-target="body" data-class="c-dark-theme" data-toggle="c-tooltip" data-placement="bottom" title="Toggle Light/Dark Mode" data-original-title="Toggle Light/Dark Mode">
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
                        <a class="c-header-nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                            <div class="c-icon">
                                <i class="cil-bell"></i>
                            </div>              
                            <span class="badge badge-pill badge-danger">5</span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg pt-0">
                            <div class="dropdown-header bg-light">
                                <strong>You have 6 notifications</strong>
                            </div>
                            <a class="dropdown-item" href="#">
                                <div class="c-icon mfe-2 text-success">
                                    <i class="cil-user-follow"></i>
                                </div>
                                New user registered
                            </a>
                            <a class="dropdown-item" href="#">
                                <div class="c-icon mfe-2 text-danger">
                                    <i class="cil-user-unfollow"></i>
                                </div>
                                User deleted
                            </a>
                            <a class="dropdown-item" href="#">
                                <div class="c-icon mfe-2 text-info">
                                    <i class="cil-chart"></i>
                                </div>
                                Sales report is ready
                            </a>
                            <a class="dropdown-item" href="#">
                                <div class="c-icon mfe-2 text-success">
                                    <i class="cil-basket"></i>
                                </div>
                                New client
                            </a>
                            <a class="dropdown-item" href="#">
                                <div class="c-icon mfe-2 text-warning">
                                    <i class="cil-speedometer"></i>
                                </div>
                                Server overloaded
                            </a>
                            <div class="dropdown-header bg-light">
                                <strong>Server</strong>
                            </div>
                            <a class="dropdown-item d-block" href="#">
                                <div class="text-uppercase mb-1">
                                    <small><b>CPU Usage</b></small>
                                </div>
                                <span class="progress progress-xs">
                                    <div class="progress-bar bg-info" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                    </div>
                                </span>
                                <small class="text-muted">348 Processes. 1/4 Cores.</small>
                            </a>
                            <a class="dropdown-item d-block" href="#">
                                <div class="text-uppercase mb-1">
                                    <small><b>Memory Usage</b></small>
                                </div>
                                <span class="progress progress-xs">
                                    <div class="progress-bar bg-warning" role="progressbar" style="width: 70%" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
                                    </div>
                                </span>
                                <small class="text-muted">11444GB/16384MB</small>
                            </a>
                            <a class="dropdown-item d-block" href="#">
                                <div class="text-uppercase mb-1">
                                    <small><b>SSD 1 Usage</b></small>
                                </div>
                                <span class="progress progress-xs">
                                    <div class="progress-bar bg-danger" role="progressbar" style="width: 95%" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100">
                                    </div>
                                </span>
                                <small class="text-muted">243GB/256GB</small>
                            </a>
                        </div>
                    </li>
                    <li class="c-header-nav-item dropdown mx-2">
                        <a class="c-header-nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                            <div class="c-icon">
                                <i class="cil-list-rich"></i>
                            </div>
                            <span class="badge badge-pill badge-warning">15</span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg pt-0">
                            <div class="dropdown-header bg-light"><strong>You have 5 pending tasks</strong></div>
                            <a class="dropdown-item d-block" href="#">
                                <div class="small mb-1">Upgrade NPM &amp; Bower
                                    <span class="float-right"><strong>0%</strong></span>
                                </div>
                                <span class="progress progress-xs">
                                    <div class="progress-bar bg-info" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                                    </div>
                                </span>
                            </a>
                            <a class="dropdown-item d-block" href="#">
                                <div class="small mb-1">ReactJS Version
                                    <span class="float-right"><strong>25%</strong></span>
                                </div>
                                <span class="progress progress-xs">
                                    <div class="progress-bar bg-danger" role="progressbar" style="width:
                                        25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                    </div>
                                </span>
                            </a>
                            <a class="dropdown-item d-block" href="#">
                                <div class="small mb-1">VueJS Version
                                    <span class="float-right"><strong>50%</strong></span>
                                </div>
                                <span class="progress progress-xs">
                                    <div class="progress-bar bg-warning" role="progressbar" style="width:
                                        50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                    </div>
                                </span>
                            </a>
                            <a class="dropdown-item d-block" href="#">
                                <div class="small mb-1">Add new layouts
                                    <span class="float-right"><strong>75%</strong></span>
                                </div>
                                <span class="progress progress-xs">
                                    <div class="progress-bar bg-info" role="progressbar" style="width: 75%"
                                        aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    </div>
                                </span>
                            </a>
                            <a class="dropdown-item d-block" href="#">
                                <div class="small mb-1">Angular 8 Version
                                    <span class="float-right"><strong>100%</strong></span>
                                </div>
                                <span class="progress progress-xs">
                                    <div class="progress-bar bg-success" role="progressbar" style="width:
                                        100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                                    </div>
                                </span>
                            </a>
                            <a class="dropdown-item text-center border-top" href="#">
                                <strong>View all tasks</strong>
                            </a>
                        </div>
                    </li>
                    <li class="c-header-nav-item dropdown mx-2">
                        <a class="c-header-nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                            <div class="c-icon">
                                <i class="cil-envelope-open"></i>
                            </div>
                            <span class="badge badge-pill badge-info">7</span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg pt-0">
                            <div class="dropdown-header bg-light">
                                <strong>You have 4 messages</strong>
                            </div>
                            <a class="dropdown-item" href="#">
                                <div class="message">
                                    <div class="py-3 mfe-3 float-left">
                                        <div class="c-avatar">
                                                <img class="c-avatar-img"
                                                src="assets/img/avatars/7.jpg" alt="user@email.com">
                                                <span class="c-avatar-status bg-success">
                                                </span>
                                        </div>
                                    </div>
                                    <div><small class="text-muted">John Doe</small><small class="text-muted
                                            float-right mt-1">Just now</small>
                                    </div>
                                    <div class="text-truncate font-weight-bold"><span class="text-danger">!</span>
                                        Important message
                                    </div>
                                    <div class="small text-muted text-truncate">Lorem ipsum dolor sit amet,
                                        consectetur adipisicing elit, sed do eiusmod tempor incididunt...
                                    </div>
                                </div>
                            </a>
                            <a class="dropdown-item" href="#">
                                <div class="message">
                                    <div class="py-3 mfe-3 float-left">
                                        <div class="c-avatar"><img class="c-avatar-img"
                                                src="assets/img/avatars/6.jpg" alt="user@email.com">
                                                <span class="c-avatar-status bg-warning"></span>
                                        </div>
                                    </div>
                                    <div><small class="text-muted">John Doe</small><small class="text-muted
                                            float-right mt-1">5 minutes ago</small>
                                    </div>
                                    <div class="text-truncate font-weight-bold">Lorem ipsum dolor sit amet                            
                                    </div>
                                    <div class="small text-muted text-truncate">Lorem ipsum dolor sit amet,
                                        consectetur adipisicing elit, sed do eiusmod tempor incididunt...
                                    </div>
                                </div>
                            </a>
                            <a class="dropdown-item" href="#">
                                <div class="message">
                                    <div class="py-3 mfe-3 float-left">
                                        <div class="c-avatar"><img class="c-avatar-img"
                                                src="assets/img/avatars/5.jpg" alt="user@email.com">
                                                <span class="c-avatar-status bg-danger"></span>
                                        </div>
                                    </div>
                                    <div><small class="text-muted">John Doe</small><small class="text-muted
                                            float-right mt-1">1:52 PM</small>
                                    </div>
                                    <div class="text-truncate font-weight-bold">Lorem ipsum dolor sit amet                            
                                    </div>
                                    <div class="small text-muted text-truncate">Lorem ipsum dolor sit amet,
                                        consectetur adipisicing elit, sed do
                                        eiusmod tempor incididunt...
                                    </div>
                                </div>
                            </a>
                            <a class="dropdown-item" href="#">
                                <div class="message">
                                    <div class="py-3 mfe-3 float-left">
                                        <div class="c-avatar">
                                            <img class="c-avatar-img" src="assets/img/avatars/4.jpg" alt="user@email.com">
                                            <span class="c-avatar-status bg-info"></span>
                                        </div>
                                    </div>
                                    <div><small class="text-muted">John Doe</small><small class="text-muted
                                            float-right mt-1">4:03 PM</small>
                                    </div>
                                    <div class="text-truncate font-weight-bold">Lorem ipsum dolor sit amet

                                    </div>
                                    <div class="small text-muted text-truncate">Lorem ipsum dolor sit amet,
                                        consectetur adipisicing elit, sed do eiusmod tempor incididunt...
                                    </div>
                                </div>
                            </a>
                            <a class="dropdown-item text-center border-top" href="#">
                                <strong>View all messages</strong>
                            </a>
                        </div>
                    </li>
                    <li class="c-header-nav-item dropdown">
                        <a class="c-header-nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                            <div class="c-avatar"><img class="c-avatar-img"
                                    src="assets/img/avatars/6.jpg" alt="user@email.com">
                            </div>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right pt-0">
                            <div class="dropdown-header bg-light py-2">
                                <strong>Cuenta</strong>
                            </div>
                            <a class="dropdown-item" href="#">
                                <div class="c-icon mfe-2">
                                    <i class="cil-bell"></i>
                                </div>
                                Updates<span class="badge badge-info mfs-auto">42</span>
                            </a>
                            <a class="dropdown-item" href="#">
                                <div class="c-icon mfe-2">
                                    <i class="cil-envelope-open"></i>
                                </div>
                                Messages<span class="badge badge-success mfs-auto">42</span>
                            </a>
                            <a class="dropdown-item" href="#">
                                <div class="c-icon mfe-2">
                                    <i class="cil-task"></i>
                                </div>
                                Tasks<span class="badge badge-danger mfs-auto">42</span>
                            </a>
                            <a class="dropdown-item" href="#">
                                <div class="c-icon mfe-2">
                                    <i class="cil-comment-square"></i>
                                </div>
                                Comments<span class="badge badge-warning mfs-auto">42</span>
                            </a>
                            <div class="dropdown-header bg-light py-2">
                                <strong>Settings</strong>
                            </div>
                            <a id="btn-profile" class="dropdown-item" href="#" data-toggle="modal" data-target="#userProfile">
                                <div class="c-icon mfe-2">
                                    <i class="cil-user"></i>
                                </div>
                                Perfil
                            </a>
                            <a class="dropdown-item" href="#">
                                <div class="c-icon mfe-2">
                                    <i class="cil-settings"></i>
                                </div>
                                Settings
                            </a>
                            <a class="dropdown-item" href="#">
                                <div class="c-icon mfe-2">
                                    <i class="cil-credit-card"></i>
                                </div>
                                Payments<span class="badge badge-secondary mfs-auto">42</span>
                            </a>
                            <a class="dropdown-item" href="#">
                            <div class="c-icon mfe-2">
                                    <i class="cil-file"></i>
                                </div>
                                Projects<span class="badge badge-primary mfs-auto">42</span>
                            </a>
                            <div class="dropdown-divider">
                            </div>
                            <a class="dropdown-item" href="#">
                                <div class="c-icon mfe-2">
                                    <i class="cil-lock-locked"></i>
                                </div>
                                Lock Account</a>
                            <a class="dropdown-item" href="#">
                                <div class="c-icon mfe-2">
                                    <i class="cil-account-logout"></i>
                                </div>
                                Logout
                            </a>
                        </div>
                    </li>
                    <button class="c-header-toggler c-class-toggler mfe-md-3" type="button" data-target="#aside" data-class="c-sidebar-show">
                        <div class="c-icon c-icon-lg">
                            <i class="cil-applications-settings"></i>
                        </div>
                    </button>
                </ul>
                <div class="c-subheader justify-content-between px-3">
                    <ol class="breadcrumb border-0 m-0 px-0 px-md-3">
                        <li class="breadcrumb-item">Home</li>
                        <li class="breadcrumb-item"><a href="#">Admin</a></li>
                        <li class="breadcrumb-item active">Dashboard</li>
                    </ol>
                    <div class="c-subheader-nav d-md-down-none mfe-2">
                        <a class="c-subheader-nav-link" href="#">
                            <div class="c-icon mfe-2">
                                <i class="cil-speech"></i>
                            </div>
                        </a>
                        <a class="c-subheader-nav-link" href="#">
                            <div class="c-icon mfe-2">
                                <i class="cil-graph"></i>
                            </div>  
                            &nbsp;Dashboard
                        </a>
                        <a class="c-subheader-nav-link" href="#">
                            <div class="c-icon mfe-2">
                                <i class="cil-settings"></i>
                            </div>
                            &nbsp;Settings
                        </a>
                    </div>
                </div>
            </header>

            <div class="c-body">
                
            @yield('contenido.contenido')

            </div>
                <footer  style="background-color:white"> 
 <div class="container justify-content-center text-center" style="background-color:white">

     <img src="img/pleca-gob.png" alt="" width="300px" height="200px"  class="img-fluid img-rounded" >
                  
                    <img src="img/logo_ipn.png" alt="" width="300px" height="150px"  class="img-fluid img-rounded" >  
                </div>
             </footer>
<footer class="app-footer justify-content-center" style="background-color:rgb(205,164,52);" >
<div class="container justify-content-center text-center" style="background-color:rgb(205,164,52);">
<p >    ©   Centro de Investigación en Computación. Todos los derechos reservados.<br>
Av. Juan de Dios Bátiz, Esq. Miguel Othón de Mendizábal | Col. Nueva Industrial Vallejo, Gustavo A. Madero | C.P. 07738 | Ciudad de México
                    </p>
                    </div>   
    </footer>

            
            
        </div>

        <!-- Modal User Profile-->
            <user-modal-component v-bind:id_user_props="{{ Auth::user()->id }}"></user-modal-component>
        <!--end Modal User profile -->

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
    <script type="text/javascript" src="js/main.js" class="view-script">
    </script>
    <script src="js/sweetalert2.all.min.js"></script>

</body>

</html>