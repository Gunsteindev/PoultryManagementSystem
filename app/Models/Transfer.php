<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transfer extends Model
{
    //

    protected $table = "transfers";
    protected $fillable = [ // Assuming 'category' is a field you want to be mass-assignable
        'batiment_id',
        'band_purchase_id',
        'transfer_batiment_code',
        'transfer_band_code',
        'transfer_quantity',
        'user_id',
    ] ;

    public function users()
    {
        return $this->belongsTo(User::class);
    }
}
