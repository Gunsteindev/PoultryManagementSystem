<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BandPurchaseResource extends JsonResource
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
            'band_id' => $this->id,
            'band_purchase_code' => $this->band_purchase_code,
            'band_purchase_band_code' => $this->band_purchase_band_code,
            'band_purchase_description' => $this->band_purchase_description,
            'band_purchase_unit_price' => $this->band_purchase_unit_price,
            'band_purchase_reduction' => $this->band_purchase_reduction,
            'band_purchase_quantity' => $this->band_purchase_quantity,
            'band_purchase_total_cost' => $this->band_purchase_total_cost,
            'band_purchase_date' => $this->band_purchase_date,

        ];
    }
}
