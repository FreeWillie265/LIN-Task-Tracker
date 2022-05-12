<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    public function task(){
        return $this->belongsTo('App\Models\Task');
    }

    public function user() {
        return $this->belongsTo('App\Models\User');
    }
}
