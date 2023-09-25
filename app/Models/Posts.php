<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravel\Scout\Searchable;

class Posts extends Model
{
    use HasFactory, Searchable;
    // use HasFactory;

    // protected $with = ['user', 'comments'];
    protected $with = ['user'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function toSearchableArray(): array
    {
        return [
            'description' => $this->description,
        ];
    }
}
