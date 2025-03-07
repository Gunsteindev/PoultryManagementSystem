<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function pickups()
    {
        return $this->hasMany(Pickup::class);
    }

    public function losses()
    {
        return $this->hasMany(BirdLoss::class);
    }

    public function eggsales()
    {
        return $this->hasMany(EggSale::class);
    }

    public function clients()
    {
        return $this->hasMany(Client::class);
    }

    public function batiments()
    {
        return $this->hasMany(Batiment::class);
    }

    public function foods()
    {
        return $this->hasMany(Food::class);
    }

    public function bandpurchases()
    {
        return $this->hasMany(BandPurchase::class);
    }

    public function consomations()
    {
        return $this->hasMany(Consomation::class);
    }

    public function suppliers()
    {
        return $this->hasMany(Supplier::class);
    }

    public function transfers()
    {
        return $this->hasMany(Transfer::class);
    }
}
