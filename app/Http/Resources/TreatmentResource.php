<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TreatmentResource extends JsonResource
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
            'treatment_id' => $this->id,
            'treatment_batiment_code' => $this->treatment_batiment_code,
            'treatment_veto_name' => $this->treatment_veto_name,
            'treatment_name' => $this->treatment_name,
            'treatment_comment' => $this->treatment_comment,
        ];
    }
}
