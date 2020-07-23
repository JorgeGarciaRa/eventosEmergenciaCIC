@extends('layouts.app')

@section('reestablecer')

<br><br>



<div class="row justify-content-center">
    <div class="col-md-9">
        
        <div class="card-group mb-0">
            <div class="card p-4  ">
                <form class="form-horizontal " method="POST" action="{{ route('password.request') }}">
                    {{ csrf_field() }}

                    <input type="hidden" name="token" value="{{ $token }}">


                    <div class="card-body">
                     <h2>Reestablecer Contraseña</h2>
                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}  ">
                            <label for="email" class="col-md-6 control-label">Correo Electrónico</label>

                            <div class="col-md-12">
                                <input id="email" type="email" class="form-control" name="email"
                                    value="{{ $email or old('email') }}" required autofocus>

                                @if ($errors->has('email'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('email') }}</strong>
                                </span>
                                @endif
                            </div>
                        </div>


                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                            <label for="password" class="col-md-12 control-label">Nueva Contraseña</label>

                            <div class="col-md-12">
                                <input id="password" type="password" class="form-control" name="password" required>

                                @if ($errors->has('password'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('password') }}</strong>
                                </span>
                                @endif
                            </div>
                        </div>



                        <div class="form-group{{ $errors->has('password_confirmation') ? ' has-error' : '' }}">
                            <label for="password-confirm" class="col-md-12 control-label">Contraseña de
                                Confirmación</label>
                            <div class="col-md-12">
                                <input id="password-confirm" type="password" class="form-control"
                                    name="password_confirmation" required>

                                @if ($errors->has('password_confirmation'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('password_confirmation') }}</strong>
                                </span>
                                @endif
                            </div>
                        </div>


                        <div class="form-group">
                            <div class="col-md-12 col-md-offset-12">
                                <button type="submit" class="btn btn-success">
                                    Reestablecer Contraseña
                                </button>

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
                                <img src="{{asset('img\logocic.png')}}" alt="" class="img-fluid img-rounded">
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


@endsection
