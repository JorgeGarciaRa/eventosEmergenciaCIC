<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;



class UserController extends Controller
{
 
    public function datosUser(Request $request)
    {
        if (!$request->ajax()) return redirect('/'); 
        $id=$request->user_id;
        
      $user= User::select('users.id','users.nombre','users.grado_estudio','users.sexo','users.email')
          ->where('users.id', '=', $id)->get();
        
            return [
                'user' => $user
            ];

    }


    public function index(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        $buscar = $request->buscar;
        $criterio = $request->criterio;
        
        if ($buscar==''){
            $user = User::join('roles','users.idrol','=','roles.id')
            ->select('users.id','users.nombre','users.grado_estudio',
            'users.sexo','users.email','users.password',
            'users.condicion','users.idrol','roles.nombre as rol')
            ->orderBy('id', 'desc')->paginate(15);
            
        }
        else{
            $user = User::join('roles','users.idrol','=','roles.id')
            ->select('users.id','users.nombre','users.grado_estudio',
            'users.sexo','users.email','users.password',
            'users.condicion','users.idrol','roles.nombre as rol')
           -> where($criterio, 'like', '%'. $buscar . '%') ->orderBy('id', 'desc')->paginate(15);
        }
        

        return [
            'pagination' => [
                'total'        => $user->total(),
                'current_page' => $user->currentPage(),
                'per_page'     => $user->perPage(),
                'last_page'    => $user->lastPage(),
                'from'         => $user->firstItem(),
                'to'           => $user->lastItem(),
            ],
            'user' => $user
        ];
    }

    public function store(Request $request)
    {
        if (!$request->ajax()) return redirect('/');
        
        try{
            DB::beginTransaction();
            $user = new User();
            $user->nombre = $request->nombre;
            $user->grado_estudio = $request->grado_estudio;
            $user->sexo = $request->sexo;
            $user->email = $request->email;
            $user->password = bcrypt( $request->password);
            $user->condicion = '1';
            $user->idrol = $request->idrol;
            $user->save();

            DB::commit();

        
        } catch (Exception $e){
            DB::rollBack();
        }

        
        
    }

    public function update(Request $request)
    {
        if (!$request->ajax()) return redirect('/');
        
        try{
            DB::beginTransaction();

            //Buscar primero el usuario a modificar
            $user = User::findOrFail($request->id);

            $user->nombre = $request->nombre;
            $user->grado_estudio = $request->grado_estudio;
            $user->sexo = $request->sexo; 
            $user->email = $request->email;
            $user->save();
            DB::commit();

        } catch (Exception $e){
            DB::rollBack();
        }

    }

    public function desactivar(Request $request)
    {
        if (!$request->ajax()) return redirect('/');
        $user = User::findOrFail($request->id);
        $user->condicion = '0';
        $user->save();
    }

    public function activar(Request $request)
    {
        if (!$request->ajax()) return redirect('/');
        $user = User::findOrFail($request->id);
        $user->condicion = '1';
        $user->save();
    }

       
    
}
