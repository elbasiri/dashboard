<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Command extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'customer_id',
        'partner_id',
        'product_id',
        'quantity',
        'total_price',
        'status',
        'image',
    ];


    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function partner()
    {
        return $this->belongsTo(Partner::class, 'partner_id');
    }

    public function product()
    {
        return $this->belongsTo(PartnerProduct::class, 'product_id');
    }
}
