<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Batiment extends Model
{
    use HasFactory;
    protected $table = "batiments";
    protected $fillable = [ // Assuming 'category' is a field you want to be mass-assignable
        'batiment_code',
        'batiment_description',
        'batiment_capacity',
        'batiment_category',
        'user_id'
    ];

    public function pickups()
    {
        return $this->hasMany(Pickup::class);
    }

    public function losses()
    {
        return $this->hasMany(BirdLoss::class);
    }

    public function treatments()
    {
        return $this->hasMany(Treatment::class);
    }

    public function users()
    {
        return $this->belongsTo(User::class);
    }

    public function comsomations()
    {
        return $this->hasMany(Consomation::class);
    }

    public function transfer()
    {
        return $this->hasMany(Transfer::class);
    }


}
