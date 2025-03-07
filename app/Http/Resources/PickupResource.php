<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PickupResource extends JsonResource
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
            'pickup_id' => $this->id,
            'pickup_batiment' => $this->pickup_batiment,
            'pickup_code' => $this->pickup_code,
            'pickup_crate_quantity' => $this->pickup_crate_quantity,
            'pickup_quantity_remain' => $this->pickup_quantity_remain,
            'pickup_quantity_loss' => $this->pickup_quantity_loss,
            'pickup_total_quantity' => $this->pickup_total_quantity,
            'pickup_date' => $this->pickup_date,
        ];
    }
}
