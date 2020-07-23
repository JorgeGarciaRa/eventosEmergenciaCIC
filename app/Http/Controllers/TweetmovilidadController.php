<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Tweetmovilidad;
use APP\User;
use App\Notifications\NotifyAdmin;



class TweetmovilidadController extends Controller
{
   
    public function index(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        $buscar = $request->buscar;
        $criterio = $request->criterio;
        
        if ($buscar==''){
            $tweetmovilidad =Tweetmovilidad::orderBy('id', 'desc')->paginate(3);
        }
        else{
            $tweetmovilidad =Tweetmovilidad::where($criterio, 'like', '%'. $buscar . '%')->orderBy('id', 'desc')->paginate(3);
        }
        

        return [
            'pagination' => [
                'total'        => $tweetmovilidad->total(),
                'current_page' => $tweetmovilidad->currentPage(),
                'per_page'     => $tweetmovilidad->perPage(),
                'last_page'    => $tweetmovilidad->lastPage(),
                'from'         => $tweetmovilidad->firstItem(),
                'to'           => $tweetmovilidad->lastItem(),
            ],
            'tweetmovilidad' => $tweetmovilidad
        ];
    }

  
    public function store(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

       
        try{

     DB::beginTransaction();
     $mytime= Carbon::now('America/Mexico_CitY');

     
        $tweetmovilidad = new Tweetmovilidad();
        $tweetmovilidad->fecha = $mytime->toDateString();
        $tweetmovilidad->texto = $request->texto;
        $tweetmovilidad->ubicacion = $request->ubicacion;
        $tweetmovilidad->cuenta_verificada='Usuario del Sistema';
        $tweetmovilidad->coordenadas='[[ [-104.05, 48.99],[-97.22,  48.98], [-96.58,  45.94],[-104.03, 45.94]  ]]';
        $tweetmovilidad->save(); 
         


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
        
        $tweetmovilidad =Tweetmovilidad::select('tweetmovilidad.id','tweetmovilidad.fecha','tweetmovilidad.texto','tweetmovilidad.ubicacion','tweetmovilidad.cuenta_verificada')
        ->orderBy('tweetmovilidad.id', 'desc')->get();
        $cont =Tweetmovilidad::count();

        $pdf= \PDF::loadView('pdf.tweetsmovilidadpdf',['tweetmovilidad'=>$tweetmovilidad,'cont'=>$cont]);
      return $pdf->download('tweetmovilidad.pdf');
    }
}
