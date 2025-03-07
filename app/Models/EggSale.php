<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EggSale extends Model
{
    protected $table = "eggsales";
    
    protected $fillable = [ // Assuming 'category' is a field you want to be mass-assignable
        'client_id',
        'eggsale_client_name',
        'eggsale_code',
        'eggsale_description',
        'eggsale_unit_price',
        'eggsale_quantity',
        'eggsale_reduction',
        'eggsale_total_cost',
        'eggsale_date',
        'user_id'
        
    ];

    public function clients()
    {
        return $this->belongsTo(Client::class);
    }

    public function users()
    {
        return $this->belongsTo(User::class);
    }
}
