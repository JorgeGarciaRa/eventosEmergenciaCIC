<!DOCTYPE html>
<html lang="es">
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Sistema de Deteccion de Eventos de Emergencia">
    <meta name="keyword" content="Sistema de Deteccion de Eventos de Emergencia">

    <title>Sistema de Detección de Eventos de Emergencia</title>

    <link href="css/plantilla.css" rel="stylesheet">

</head>



<body id="page-top" class="politics_version">


    <div id="preloader">
        <div id="main-ld">
            <div id="loader"></div>
        </div>
    </div>

    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav" style="background-color:gray">
        <div class="container">
            <a class="navbar-brand js-scroll-trigger" href="#page-top">

                <img class="img-fluid" src="img/3.jpg" alt="" />
            </a>
            <button class="navbar-toggler navbar-toggler-right" style="background-color:black" type="button"
                data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive"
                aria-expanded="false" aria-label="Toggle navigation">
                Menú
                <i class="fa fa-bars"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav text-uppercase ml-auto">
                    <li class="nav-item">
                        <a class="nav-link js-scroll-trigger active" href="{{route('inicio')}}"
                            style="background-color:gray">Acerca de</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link js-scroll-trigger active" href="{{route('showlogin')}}"
                            style="background-color:gray">Iniciar Sesión</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link js-scroll-trigger active  btn btn-primary px-4 "
                            href="{{route('registro')}}">Regístrate</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <br>
    <br>


    <div id="home" class="main-banner parallaxie"
        style="background:url('img/b1.jpg') ; background-Repeat:no-repeat;background-Attachment:fixed;background-position: center center">
        <div class="heading">

            <br>



            <div id="home" class="main-banner parallaxie ">
                <div class="heading  text-center text-white">
                    <h1>Centro de Investigación en Computación (CIC)</h1>
                    <br>

                    <h3 class="cd-headline clip is-full-width">
                        <span> Laboratorio Cómputo Inteligente</span>


                        <div class="btn-ber">
                        </div>
                    </h3>

                </div>
            </div>


            <div class="col-sm-4 col-md-5 ">
                <div class="card-body ">
                    <div class="jumbotron" style="background-color:white">
                        <h3 class="display-5">¡Inicia sesión en tu cuenta!</h3>
                        <hr class="my-4">
                        <p>Sistema de detectección de eventos de emergencia aplicando técnicas de minería de texto, con
                            base en información proveniente de redes sociales.</p>
                        <p class="lead"><a class="btn btn-primary btn-lg" href="{{route('showlogin')}}"
                                role="button">Iniciar Sesión</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br>

    <div id="about" class="section wb">
        <div class="container">
            <div class="row">
                <div class="col-md-6 ">
                    <div class="message-box">
                        <h2>Objetivo del Sistema</h2>
                        <br>
                        <p>El sistema tienen como principal función detectar automáticamente eventos de emergencia, para
                            esto se aplican técnicas de minería de texto, con base en información proveniente de redes
                            sociales y la información será transmitida a través de las interfaces de este, de esta
                            manera se logrará prevenir de algún incidente cerca de la zona de los usuarios,
                            proporcionando una alerta a tiempo se logrará disminuir el impacto de daños, así como
                            proporcionar al usuario información oportuna para una toma de decisión.</p>
                        <br>
                        <div class="col-md-7 justify-content-center">
                            <div class="right-box-pro wow fadeIn justify-content-center">
                                <img src="img/nube.jpg" alt="" class="img-fluid img-rounded ">
                            </div><!-- end media -->
                        </div>
                    </div><!-- end messagebox -->
                </div><!-- end col -->

                <div class="col-md-6">
                    <div class="right-box-pro wow fadeIn">
                        <img src="img/tabla2.jpg" alt="" class="img-fluid img-rounded">
                    </div><!-- end media -->
                </div><!-- end col -->
            </div><!-- end row -->
        </div><!-- end container -->
    </div>



    <hr class="my-4">


    <section id="services" class="section parallax dark"
        style="background:url('img/proceso.jpg') ; background-Repeat:no-repeat;background-Attachment:fixed;background-position: center center">
        <div class="container">
            <div class="row">
                <div id="about" class="section wb">
                    <div class="container">

                        <div class="row">




                            <div class="col-md-12">
                                <div class="message-box">
                                    <h2>Fases del Sistema</h2>
                                    <br> <br>
                                    <br><br><br><br><br><br><br><br><br><br>



                                </div><!-- end messagebox -->

                            </div><!-- end col -->



                        </div><!-- end row -->
                    </div><!-- end container -->
                </div>

            </div>
        </div>
    </section>




    <br>


    <hr class="my-4">

    <br>
    <div id="about" class="section wb">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="message-box">
                        <h2>Zona de Monitoreo</h2>
                        <br>
                        <p>Se definió un cuadro delimitador para identificar el área posible donde ocurren los eventos.
                            Para este caso específico tweets publicados en la Alcaldía Gustavo A. Madero de la CDMX, ya
                            que el IPN-Zacatenco se encuentra ubicado en esta zona, la cual es la segunda alcaldía más
                            poblada de la ciudad, su territorio abarca 94.07 kilómetros cuadrados que corresponden al
                            6.1 % del territorio de la capital del país. </p>

                    </div><!-- end messagebox -->
                </div><!-- end col -->

                <div class="col-md-6">
                    <div class="right-box-pro wow fadeIn">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d9614.778721183538!2d-99.14846653913989!3d19.50191930617906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2smx!4v1588959606756!5m2!1ses!2smx"
                            width="100%" height="350" frameborder="0" style="border:0;" allowfullscreen></iframe>

                    </div><!-- end media -->
                </div><!-- end col -->
            </div><!-- end row -->
        </div><!-- end container -->
    </div>
    <br><br>


    <br>
    <hr class="my-4">


    <br>

    <section class="section" id="services">
        <div class="container">
            <h2 class="text-center mt-0">Trabajos Futuros</h2>
            <hr class="divider my-4">
            <div class="row">
                <div class="col-lg-3 col-md-6 text-center">
                    <div class="mt-5">
                        <i class="fas fa-4x fa-gem text-primary mb-4"></i>
                        <h3 class="h4 mb-2">Accesorios alternativos</h3>
                        <p class="text-muted mb-0">Complementos de hardware que aumentaran tus experiencias con la
                            tecnología</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 text-center">
                    <div class="mt-5">
                        <h3 class="h4 mb-2">Trabajo con Rasberry</h3>
                        <p class="text-muted mb-0">Capacidades y caracteristicas adaptables a tus necesidades</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 text-center">
                    <div class="mt-5">
                        <h3 class="h4 mb-2">Agregar eventos de emergencia</h3>
                        <p class="text-muted mb-0">Capacidades extremas!</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 text-center">
                    <div class="mt-5">
                        <h3 class="h4 mb-2"> Mejorar Servicios del Sistema</h3>
                        <p class="text-muted mb-0">Una oportunidad unica para tu negocio</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <br>

    <footer style="background-color:white">
        <div class="container justify-content-center text-center" style="background-color:white">

            <img src="img/pleca-gob.png" alt="" width="300px" height="200px" class="img-fluid img-rounded">

            <img src="img/logo_ipn.png" alt="" width="300px" height="150px" class="img-fluid img-rounded">
        </div>
    </footer>
    <footer class="app-footer justify-content-center" style="background-color:rgb(205,164,52);">
        <div class="container justify-content-center text-center" style="background-color:rgb(205,164,52);">
            <p> © Centro de Investigación en Computación. Todos los derechos reservados.<br>
                Av. Juan de Dios Bátiz, Esq. Miguel Othón de Mendizábal | Col. Nueva Industrial Vallejo, Gustavo A.
                Madero | C.P. 07738 | Ciudad de México
            </p>
        </div>
    </footer>





    <!-- Bootstrap and necessary plugins -->

    <script src="js/plantilla.js"></script>



</body>

</html>
