<template>
    <main class="main">
        <!-- Breadcrumb -->
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Escritorio</a></li>
        </ol>
        <div class="container-fluid">
            <!-- Ejemplo de tabla Listado -->
            <div class="card">
                <div class="card-header " style="background-color:rgb(235, 152, 78  )">
                    <i class="fa fa-align-justify"></i> Tweet Salud
                    <button type="button" @click="abrirModal('tweetsalud','registrar')" class="btn btn-secondary">
                        <i class="icon-plus"></i>&nbsp;Nuevo
                    </button>
                    <button type="button" @click="cargarPdf()" class="btn btn-info">
                        <i class="icon-doc"></i>&nbsp;Reporte
                    </button>
                </div>
                <div class="card-body">
                    <div class="form-group row">
                        <div class="col-md-6">
                            <div class="input-group">
                                <select class="form-control col-md-3" v-model="criterio">
                                    <option value="texto">Tweet</option>
                                    <option value="ubicacion">Ubicación</option>
                                </select>
                                <input type="text" v-model="buscar" @keyup.enter="listarTweetsalud(1,buscar,criterio)"
                                    class="form-control" placeholder="Texto a buscar">
                                <button type="submit" @click="listarTweetsalud(1,buscar,criterio)"
                                    class="btn btn-primary"><i class="fa fa-search"></i> Buscar</button>
                            </div>
                        </div>
                    </div>
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Tweet</th>
                                <th>Ubicación</th>
                                <th>Cuenta</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="tweetsalud in arrayTweetsalud" :key="tweetsalud.id">

                                <td v-text="tweetsalud.fecha"></td>
                                <td v-text="tweetsalud.texto"></td>
                                <td v-text="tweetsalud.ubicacion"></td>
                                <td v-text="tweetsalud.cuenta_verificada"></td>
                            </tr>
                        </tbody>
                    </table>
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
                </div>
            </div>
            <!-- Fin ejemplo de tabla Listado -->

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
        data() {
            return {
                tweetsalud_id: 0,

                texto: '',
                ubicacion: '',
                arrayTweetsalud: [],
                modal: 0,
                tituloModal: '',
                tipoAccion: 0,
                errorTweetsalud: 0,
                errorMostrarMsjTweetsalud: [],
                pagination: {
                    'total': 0,
                    'current_page': 0,
                    'per_page': 0,
                    'last_page': 0,
                    'from': 0,
                    'to': 0,
                },
                offset: 3,
                criterio: 'texto',
                buscar: ''
            }
        },
        computed: {
            isActived: function () {
                return this.pagination.current_page;
            },
            //Calcula los elementos de la paginación
            pagesNumber: function () {
                if (!this.pagination.to) {
                    return [];
                }

                var from = this.pagination.current_page - this.offset;
                if (from < 1) {
                    from = 1;
                }

                var to = from + (this.offset * 2);
                if (to >= this.pagination.last_page) {
                    to = this.pagination.last_page;
                }

                var pagesArray = [];
                while (from <= to) {
                    pagesArray.push(from);
                    from++;
                }
                return pagesArray;

            }
        },
        methods: {
            listarTweetsalud(page, buscar, criterio) {
                let me = this;
                var url = '/tweetsalud?page=' + page + '&buscar=' + buscar + '&criterio=' + criterio;
                axios.get(url).then(function (response) {
                    var respuesta = response.data;
                    me.arrayTweetsalud = respuesta.tweetsalud.data;
                    me.pagination = respuesta.pagination;
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            },


            cambiarPagina(page, buscar, criterio) {
                let me = this;
                //Actualiza la página actual
                me.pagination.current_page = page;
                //Envia la petición para visualizar la data de esa página
                me.listarTweetsalud(page, buscar, criterio);
            },
            registrarTweetsalud() {
                if (this.validarTweetsalud()) {
                    return;
                }
                let me = this;
                axios.post('/tweetsalud/registrar', {

                    'texto': this.texto,
                    'ubicacion': this.ubicacion
                }).then(function (response) {
                    me.cerrarModal();
                    me.listarTweetsalud(1, '', 'texto');
                }).catch(function (error) {
                    console.log(error);
                });
            },
            validarTweetsalud() {
                this.errorTweetsalud = 0;
                this.errorMostrarMsjTweetsalud = [];

                if (!this.texto) this.errorMostrarMsjTweetsalud.push("El texto del evento de emergencia no puede estar vacío.");
                if (!this.ubicacion) this.errorMostrarMsjTweetsalud.push("La ubicación del evento de emergencia no puede estar vacío.");

                if (this.errorMostrarMsjTweetsalud.length) this.errorTweetsalud = 1;

                return this.errorTweetsalud;
            },
            cargarPdf() {
                window.open('http://localhost:8000/tweetsalud/listarPdf', '_blank');
            },

            cerrarModal() {
                this.modal = 0;
                this.tituloModal = '';
                this.nombre = '';
                this.descripcion = '';
            },

            abrirModal(modelo, accion, data = []) {
                switch (modelo) {
                    case "tweetsalud":
                        {
                            switch (accion) {
                                case 'registrar':
                                    {
                                        this.modal = 1;
                                        this.tituloModal = 'Registrar evento de Emergencia de salud';

                                        this.texto = '';
                                        this.ubicacion = '';
                                        this.tipoAccion = 1;
                                        break;
                                    }

                                case 'actualizar':
                                    {
                                        //console.log(data);
                                        this.modal = 1;
                                        this.tituloModal = 'Actualizar categoría';
                                        this.tipoAccion = 2;
                                        this.categoria_id = data['id'];
                                        this.nombre = data['nombre'];
                                        this.descripcion = data['descripcion'];
                                        break;
                                    }
                            }
                        }
                }
            }


        },
        mounted() {
            this.listarTweetsalud(1, this.buscar, this.criterio);
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
