
@extends('principal')
    @section('contenido')
<template>

    <main class="main">

        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/main">Escritorio</a></li>
        </ol>
        <div class="container-fluid">

            <div class="card">
                <div class="card-header bg-gradient- Light" style="background-color:rgb(177, 183, 193)">
                    <div class="row justify-content-between">
                        <div class="text-value-lg" style="color:black;">Bienvenido al Sistema </div>&nbsp;
                    </div>
                </div>
                <div class="card-body">
                   <div class="card">
                        <div class="card-body">
                                <div class="carousel slide" id="carruselVialidad" data-ride="carousel">
                                <ol class="carousel-indicators">
                                    <li class="active" data-target="#carruselVialidad" data-slide-to="0"></li>
                                    <li data-target="#carruselVialidad" data-slide-to="1"></li>
                                    <li data-target="#carruselVialidad" data-slide-to="2"></li>
                                </ol>
                                <div class="carousel-inner">
                                    <div class="carousel-item active"> <img src="img/avatars/vialidad11.jpg"
                                            alt="Second slide [800x400]" class="img-fluid img-rounded">
                                    </div>
                                    <div class="carousel-item"><img src="img/avatars/salud.jpg" alt="Second slide [800x400]"
                                            class="img-fluid img-rounded">
                                    </div>
                                    <div class="carousel-item"><img src="img/avatars/incendioss.jpg"
                                            alt="Second slide [800x400]" class="img-fluid img-rounded">
                                    </div>
                                </div>
                                <a class="carousel-control-prev" href="#carruselVialidad" role="button"
                                    data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span
                                        class="sr-only">Previous</span></a><a class="carousel-control-next"
                                    href="#carruselVialidad" role="button" data-slide="next"><span
                                        class="carousel-control-next-icon" aria-hidden="true"></span><span
                                        class="sr-only">Next</span>
                                </a>

                                  </div>
                        </div>
                    </div>
                    <br>
                    <br>

                           <div class="card">
                                    <div class="card-header">Datos del Sistemas</div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="row">
                                                    <div class="col-6">
                                                        <div class="c-callout c-callout-info"><small class="text-muted">Twets Recolectados</small>
                                                            <div class="text-value-lg">1,123</div>
                                                        </div>
                                                    </div>

                                                    <div class="col-6">
                                                        <div class="c-callout c-callout-danger"><small class="text-muted">Usuarios Registrados</small>
                                                            <div class="text-value-lg">123</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div class="col-sm-6">
                                                <div class="row">
                                                    <div class="col-6">
                                                        <div class="c-callout c-callout-warning"><small class="text-muted">Publicaciones en el sistema</small>
                                                            <div class="text-value-lg">23</div>
                                                        </div>
                                                    </div>

                                                    <div class="col-6">
                                                        <div class="c-callout c-callout-success"><small class="text-muted"> Número de Categorías </small>
                                                            <div class="text-value-lg"> 3</div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                            </div>
                        
                    

                    <div class="container-fluid">
                        <div class="fade-in" style="text-center">
                            <h2>Objetivos del Sistema de Detección de Eventos de Emergencia </h2>
                            <br>
                            <div class="row">

                                <!-- /.col-->
                                <div class="col-sm-6 col-md-4">
                                    <div class="card card-accent-info">

                                        <div class="card-body">Detectar automáticamente eventos de emergencia aplicando técnicas de minería de texto, con base en información proveniente de redes sociales para informar y 
                                            prevenir a la sociedad de eventos que pongan en riesgo su integridad.</div>
                                    </div>
                                </div>
                                <!-- /.col-->
                                <div class="col-sm-6 col-md-4">
                                    <div class="card card-accent-warning">

                                        <div class="card-body">•  Construir una base de conocimiento para almacenamiento y recuperación de la información.<br>
                                            •	Realizar el procesamiento de la información para limpieza y extracción de datos </div>
                                    </div>
                                </div>
                                <!-- /.col-->
                                <div class="col-sm-6 col-md-4">
                                    <div class="card card-accent-danger">

                                        <div class="card-body">•	Crear un modelo de arquitectura de datos, para la identificación de eventos de emergencia.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-12">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="img/cic.jpg" alt="" width="400px" height="200px"
                                    class="img-fluid img-rounded">
                            </div><!-- end col -->
                            <div class="col-md-6">
                                <div class="message-box">
                                    <h2>Campus Inteligente</h2>
                                    <br>
                                    <p>La Unidad Profesional Adolfo López
                                            Mateos (UPALM) cuenta con
                                            infraestructura similar al de cualquier
                                            territorio urbano: calles, accesos
                                            peatonales y viales,
                                            estacionamientos, edificios,
                                            luminarias, infraestructura de
                                            comunicaciones, gestión de aguas y
                                            residuos, centro médico,
                                            instalaciones deportivas, cafeterías,
                                            jardines, y actualmente enfrenta los
                                            mismos retos y necesidades que las
                                            universidades y ciudades modernas. </p>
                                </div><!-- end messagebox -->
                               
                            </div><!-- end col -->
                        </div>
                    </div>

                    <br>


                    <div class="col-sm-12">
                        <div class="row">
                            <div class="col-md-6">
                                 <div class="message-box">

                                    <h2>Eventos de Emergencia</h2>
                                    <br>
                                    <p>Para el campus inteligente CIC-IPN se identificaron los siguientes eventos que se desean clasificar de manera automática:<br>
                                            •	Marchas o movilizaciones.<br>
                                            •	Accidentes vehiculares.<br>
                                            •	Inundaciones.<br>
                                            •	Fugas de gases en industria.<br>
                                            •	Incendios.<br>
                                            Se clasifican en tres categorías movilidad, incendios y salud.
                                            </p>
                                </div><!-- end messagebox -->
                            </div><!-- end col -->

                            <div class="col-md-6">
                                <img src="img/fotot.jpg" alt="" width="400px" height="200px"
                                    class="img-fluid img-rounded">
                            </div><!-- end media -->
                        </div><!-- end col -->
                    </div><!-- end row -->

                    <br>
                    <br>

                    <div class="row">
                        <div class="col-sm-6 col-lg-4">
                            <div class="card">
                                <div class="card-header bg-facebook content-center">
                                    
                                </div>
                                <div class="card-body row text-center">
                                    <div class="col">
                                        <div class="text-value-xl">89k</div>
                                        <div class="text-uppercase text-muted small">friends</div>
                                    </div>
                                    <div class="c-vr"></div>
                                    <div class="col">
                                        <div class="text-value-xl">459</div>
                                        <div class="text-uppercase text-muted small">feeds</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6 col-lg-4">
                            <div class="card">
                                <div class="card-header bg-twitter content-center">
                                  
                                </div>
                                <div class="card-body row text-center">
                                    <div class="col">
                                        <div class="text-value-xl">973k</div>
                                        <div class="text-uppercase text-muted small">followers</div>
                                    </div>
                                    <div class="c-vr"></div>
                                    <div class="col">
                                        <div class="text-value-xl">1.792</div>
                                        <div class="text-uppercase text-muted small">tweets</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6 col-lg-4">
                            <div class="card">
                                <div class="card-header bg-linkedin content-center">
                               
                                </div>
                                <div class="card-body row text-center">
                                    <div class="col">
                                        <div class="text-value-xl">500+</div>
                                        <div class="text-uppercase text-muted small">contacts</div>
                                    </div>
                                    <div class="c-vr"></div>
                                    <div class="col">
                                        <div class="text-value-xl">292</div>
                                        <div class="text-uppercase text-muted small">feeds</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <br>
                    <br>
                    <div class="container-fluid">
                        <div class="card card-accent">
                            <div class="card-header">Mapa</div>
                            <div class="card-body">
                                <div id="about" class="section wb">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="right-box-pro wow fadeIn">
                                                    <iframe
                                                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d859.5752135367816!2d-99.14751121943505!3d19.50322696817091!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x78efe76dd0d5bbe1!2sCentro%20de%20Investigaci%C3%B3n%20en%20Computaci%C3%B3n%20del%20IPN!5e1!3m2!1ses!2smx!4v1590186922909!5m2!1ses!2smx"
                                                        width="100%" height="350" frameborder="0"
                                                        allowfullscreen></iframe>
                                                </div><!-- end media -->
                                            </div><!-- end col -->
                                        </div><!-- end row -->
                                    </div><!-- end container -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fin ejemplo de tabla Listado -->

    </main>

</template>

      

<script>
    export default {
       
        data() {
            return {
            
       
            }
        },
        methods: {
           mostrarInformacion(){
                let me=this
                var url= '/dashboard/datos';
                 axios.get(url).then(function (response) {
                    var respuesta= response.data;
                    var respuesta = response.data;
                  
                })

                .catch(function (error) {
                    console.log(error);
                });

            },
            
           
        },
        mounted() {
           
        },
    }

</script>