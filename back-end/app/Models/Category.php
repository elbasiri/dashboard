<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $primaryKey = 'category_id';

    protected $fillable = [
        'name',
        'description',
        'image',
    ];

    public function parterproducts()
    {
        return $this->hasMany(PartnerProduct::class, 'category_id');
    }
}
