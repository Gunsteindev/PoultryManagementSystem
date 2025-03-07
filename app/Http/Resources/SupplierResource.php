<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplierResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'supplier_id' => $this->id,
            'supplier_name' => $this->supplier_name,
            'supplier_role' => $this->supplier_role,
            'supplier_company' => $this->supplier_company,
            'supplier_telephone' => $this->supplier_telephone,
            'supplier_position' => $this->supplier_position,
            'supplier_address' => $this->supplier_address,

        ];
    }
}
