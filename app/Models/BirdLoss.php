<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BirdLoss extends Model
{
    protected $table = "bird_losses";
    protected $fillable = [ // Assuming 'category' is a field you want to be mass-assignable
        'batiment_id',
        'bird_loss_batiment',
        'bird_loss_category',
        'bird_loss_quantity',
        'bird_loss_date',
        'user_id'
    ] ;

    public function batiment()
    {
        return $this->belongsTo(Batiment::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
