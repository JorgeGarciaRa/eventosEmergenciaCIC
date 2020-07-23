<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tweetincendio extends Model
{
    protected $table = 'tweetincendio';
    protected $fillable = ['fecha','texto','ubicacion','cuenta_verificada' ,'coordenadas'];
}
