<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'dueDate',
        'assignedUser'
    ];

    public function user() {
        return $this->belongsTo('App\Models\User', 'assignedUser');
    }
}
