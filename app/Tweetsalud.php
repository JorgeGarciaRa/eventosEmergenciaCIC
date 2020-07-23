<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tweetsalud extends Model
{
    protected $table = 'tweetsalud';
    protected $fillable = ['fecha','texto','ubicacion','cuenta_verificada','coordenadas'];
}
