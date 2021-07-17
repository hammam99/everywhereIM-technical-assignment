<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Color;
use User;

class UserColor extends Model
{
    use HasFactory;
    public $timestamps = false;
    // protected $hidden = ["user_id", "id", "color_id"];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    public function color()
    {
        return $this->belongsTo(Color::class, 'color_id')->join('colors', function($join) {
            $join->on('color_id', 'colors.id');
        });
    }
    // public function user()
    // {
    //     return $this->belongsTo('App\Models\User');
    // }

}
