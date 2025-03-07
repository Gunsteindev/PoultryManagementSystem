<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $table = "clients";
    
    protected $fillable = [ // Assuming 'category' is a field you want to be mass-assignable
        'client_name',
        'client_company',
        'client_telephone',
        'client_email',
        'client_position',
        'client_location',
        'user_id',
    ];

    public function eggsales()
    {
        return $this->hasMany(Eggsale::class);
    }

    public function birdsales()
    {
        return $this->hasMany(BirdSale::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
