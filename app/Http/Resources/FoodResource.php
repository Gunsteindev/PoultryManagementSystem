<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FoodResource extends JsonResource
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
            'food_id' => $this->id,
            'food_code' => $this->food_code,
            'food_name' => $this->food_name,
            'food_supplier_name' => $this->food_supplier_name,
            'food_price_per_bag' => $this->food_price_per_bag,
            'food_discount' => $this->food_discount,
            'food_quantity' => $this->food_quantity,
            'food_purchase_date' => $this->food_purchase_date,
            'food_total_cost' => $this->food_total_cost,
        ];
    }
}
