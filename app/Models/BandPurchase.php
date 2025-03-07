<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BandPurchase extends Model
{
    protected $table = "band_purchases";

    protected $fillable = [ // Assuming 'category' is a field you want to be mass-assignable
        'band_purchase_code',
        'band_purchase_band_code',
        'band_purchase_description',
        'band_purchase_unit_price',
        'band_purchase_reduction',
        'band_purchase_quantity',
        'band_purchase_total_cost',
        'band_purchase_date',
        'user_id',
    ];

    public function users()
    {
        return $this->belongsTo(User::class);
    }

    public function transfers()
    {
        return $this->hasMany(Transfer::class);
    }
}
