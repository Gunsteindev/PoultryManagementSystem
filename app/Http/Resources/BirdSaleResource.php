<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BirdSaleResource extends JsonResource
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
            'bird_sale_id' => $this->id,
            'bird_sale_code' => $this->bird_sale_code,
            'bird_sale_batiment_code' => $this->bird_sale_batiment_code,
            'bird_sale_description' => $this->bird_sale_description,
            'bird_sale_quantity' => $this->bird_sale_quantity,
            'bird_sale_unit_price' => $this->bird_sale_unit_price,
            'bird_sale_reduction' => $this->bird_sale_reduction,
            'bird_sale_total_cost' => $this->bird_sale_total_cost,
            'bird_sale_date' => $this->bird_sale_date,
        ];
    }
}
