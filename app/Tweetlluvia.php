<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tweetlluvia extends Model
{
    protected $table = 'tweetlluvia';
    protected $fillable = ['fecha','texto','ubicacion','cuenta_verificada'];
}
