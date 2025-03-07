<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BirdSale extends Model
{
    //
    protected $table = "bird_sales";
    
    protected $fillable = [ // Assuming 'category' is a field you want to be mass-assignable
        'bird_sale_code',
        'batiment_id',
        'bird_sale_batiment_code',
        'bird_sale_description',
        'bird_sale_quantity',
        'bird_sale_unit_price',
        'bird_sale_reduction',
        'bird_sale_total_cost',
        'bird_sale_date',
        'user_id',
    ];

    public function users()
    {
        return $this->belongsTo(User::class);
    }

    public function clients()
    {
        return $this->belongsTo(Client::class);
    }
}
