<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tweetmovilidad extends Model
{
    protected $table = 'tweetmovilidad';
    protected $fillable = ['fecha','texto','ubicacion','cuenta_verificada','coordenadas'];
}
