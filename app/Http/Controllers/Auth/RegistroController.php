<?php

namespace App\Http\Controllers\Auth;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class RegistroController extends Controller {


    public function showRegistroForm(){
        return view('auth.registro');

    }
       public function registro(Request $request){
        $this->validateRegistro($request);  
        
            $user = new User();
            $user->nombre = $request->nombre;
            $user->grado_estudio = $request->grado_estudio;
            $user->sexo = $request->sexo;
            $user->email = $request->email;
            $user->password = bcrypt( $request->password);
            $user->condicion = '1';
            $user->idrol = '2';
            $user->save();
             return redirect()->route('login');

         }

    protected function validateRegistro(Request $request){
        $this->validate($request,[

            'nombre' => 'required|string|max:255',
            'grado_estudio' => 'required|string|max:20',
            'sexo' => 'required|string|max:20',    
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);
    }
 


}