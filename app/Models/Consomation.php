<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consomation extends Model
{
    protected $table = "consomations";
    protected $fillable = [ // Assuming 'category' is a field you want to be mass-assignable
        'batiment_id',
        'consomation_batiment',
        'food_id',
        'consomation_name',
        'consomation_quantity',
        'consomation_date',
        'user_id',
    ] ;

    public function foods()
    {
        return $this->hasMany(Food::class);
    }

    public function batiment()
    {
        return $this->belongsTo(Batiment::class);
    }

    public function users()
    {
        return $this->belongsTo(User::class);
    }
}
