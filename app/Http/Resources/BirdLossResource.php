<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BirdLossResource extends JsonResource
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
            'bird_loss_id' => $this->id,
            'bird_loss_batiment' => $this->bird_loss_batiment,
            'bird_loss_category' => $this->bird_loss_category,
            'bird_loss_quantity' => $this->bird_loss_quantity,
            'bird_loss_date' => $this->bird_loss_date,
        ];
    }
}
