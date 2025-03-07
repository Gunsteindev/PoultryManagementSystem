<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    protected $table = "foods";
    protected $fillable = [ // Assuming 'category' is a field you want to be mass-assignable
        'food_code',
        'food_name',
        'supplier_id',
        'food_supplier_name',
        'food_price_per_bag',
        'food_discount',
        'food_quantity',
        'food_purchase_date',
        'food_total_cost',
        'user_id'
    ];

    public function users()
    {
        return $this->belongsTo(User::class);
    }

    public function consomations()
    {
        return $this->belongsTo(Consomation::class);
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }
}
