<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PartnersProduct extends Model
{
    use HasFactory;
    
    protected $primaryKey = 'product_id';

    protected $fillable = [
        'name',
        'partner_id',
        'product_id',
        'price',
        'quantity',
        'description',
        'image',
    ];

    public function partner()
    {
        return $this->belongsTo(Partner::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
