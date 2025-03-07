<?php

namespace App\Enum;

enum RolesEnum: string
{
    //
    case Admin = 'Admin';
    case Supervisor = 'Supervisor';
    case Production = 'Production';
    case Commercial = 'Commercial';

    public static function labels()
    {
        return [
            self::Admin->value => 'admin',
            self::Supervisor->value => 'supervisor',
            self::Production->value => 'production',
            self::Commercial->value => 'commercial',
        ];
    }

    public function label()
    {
        return match($this) {
            self::Admin => 'admin',
            self::Supervisor => 'supervisor',
            self::Production => 'production',
            self::Commercial => 'commercial',
        };
    }
}
 