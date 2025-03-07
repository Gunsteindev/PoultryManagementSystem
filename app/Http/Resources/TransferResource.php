<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransferResource extends JsonResource
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
            'transfer_id' => $this->id,
            'transfer_batiment_code' => $this->transfer_batiment_code,
            'transfer_band_code' => $this->transfer_band_code,
            'transfer_quantity' => $this->transfer_quantity,
        ];
    }
}
