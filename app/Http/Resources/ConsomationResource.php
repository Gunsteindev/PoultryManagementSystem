<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConsomationResource extends JsonResource
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
            'consomation_id' => $this->id,
            'consomation_batiment' => $this->consomation_batiment,
            'consomation_name' => $this->consomation_name,
            'consomation_quantity' => $this->consomation_quantity,
            'consomation_date' => $this->consomation_date,
        ];
    }
}
