<template>
    <main class="main justify-content-center">
        <!-- Breadcrumb -->
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Datos de Perfil</a></li>
        </ol>
        <div class="container-fluid justify-content-center">
            <!-- Ejemplo de tabla Listado -->
            <div class="card">
                <div class="card-header bg-gradient- Light" style="background-color:rgb(177, 183, 193)">
                    <div class="row justify-content-between">
                        <div class="text-value-lg" style="color:black;">Información de Usuario</div>&nbsp;
                    </div>
                </div>
                <div class="card-body justify-content-center ">
                    <div class="row justify-content-center">
                        <div class="col-md-12">
                            <div class="card-group mb-0">
                                <div class="card p-3 col-md-4 text-center ">
                                    <div v-if="sexo== 'Masculino'">
                                        <div clas="container justify-content-center ">
                                        <img src="img/avatars/6.png" class="img-avatar" alt="admin@bootstrapmaster.com">
                                    </div>
                                    </div>
                                    <div v-else>
                                       <div clas="container justify-content-center ">
                                        <img src="img/avatars/8.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
                                    </div>
                                    </div>

                                </div>
                                <div class="card  py-5 text-center d-md-down-none" style="width:44%">
                                    <div class="card-body  col-md-9 text-center">
                                        <div>
                                             
                                                <div class="form-group row ">
                                                    <label class="col-md-3 form-control-label  cil-user input-group-addon" for="text-input">&nbsp;Nombre
                                                    </label>
                                                    <div class="col-md-9">
                                                        <input type="text" v-model="nombre" class="form-control"
                                                            placeholder="Nombre de la persona">
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label class="col-md-3 cil-book-open form-control-label" for="text-input">&nbsp;Grado
                                                        Estudio</label>
                                                    <div class="col-md-9">
                                                        <select v-model="grado_estudio" class="form-control">
                                                            <option value="Licenciatura">Licenciatura</option>
                                                            <option value="Maestria">Maestria</option>
                                                            <option value="Doctorado">Doctorado</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label class="col-md-3 cil-people form-control-label"
                                                        for="text-input">&nbsp;Sexo</label>
                                                    <div class="col-md-9">
                                                        <select v-model="sexo" class="form-control">
                                                            <option value="Masculino">Masculino</option>
                                                            <option value="Femenino">Femenino</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label class="col-md-3 cil-envelope-letter form-control-label" for="email-input">&nbsp;Email
                                                        (*)</label>
                                                    <div class="col-md-9">
                                                        <input type="email" v-model="email" class="form-control"
                                                            placeholder="Email">
                                                    </div>
                                                </div>

                                                <div v-show="errorUsuario" class="form-group row div-error">
                                                    <div class="text-center text-error">
                                                        <div v-for="error in errorMostrarMsjUsuario" :key="error"
                                                            v-text="error">

                                                        </div>
                                                    </div>
                                                </div>
                                                 <button type="button"   class="btn btn-primary col-md-6" @click="actualizarUsuario()">Actualizar</button>
                                  

                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            
            <!-- Fin ejemplo de tabla Listado -->
        </div>
                     

    </main>
    
</template>


<script>
    export default {
        props : [
            'id_user_prop',
        ],
        data() {
            return {
                user_id:'',
                nombre: '',
                grado_estudio: '',
                sexo: '',
                email: '',
                arrayUser: [],
                errorUsuario: 0,
                errorMostrarMsjUsuario: [],
            }
        },
        methods: {
            mostrarUsuario(){
                let me=this
                me.user_id = me.id_user_prop
                var url= '/datoUser/get?user_id='+me.user_id;
                 axios.get(url).then(function (response) {
                    var respuesta= response.data;
                    me.arrayUser = respuesta.user;
                    me.nombre=me.arrayUser[0].nombre;
                    me.grado_estudio=me.arrayUser[0].grado_estudio;
                    me.sexo=me.arrayUser[0].sexo;
                    me.email=me.arrayUser[0].email;
                })

                .catch(function (error) {
                    console.log(error);
                });

            },
            actualizarUsuario() {
                if (this.validarUsuario()) {
                    return;
                }

                let me = this;

                axios.put('/user/actualizar', {
                    'nombre': this.nombre,
                    'grado_estudio': this.grado_estudio,
                    'sexo': this.sexo,
                    'email': this.email,
                    'id': this.user_id
                }).then(function (response) {
                    Swal.fire({
                        icon:'success',
                        title:'Actualizado corectamente',

                    })
                }).catch(function (error) {
                    console.log(error);
                });
            },
            validarUsuario() {
                this.errorUsuario = 0;
                this.errorMostrarMsjUsuario = [];

                if (!this.nombre) this.errorMostrarMsjUsuario.push("El nombre de la persona no puede estar vacío.");
                if (!this.email) this.errorMostrarMsjUsuario.push("El E-mail no puede estar vacío.");
                if (this.errorMostrarMsjUsuario.length) this.errorUsuario = 1;

                return this.errorUsuario;
            },
        },
        mounted() {
            this.mostrarUsuario()
        },
    }

</script>