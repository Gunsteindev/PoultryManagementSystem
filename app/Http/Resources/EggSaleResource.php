<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EggSaleResource extends JsonResource
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
            'eggsale_id' => $this->id,
            'eggsale_code' => $this->eggsale_code,
            'eggsale_client_name' => $this->eggsale_client_name,
            'eggsale_description' => $this->eggsale_description,
            'eggsale_unit_price' => $this->eggsale_unit_price,
            'eggsale_quantity' => $this->eggsale_quantity,
            'eggsale_reduction' => $this->eggsale_reduction,
            'eggsale_total_cost' => $this->eggsale_total_cost,
            'eggsale_date' => $this->eggsale_date,
        ];
    }
}
