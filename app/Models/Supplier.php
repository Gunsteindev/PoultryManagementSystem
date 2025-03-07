<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    
    protected $table = "suppliers";
    protected $fillable = [ // Assuming 'category' is a field you want to be mass-assignable
        'supplier_name',
        'supplier_role',
        'supplier_company',
        'supplier_telephone',
        'supplier_position',
        'supplier_address',
        'user_id'
    ] ;

    public function users()
    {
        return $this->belongsTo(User::class);
    }

    public function foods()
    {
        return $this->hasMany(Food::class);
    }
}
