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
                    <a class="nav-link js-scroll-trigger active  btn btn-primary px-4 "
                        href="{{route('registro')}}">Regístrate</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<br>
<br>
<br>
<div id="home" class="main-banner parallaxie ">
    <div class="heading  text-center text-white">
        <h1>Centro de Investigación en Computación (CIC)</h1>
        <h3 class="cd-headline clip is-full-width">
            <span> Laboratorio Cómputo Inteligente</span>
            <div class="btn-ber">
            </div>
        </h3>
        <br>

    </div>

</div>




<div class="row justify-content-center">
    <div class="col-md-8">
        <div class="card-group mb-0">
            <div class="card p-4 text-center ">
                <form class="form-horizontal " method="POST" action="{{ route('login')}}">
                    {{ csrf_field() }}
                    <div class="card-body">
                        <h2>¡Inicia sesión en tu cuenta!</h2>
                        <p class="text-muted">Control de acceso al sistema</p>            
                        <div class="form-group mb-3 {{$errors->has('email' ? 'is-invalid' : '')}}">
                            <span class="input-group-addon"><i class="cil-user"></i></span>
                            <input type="text" value="{{old('email')}}" name="email" id="email" class="form-control"
                                placeholder=" E-mail de Usuario">
                            {!!$errors->first('email','<span class="help-block">:message</span>')!!}
                        </div>
                        <div class="form-group mb-4{{$errors->has('password' ? 'is-invalid' : '')}}">
                            <span class="input-group-addon"><i ></i></span>
                            <input type="password" name="password" id="password" class="form-control"
                                placeholder="Contraseña">
                            {!!$errors->first('password','<span class="help-block">:message</span>')!!}
                        
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary px-4">Iniciar sesión</button>
                                <span class="ml-auto"> o <a href="{{route('showpassword')}}" style="color:red">¿Has
                                        olvidado la contraseña?</a></span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="card text-white bg-primary py-5 d-md-down-none" style="width:44%">
                <div class="card-body text-center">
                    <div>

                        <h3>Sistema de Detección de Eventos de Emergencia</h3>
                        <p>Campus Inteligente IPN-Zacatenco.</p>
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