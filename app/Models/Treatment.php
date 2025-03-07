<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Treatment extends Model
{
    use HasFactory;
    protected $table = "treatments";
    protected $fillable = [ // Assuming 'category' is a field you want to be mass-assignable
        'batiment_id',
        'treatment_batiment_code',
        'treatment_veto_name',
        'treatment_name',
        'treatment_comment',
        'user_id',
    ] ;

    public function batiments()
    {
        return $this->belongsTo(Treatment::class);
    }
}
