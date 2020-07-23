<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tweetsalud;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use APP\User;
use App\Notifications\NotifyAdmin;
class TweetsaludController extends Controller
{
    public function index(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        $buscar = $request->buscar;
        $criterio = $request->criterio;
        
        if ($buscar==''){
            $tweetsalud =Tweetsalud::orderBy('id', 'desc')->paginate(3);
        }
        else{
            $tweetsalud =Tweetsalud::where($criterio, 'like', '%'. $buscar . '%')->orderBy('id', 'desc')->paginate(3);
        }
        

        return [
            'pagination' => [
                'total'        => $tweetsalud->total(),
                'current_page' => $tweetsalud->currentPage(),
                'per_page'     => $tweetsalud->perPage(),
                'last_page'    => $tweetsalud->lastPage(),
                'from'         => $tweetsalud->firstItem(),
                'to'           => $tweetsalud->lastItem(),
            ],
            'tweetsalud' => $tweetsalud
        ];
    }

  
    public function store(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

       
        try{

     DB::beginTransaction();
     $mytime= Carbon::now('America/Mexico_CitY');

        $tweetsalud = new Tweetsalud;
        $tweetsalud->fecha = $mytime->toDateString();
        $tweetsalud->texto = $request->texto;
        $tweetsalud->ubicacion = $request->ubicacion;
        $tweetsalud->cuenta_verificada='Usuario del Sistema';
        $tweetsalud->coordenadas='[[ [-104.05, 48.99],[-97.22,  48.98], [-96.58,  45.94],[-104.03, 45.94]  ]]';
        $tweetsalud->save(); 
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
        
        $tweetsalud =Tweetsalud::select('tweetsalud.id','tweetsalud.fecha','tweetsalud.texto','tweetsalud.ubicacion','tweetsalud.cuenta_verificada')
        ->orderBy('tweetsalud.id', 'desc')->get();
        $cont =Tweetsalud::count();

        $pdf= \PDF::loadView('pdf.tweetssaludpdf',['tweetsalud'=>$tweetsalud,'cont'=>$cont]);
      return $pdf->download('tweetsalud.pdf');
    }
}
