<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BatimentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request) : array
    {
        // return parent::toArray($request);
        return [
            'batiment_id' => $this->id,
            'batiment_code' => $this->batiment_code,
            'batiment_description' => $this->batiment_description,
            'batiment_capacity' => $this->batiment_capacity,
            'batiment_category' => $this->batiment_category,
            // 'user' => new UserResource($this->user_id),
            // 'user' => $this->user_id,
            // 'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
