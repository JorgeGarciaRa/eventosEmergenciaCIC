<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Tweetlluvia;
use APP\User;
use App\Notifications\NotifyAdmin;

class TweetlluviaController extends Controller
{
    public function index(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        $buscar = $request->buscar;
        $criterio = $request->criterio;
        
        if ($buscar==''){
            $tweetlluvia =Tweetlluvia::orderBy('id', 'desc')->paginate(5);
        }
        else{
            $tweetlluvia =Tweetlluvia::where($criterio, 'like', '%'. $buscar . '%')->orderBy('id', 'desc')->paginate(5);
        }
        

        return [
            'pagination' => [
                'total'        => $tweetlluvia->total(),
                'current_page' => $tweetlluvia->currentPage(),
                'per_page'     => $tweetlluvia->perPage(),
                'last_page'    => $tweetlluvia->lastPage(),
                'from'         => $tweetlluvia->firstItem(),
                'to'           => $tweetlluvia->lastItem(),
            ],
            'tweetlluvia' => $tweetlluvia
        ];
    }

  
    public function store(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

       
        try{

     DB::beginTransaction();
     $mytime= Carbon::now('America/Mexico_CitY');

        $tweetlluvia = new Tweetlluvia();
        $tweetlluvia->fecha = $mytime->toDateString();
        $tweetlluvia->texto = $request->texto;
        $tweetlluvia->ubicacion = $request->ubicacion;
        $tweetlluvia->cuenta_verificada='Usuario del Sistema';
        $tweetlluvia->save(); 
        
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
        
        $tweetlluvia =Tweetlluvia::select('tweetlluvia.id','tweetlluvia.fecha','tweetlluvia.texto','tweetlluvia.ubicacion','tweetlluvia.cuenta_verificada')
        ->orderBy('tweetlluvia.id', 'desc')->get();
        $cont =Tweetlluvia::count();

        $pdf= \PDF::loadView('pdf.tweetslluviapdf',['tweetlluvia'=>$tweetlluvia,'cont'=>$cont]);
      return $pdf->download('tweetlluvia.pdf');
    }
}
