<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partner extends Model
{
    use HasFactory;

    protected $primaryKey = 'partner_id';
    protected $fillable = ['username','image', 'password', 'email'];

    public function partnerProducts()
    {
        return $this->hasMany(PartnersProduct::class);
    }
}
