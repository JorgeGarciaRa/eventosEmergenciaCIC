<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Notification;
use Auth;

class NotificationController extends Controller
{
public function get(){
  //return Notification::all();
 $unreadNotifications = Auth::user()->unreadNotificatios;
 $fechaActual=date('Y-m-d');
 foreach ($unreadNotifications as $notification){
   if($fechaActual != $notification->fecha->toDateString()){
     $notification->markAsRead();
   }
 }

 return Auth::user()->unreadNotificatios;
  }
}
