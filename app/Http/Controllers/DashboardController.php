<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
class DashboardController extends Controller
{



    public function graficas(Request $request)
    {
      $anio=date('m');

      $movilidad=DB::table('tweetmovilidad as v')
      ->select(DB::raw('DAY(v.fecha)as dia'),
      DB::raw('MONTH(v.fecha)as mes'),
      DB::raw('COUNT(v.fecha) as total'))
      ->whereMonth('v.fecha',$anio) 
      ->groupBy(DB::raw('DAY(v.fecha)'),DB::raw('MONTH(v.fecha)'))
      ->get();

      $incendio=DB::table('tweetincendio as i')
      ->select(DB::raw('DAY(i.fecha)as dia'),
      DB::raw('MONTH(i.fecha)as mes'),
      DB::raw('COUNT(i.fecha) as total'))
      ->whereMonth('i.fecha',$anio) 
      ->groupBy(DB::raw('DAY(i.fecha)'),DB::raw('MONTH(i.fecha)'))
      ->get();

      $salud=DB::table('tweetsalud as s')
      ->select(DB::raw('DAY(s.fecha)as dia'),
      DB::raw('MONTH(s.fecha)as mes'),
      DB::raw('COUNT(s.fecha) as total'))
      ->whereMonth('s.fecha',$anio) 
      ->groupBy(DB::raw('DAY(s.fecha)'),DB::raw('MONTH(s.fecha)'))
      ->get();


      $lluvia=DB::table('tweetlluvia as l')
      ->select(DB::raw('DAY(l.fecha)as dia'),
      DB::raw('MONTH(l.fecha)as mes'),
      DB::raw('COUNT(l.fecha) as total'))
      ->whereMonth('l.fecha',$anio) 
      ->groupBy(DB::raw('DAY(l.fecha)'),DB::raw('MONTH(l.fecha)'))
      ->get();

       $general=DB::table('tweets as t')
      ->select(DB::raw('(t.etiqueta) as etiqueta'),
        DB::raw('COUNT(t.etiqueta) as total'))
      ->groupBy(DB::raw('(t.etiqueta)'))
      ->get();

        


      return ['movilidad'=>$movilidad,'incendio'=>$incendio,'salud'=>$salud,'lluvia'=>$lluvia,'general'=>$general, 'anio'=>$anio] ;
      
    }



public function datos(Request $request)
    {

      $general=DB::table('tweets as t')
      ->select(DB::raw('COUNT(t.id) as t_recolectados'))
      ->get();
      
      $user=DB::table('users as U')
      ->select(DB::raw('COUNT(U.id) as U_registrados'))
      ->get();
      
      $UsuariosSistemaM=DB::table('tweetmovilidad as tm')
        ->select(DB::raw('COUNT(tm.id) as nmovilidad'))
        ->where('tm.cuenta_verificada',"Usuario del Sistema")
        ->get();

        $UsuariosSistemaI=DB::table( 'tweetincendio as ti')
        ->select(DB::raw('COUNT(ti.id) as nincendio'))
        ->where('ti.cuenta_verificada',"Usuario del Sistema")
        ->get();
        
        $UsuariosSistemaS=DB::table( 'tweetsalud as ts')
        ->select(DB::raw('COUNT(ts.id) as nsalud')) 
        ->where('ts.cuenta_verificada',"Usuario del Sistema")
        ->get();
      
       // $totalTu=$UsuariosSistemaM[''];
       
        return ['general'=>$general,'user'=>$user,'UsuariosSistemaM'=>$UsuariosSistemaM,'UsuariosSistemaI'=>$UsuariosSistemaI ,'UsuariosSistemaS'=>$UsuariosSistemaS  ];
    }

}
