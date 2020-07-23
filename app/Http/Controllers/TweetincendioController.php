<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tweetincendio;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use APP\User;
use App\Notifications\NotifyAdmin;

class TweetincendioController extends Controller
{
    public function index(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        $buscar = $request->buscar;
        $criterio = $request->criterio;
        
        if ($buscar==''){
            $tweetincendio =Tweetincendio::orderBy('id', 'desc')->paginate(3);
        }
        else{
            $tweetincendio =Tweetincendio::where($criterio, 'like', '%'. $buscar . '%')->orderBy('id', 'desc')->paginate(3);
        }
        

        return [
            'pagination' => [
                'total'        => $tweetincendio->total(),
                'current_page' => $tweetincendio->currentPage(),
                'per_page'     => $tweetincendio->perPage(),
                'last_page'    => $tweetincendio->lastPage(),
                'from'         => $tweetincendio->firstItem(),
                'to'           => $tweetincendio->lastItem(),
            ],
            'tweetincendio' => $tweetincendio
        ];
    }

  
    public function store(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

       
        try{

     DB::beginTransaction();
     $mytime= Carbon::now('America/Mexico_CitY');

        $tweetincendio = new Tweetincendio();
        $tweetincendio->fecha = $mytime->toDateString();
        $tweetincendio->texto = $request->texto;
        $tweetincendio->ubicacion = $request->ubicacion;
        $tweetincendio->cuenta_verificada='Usuario del Sistema';
        $tweetincendio->coordenadas='[[ [-104.05, 48.99],[-97.22,  48.98], [-96.58,  45.94],[-104.03, 45.94]  ]]';
        $tweetincendio->save(); 

        $fechaActual=date('Y-m-d');
        $numMovilidad=DB::table('tweetmovilidad')->whereDate('fecha',$fechaActual)->count();
        $numIncendio=DB::table('tweetincendio')->whereDate('fecha',$fechaActual)->count();
        $numLluvia=DB::table('tweetlluvia')->whereDate('fecha',$fechaActual)->count();
        $numSalud=DB::table('tweetsalud')->whereDate('fecha',$fechaActual)->count();

    $arregloDatos=[
        'movilidad'=>[
           'numero'=>$numMovilidad,
           'msj'=>'Movilidad'
        ],
        'incendio'=>[
           'numero'=>$numIncendio,
           'msj'=>'Incendio'
        ],
        'lluvia'=>[
           'numero'=>$numLluvia,
           'msj'=>'Lluvia'
        ],
        'salud'=>[
           'numero'=>$numSalud,
           'msj'=>'Salud'
        ]

        ];
        $allUser= User::all();

          foreach($allUser as $notificar){
              User::findOrFail($notificar->id)->notify(new NotifyAdmin($arregloDatos));
          }

         
        DB::commit();
        }catch(Exception $e){
            DB::rollBack();
        }



    }
    
    public function listarPdf(){
        
        $tweetincendio =Tweetincendio::select('tweetincendio.id','tweetincendio.fecha','tweetincendio.texto','tweetincendio.ubicacion','tweetincendio.cuenta_verificada')
        ->orderBy('tweetincendio.id', 'desc')->get();
        $cont =Tweetincendio::count();

        $pdf= \PDF::loadView('pdf.tweetsincendiopdf',['tweetincendio'=>$tweetincendio,'cont'=>$cont]);
      return $pdf->download('tweetincendio.pdf');
    }
}
