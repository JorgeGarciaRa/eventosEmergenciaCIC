<template>
    <main class="main">
        <!-- Breadcrumb -->
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Escritorio</a></li>
        </ol>
        <div class="container-fluid">
            <!-- Ejemplo de tabla Listado -->
            <div class="card">
                <div class="card-header bg-gradient- Light" style="background-color:rgb(177, 183, 193)">
                    <div class="row justify-content-between">
                        <div class="text-value-lg" style="color:black;">Categoría Salud</div>&nbsp;
                        <div>
                            <button type="button" @click="abrirModal('tweetsalud','registrar')"
                                class="content:right btn btn-secondary">
                                <i class="icon-plus"></i>&nbsp;Nuevo
                            </button>

                            <button type="button" @click="cargarPdf()" class="btn btn-info">
                                <i class="icon-doc"></i>&nbsp;Reporte
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="form-group row ">
                        <div class="col-md-6">
                            <label for="">Selecciona un criterio de Búsqueda</label>
                            <div class="input-group">
                                <select class="form-control col-md-3" v-model="criterio">
                                    <option value="texto">Tweet</option>
                                    <option value="ubicacion">Ubicación</option>
                                    <option value="fecha">Fecha</option>
                                </select>
                                <input type="text" v-model="buscar" @keyup.enter="listarTweetsalud(1,buscar,criterio)"
                                    class="form-control" placeholder="Texto a buscar">
                                <button type="submit" @click="listarTweetsalud(1,buscar,criterio)"
                                    class="btn btn-primary"><i class="fa fa-search"></i> Buscar</button>


                            </div>
                        </div>
                        <div v-if="criterio== 'fecha'">
                            <div class="col-md-12">
                                <label for="">Selecciona Fecha</label>
                                <div class="input-group">

                                    <input type="date" v-model="buscar"
                                        @keyup.enter="listarTweetsalud(1,buscar,criterio)" name="due_date"
                                        class="form-control">

                                    <button type="submit" @click="listarTweetsalud(1,buscar,criterio)"
                                        class="btn btn-info"><i class="fa fa-search"></i> Buscar</button>

                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <a><span> </span></a>
                        </div>
                    </div>




                    <div class="row">
                        <div class="col-sm-6 col-lg-4" v-for="tweetsalud in arrayTweetsalud" :key="tweetsalud.id">
                            <div class="card">
                                <div
                                    class="card-header text-white bg-gradient-success pb-0 d-flex justify-content-between align-items-start">
                                    <br />
                                    <div>
                                        <div class="text-value cil-calendar">&nbsp;Fecha:</div>
                                        <td class="text-value" v-text="tweetsalud.fecha"></td>
                                        <br />
                                        <div class="text-value cib-twitter">&nbsp;Tweet:</div>
                                        <td class="text-value" v-text="tweetsalud.texto"></td>
                                    </div>

                                    <div class="btn-group">
                                        <button class="btn btn-transparent dropdown-toggle p-0 cil-map" type="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                        <div class="dropdown-menu dropdown-menu-right">
                                              <a    class="dropdown-item"  @click="mostrarMapa(tweetsalud.coordenadas)">Ver en
                                                Mapa</a>

                                        </div>
                                    </div>
                                </div>
                                <div class="card-body row text-center">
                                    <div class="col">
                                        <div class="text-value icon-map">&nbsp;Ubicación</div>
                                        <div class="text-uppercase">
                                            <td v-text="tweetsalud.ubicacion"></td>
                                        </div>
                                    </div>
                                    <div class="c-vr"></div>
                                    <div class="col">
                                        <div class="text-value icon-people">&nbsp;Cuenta</div>
                                        <div class="text-uppercase">
                                            <td v-text="tweetsalud.cuenta_verificada"></td>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>






                    <div class="row justify-content-between">
                         <nav>
                        <ul class="pagination">
                            <li class="page-item" v-if="pagination.current_page > 1">
                                <a class="page-link" href="#"
                                    @click.prevent="cambiarPagina(pagination.current_page - 1,buscar,criterio)">Ant</a>
                            </li>
                            <li class="page-item" v-for="page in pagesNumber" :key="page"
                                :class="[page == isActived ? 'active' : '']">
                                <a class="page-link" href="#" @click.prevent="cambiarPagina(page,buscar,criterio)"
                                    v-text="page"></a>
                            </li>
                            <li class="page-item" v-if="pagination.current_page < pagination.last_page">
                                <a class="page-link" href="#"
                                    @click.prevent="cambiarPagina(pagination.current_page + 1,buscar,criterio)">Sig</a>
                            </li>
                        </ul>
                    </nav>
                          <div>
                            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#tiposCModal">
                                <i class="icon-doc"></i>&nbsp;Tipos de cuentas 
                            </button>
                        </div>
                    </div>


                    
                           <div class="container-fluid">
                              <div class="card card-accent">
                              <div class="card-header">Mapa</div>
                                       <div id="mapid" style="height: 250px;"></div>
                           
                                   </div>
                            </div>
                   
                </div>
             
            </div>
            <!-- Fin ejemplo de tabla Listado -->
        </div>
       

         <div class="modal fade" id="tiposCModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
            style="display: none;" aria-hidden="true">
            <div class="modal-dialog modal-info" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Tipos de cuentas en Twitter</h4>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">×</span></button>
                    </div>
                    <div class="modal-body">
                        <h2> Cuenta Verificada  </h2>
                        <p> Es aquella que se determina que es de interés público.<br>
                         Generalmente, se trata de cuentas de usuarios que pertenecen al ámbito de la música, 
                         la actuación, la moda, el gobierno, la política, la religión, el periodismo, los medios de comunicación,
                        los deportes, los negocios y otras áreas de interés clave.</p>    
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
            style="display: none;" aria-hidden="true">
            <div class="modal-dialog modal-success" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Mapa del Área del Tweet</h4>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">×</span></button>
                    </div>
                    <div class="modal-body">
                        <div id="mapid" style="height: 280px;"></div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>

        <!--Inicio del modal agregar-->
        <div class="modal fade" tabindex="-1" :class="{'mostrar' : modal}" role="dialog" aria-labelledby="myModalLabel"
            style="display: none;" aria-hidden="true">
            <div class="modal-dialog modal-primary modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" v-text="tituloModal"></h4>
                        <button type="button" class="close" @click="cerrarModal()" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="email-input">Texto</label>
                                <div class="col-md-9">
                                    <input type="email" v-model="texto" class="form-control"
                                        placeholder="Ingrese el evento de emergencia">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="email-input">Ubicación</label>
                                <div class="col-md-9">
                                    <input type="email" v-model="ubicacion" class="form-control"
                                        placeholder="Ingrese la ubicación del evento">
                                </div>
                            </div>
                            <div v-show="errorTweetsalud" class="form-group row div-error">
                                <div class="text-center text-error">
                                    <div v-for="error in errorMostrarMsjTweetsalud" :key="error" v-text="error">

                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="cerrarModal()">Cerrar</button>
                        <button type="button" v-if="tipoAccion==1" class="btn btn-primary"
                            @click="registrarTweetsalud()"> Guardar</button> </div>
                    <button type="button" v-if="tipoAccion==2" class="btn btn-primary"
                        @click="actualizarCategoria()">Actualizar</button>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
    </main>
</template>

<script>
    export default {
        data (){
            return {
                tweetsalud_id: 0,
   
                texto : '',
                 ubicacion : '',
                arrayTweetsalud : [],
                modal : 0,
                tituloModal : '',
                tipoAccion : 0,
                 errorTweetsalud : 0,
                errorMostrarMsjTweetsalud: [],
                pagination : {
                    'total' : 0,
                    'current_page' : 0,
                    'per_page' : 0,
                    'last_page' : 0,
                    'from' : 0,
                    'to' : 0,
                },
                offset : 3,
                criterio : 'texto',
                buscar : ''
            }
        },
        computed:{
            isActived: function(){
                return this.pagination.current_page;
            },
            //Calcula los elementos de la paginación
            pagesNumber: function() {
                if(!this.pagination.to) {
                    return [];
                }
                
                var from = this.pagination.current_page - this.offset; 
                if(from < 1) {
                    from = 1;
                }

                var to = from + (this.offset * 2); 
                if(to >= this.pagination.last_page){
                    to = this.pagination.last_page;
                }  

                var pagesArray = [];
                while(from <= to) {
                    pagesArray.push(from);
                    from++;
                }
                return pagesArray;             

            }
        },
        methods : {
            listarTweetsalud(page,buscar,criterio){
                let me=this;
                var url= '/tweetsalud?page=' + page + '&buscar='+ buscar + '&criterio='+ criterio;
                axios.get(url).then(function (response) {
                    var respuesta= response.data;
                    me.arrayTweetsalud = respuesta.tweetsalud.data;
                    me.pagination= respuesta.pagination;
                     if(me.arrayTweetsalud.length==0){
                             Swal.fire({
                                icon:'success',
                                title:'Intenta con otra busqueda',
                            })
                            me.buscar=''
                            me.criterio='texto'
                            me.listarTweetsalud(1, me.buscar, me.criterio);
                        }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },

           
             cargarMapa(){
                this.mymap = L.map("mapid").setView([19.502978,-99.147548], 13);
                                            
                L.tileLayer(
                    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
                    {
                        attribution:
                            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                        maxZoom: 18,
                        id: "mapbox/streets-v11",
                        tileSize: 512,
                        zoomOffset: -1,
                        accessToken:
                            "pk.eyJ1Ijoiam9yZ2VyYW1pcmV6Z2FyY2lhIiwiYSI6ImNrYzFsajZzMDAyaDYycm8xZWhyaHdibzkifQ.LqfW8A_0AklgKMX-x45Svw"
                    }

                ).addTo(this.mymap);
                console.log("mapa cargado")
            },
            mostrarMapa(coord) {
            
                console.log(coord)
                let me = this
                let parsedGeoJson = JSON.parse(coord)
                console.log(typeof parsedGeoJson)
                console.log(parsedGeoJson)

                if(me.area != null ){
                    me.mymap.removeLayer(me.area)
                  
                }

                let caracteristica = [{
                    "type": "Feature",
                    "properties": {"party": "Area"},
                    "geometry": {
                        "type": "Polygon",
                        "coordinates":  parsedGeoJson
                    }
                }];

                
                me.area = L.geoJSON(caracteristica, {
                    style: function(feature) {
                        switch (feature.properties.party) {
                            case 'Area': return {color: "#ff0000"};
                            case 'Democrat':   return {color: "#0000ff"};
                        }
                    }
                }).addTo(me.mymap);

                console.log("metodo mostrar mapa")

            },
            cambiarPagina(page, buscar, criterio) {
                let me = this;
                //Actualiza la página actual
                me.pagination.current_page = page;
                //Envia la petición para visualizar la data de esa página
                me.listarTweetsalud(page, buscar, criterio);
             },

             registrarTweetsalud(){
                if (this.validarTweetsalud()){
                    return;
                }
                let me = this;
                axios.post('/tweetsalud/registrar',{
                    
                    'texto': this.texto,
                    'ubicacion': this.ubicacion
                }).then(function (response) {
                    me.cerrarModal();
                    me.listarTweetsalud(1,'','texto');
                }).catch(function (error) {
                    console.log(error);
                });
            },
           validarTweetsalud(){
                this.errorTweetsalud=0;
                this.errorMostrarMsjTweetsalud =[];

                if (!this.texto) this.errorMostrarMsjTweetsalud.push("El texto del evento de emergencia no puede estar vacío.");
                if (!this.ubicacion) this.errorMostrarMsjTweetsalud.push("La ubicación del evento de emergencia no puede estar vacío.");

                if (this.errorMostrarMsjTweetsalud.length) this.errorTweetsalud = 1;

                return this.errorTweetsalud;
            },
            cargarPdf(){
             window.open('http://localhost:8000/tweetsalud/listarPdf','_blank');
            },
            
            cerrarModal(){
                this.modal=0;
                this.tituloModal='';
                this.nombre='';
                this.descripcion='';
            },

             abrirModal(modelo, accion, data = []){
                switch(modelo){
                    case "tweetsalud":
                    {
                        switch(accion){
                            case 'registrar':
                            {
                                this.modal = 1;
                                this.tituloModal = 'Registrar Evento de Emergencia de Salud';
                           
                                this.texto = '';
                                this.ubicacion = '';
                                 this.tipoAccion = 1;
                                break;
                            }

                            case 'actualizar':
                            {
                                //console.log(data);
                                this.modal=1;
                                this.tituloModal='Actualizar categoría';
                                this.tipoAccion=2;
                                this.categoria_id=data['id'];
                                this.nombre = data['nombre'];
                                this.descripcion= data['descripcion'];
                                break;
                            }
                        }
                    }
                }
            }


        },
        mounted() {
            this.listarTweetsalud(1,this.buscar,this.criterio);
            this.cargarMapa();
        }
    }
</script>
<style>    
    .modal-content{
        width: 100% !important;
        position: absolute !important;
    }
    .mostrar{
        display: list-item !important;
        opacity: 1 !important;
        position: absolute !important;
        background-color: #3c29297a !important;
    }
    .div-error{
        display: flex;
        justify-content: center;
    }
    .text-error{
        color: red !important;
        font-weight: bold;
    }
</style>
