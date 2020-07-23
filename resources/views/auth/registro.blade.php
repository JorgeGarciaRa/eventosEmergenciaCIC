
@extends('auth.contenido')

@section('login')
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
                    <a class="nav-link js-scroll-trigger active  btn btn-primary px-4 " href="{{route('registro')}}">
                        Regístrate</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<br>
<br>
<br>
<br>
<br>


<div class="row justify-content-center">
    <div class="col-md-8" style="background-color:rgb(32, 168, 216)">
        <div class="card-group mb-0">

            <div class="card p-4 text-center ">
                <h5>Centro de Investigación en Computación (CIC)</h5>
                <h5> Laboratorio Cómputo Inteligente</h5>
                <h5 style="color:black"> Sistema de Detección de Eventos de Emergencia</h5>

                <br>

                <form class="form-horizontal " method="POST" action="{{ route('registrodb') }}">
                    {{ csrf_field() }}

                    <div class="form-group row {{ $errors->has('nombre') ? ' has-error' : '' }}">
                        <label class="col-md-3 form-control-label  icon-user input-group-addon"
                            for="text-center">&nbsp;Nombre Completo</label>

                        <div class="col-md-9">
                            <input id="nombre" type="text" class="form-control" placeholder="Nombre " name="nombre"
                                value="{{ old('nombre') }}" required autofocus>

                            @if ($errors->has('nombre'))
                            <span class="help-block">
                                <strong>{{ $errors->first('nombre') }}</strong>
                            </span>
                            @endif
                        </div>
                    </div>


                    <div class="form-group row {{ $errors->has('email') ? ' has-error' : '' }}">
                        <label class="col-md-3 form-control-label icon-envelope-letter input-group-addon"
                            for="email-input">&nbsp;E-mail</label>

                        <div class="col-md-9">
                            <input id="email" type="email" class="form-control" name="email"
                                placeholder="Ingrese E-mail" value="{{ old('email') }}" required>

                            @if ($errors->has('email'))
                            <span class="help-block">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                            @endif
                        </div>
                    </div>


                    <div class="form-group row">
                        <label class="col-md-3 form-control-label  icon-book-open input-group-addon"
                            for="grado-input">&nbsp;Grado </label>
                        <div class="col-md-9">
                            <select v-model="grado_estudio" class="form-control" name="grado_estudio"
                                id="grado_estudio">
                                <option value="Licenciatura">Licenciatura</option>
                                <option value="Maestria">Maestria</option>
                                <option value="Doctorado">Doctorado</option>
                            </select>
                        </div>
                    </div>


                    <div class="form-group row">
                        <label class="col-md-3 form-control-label icon-people input-group-addon"
                            for="grado-input">&nbsp;Sexo </label>
                        <div class="col-md-9">
                            <select v-model="sexo" class="form-control" name="sexo" id="sexo">
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group row{{ $errors->has('password') ? ' has-error' : '' }}">
                        <label class="col-md-3 form-control-label icon-lock input-group-addon"
                            for="contraseña-input">&nbsp;Contraseña</label>
                        <div class="col-md-9">
                            <input id="password" type="password" class="form-control" placeholder="Ingrese Contraseña"
                                name="password" required>
                            @if ($errors->has('password'))
                            <span class="help-block">
                                <strong>{{ $errors->first('password') }}</strong>
                            </span>
                            @endif
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-md-3 form-control-label  icon-lock input-group-addon"
                            for="password-confirm">&nbsp;Repetir Contraseña</label>
                        <div class="col-md-9">
                            <input id="password-confirm" type="password" class="form-control"
                                placeholder="Confirmar Contraseña" name="password_confirmation" required>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary px-4">Registrar</button>&nbsp;
                    <span class="ml-auto">¿Ya tienes una cuenta? <a href="{{route('login')}}" style="color:red">Iniciar
                            sesión</a></span>

                    <br><br>
                </form>



            </div>
        </div>
    </div>

@endsection
