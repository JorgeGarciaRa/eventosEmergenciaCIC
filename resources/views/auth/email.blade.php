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
            Menu
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

<br><br><br><br><br><br>

<div class="row justify-content-center">
    <div class="col-md-8">
        <div class="card-group mb-0">
            <div class="card p-4 text-center ">
                <form class="form-horizontal " method="POST" action="{{ route('password.email') }}">
                    {{ csrf_field() }}
                    <div class="card-body">
                        <h2>Recupera tu contraseña </h2>
                        <p class="text-muted">Control de acceso al sistema</p>


                        <div class="form-group {{ $errors->has('email') ? ' has-error' : '' }}">
                            <span class="input-group-addon"><i class="icon-envelope-letter"></i></span>


                            <div class="col-md-15">
                                <input id="email" type="email" class="form-control" name="email"
                                    placeholder="Ingrese E-mail" value="{{ old('email') }}" required>

                                @if ($errors->has('email'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('email') }}</strong>
                                </span>
                                @endif
                            </div>
                        </div>


                        <br>
                        <div class="form-group">
                            <div class="col-md-12 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">
                                    Restablecer contraseña
                                </button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
            <div class="card text-white bg-primary py-5 d-md-down-none" style="width:44%">
                <div class="card-body text-center">
                    <div>

                        <h3>Sistema de Deteccion de Eventos de Emergencia</h3>
                        <p>Sistema para el campus inteligente IPN-Zacatenco.</p>
                        <div class=" justify-content-center">
                            <div class="right-box-pro wow fadeIn">
                                <img src="img\logocic.png" alt="" class="img-fluid img-rounded">
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



@endsection
