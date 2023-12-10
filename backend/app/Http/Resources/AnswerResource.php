<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AnswerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "answer" => $this->answer,
            "name" => $this->user->name,
            "photo" => $this->user->photo,
            "role" => $this->user->role,
            "time" => $this->created_at->format("Y-m-d")
        ];
        return parent::toArray($request);
    }
}
