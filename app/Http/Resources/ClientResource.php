<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
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
            'client_id' => $this->id,
            'client_name' => $this->client_name,
            'client_company' => $this->client_company,
            'client_telephone' => $this->client_telephone,
            'client_email' => $this->client_email,
            'client_position' => $this->client_position,
            'client_location' => $this->client_location,
        ];
    }
}
