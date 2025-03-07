<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pickup extends Model
{
    protected $table = "pickups";
    protected $fillable = [ // Assuming 'category' is a field you want to be mass-assignable
        'batiment_id',
        'pickup_batiment',
        'pickup_code',
        'pickup_crate_quantity',
        'pickup_quantity_remain',
        'pickup_quantity_loss',
        'pickup_total_quantity',
        'pickup_date',
        'user_id',
    ];

     // Relationship with Batiment
     public function batiment()
     {
         return $this->belongsTo(Batiment::class);
     }
 
     // Relationship with User (if applicable)
     public function user()
     {
         return $this->belongsTo(User::class);
     }
}
