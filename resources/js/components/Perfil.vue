<template>
    <main class="main justify-content-center">
        <!-- Breadcrumb -->
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Datos de Perfil</a></li>
        </ol>
        <div class="container-fluid justify-content-center">
            <!-- Ejemplo de tabla Listado -->
            <div class="card">
                <div class="card-header justify-content-center" style="background-color:rgb(235, 152, 78  )">
                    <i class="fa fa-align-justify"></i> Informacion de Usuario
                </div>
                <div class="card-body justify-content-center ">

                    <div clas="container justify-content-center ">
                        <img src="img/avatars/6.png" class="img-avatar" alt="admin@bootstrapmaster.com">
                    </div>

                    <br>

                    <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">


                        <div class="form-group row">
                            <label class="col-md-3 form-control-label" for="text-input">Nombre </label>
                            <div class="col-md-9">
                                <input type="text" v-model="nombre" class="form-control"
                                    placeholder="Nombre de la persona">
                            </div>
                        </div>


                        <div class="form-group row">
                            <label class="col-md-3 form-control-label" for="text-input">Grado Estudio</label>
                            <div class="col-md-9">
                                <select v-model="grado_estudio" class="form-control">
                                    <option value="Licenciatura">Licenciatura</option>
                                    <option value="Maestria">Maestria</option>
                                    <option value="Doctorado">Doctorado</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-3 form-control-label" for="text-input">Sexo</label>
                            <div class="col-md-9">
                                <select v-model="sexo" class="form-control">
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-3 form-control-label" for="email-input">Email (*)</label>
                            <div class="col-md-9">
                                <input type="email" v-model="email" class="form-control" placeholder="Email">
                            </div>
                        </div>



                        <div v-show="errorUsuario" class="form-group row div-error">
                            <div class="text-center text-error">
                                <div v-for="error in errorMostrarMsjUsuario" :key="error" v-text="error">

                                </div>
                            </div>
                        </div>
                    </form>
                    <hr class="my-5">



                    <button type="button" class="btn btn-primary" @click="actualizarUsuario()">Actualizar</button>

                </div>

            </div>
            <!-- Fin ejemplo de tabla Listado -->
        </div>

    </main>
</template>




<script>
    export default {
        data() {
            return {
                user_id: 0,
                nombre: '',
                grado_estudio: 'Licenciatura',
                sexo: 'Masculino',
                email: '',
                arrayUser: [],
                errorUsuario: 0,
                errorMostrarMsjUsuario: [],
            }
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
                'id': 4

            }).then(function (response) {
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
    }

</script>





